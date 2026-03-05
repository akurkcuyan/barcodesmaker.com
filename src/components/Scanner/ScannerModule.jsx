import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import bwipjs from 'bwip-js';
import { Camera, Upload, Copy, Check, RotateCcw, Monitor, ShieldCheck, AlertCircle, ScanLine, XCircle, QrCode as QrIcon, BarChart as BarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ScannerModule() {
    const { t } = useTranslation();
    const [scanResult, setScanResult] = useState('');
    const [isCopying, setIsCopying] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState('');
    const qrScannerRef = useRef(null);
    const barcodeCanvasRef = useRef(null);

    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);

    useEffect(() => {
        if (scanResult && !isScanning && barcodeCanvasRef.current) {
            renderDetectedBarcode();
        }
    }, [scanResult, isScanning]);

    const stopScanner = async () => {
        if (qrScannerRef.current && qrScannerRef.current.isScanning) {
            try {
                await qrScannerRef.current.stop();
                qrScannerRef.current = null;
                setIsScanning(false);
            } catch (err) {
                console.error("Error stopping scanner", err);
            } finally {
                setIsScanning(false);
            }
        }
    };

    const renderDetectedBarcode = () => {
        if (!/^\d+$/.test(scanResult)) return;
        try {
            bwipjs.toCanvas(barcodeCanvasRef.current, {
                bcid: 'code128',
                text: scanResult,
                scale: 3,
                height: 15,
                includetext: true,
                textxalign: 'center',
                barcolor: '000000',
                backgroundcolor: 'ffffff',
            });
        } catch (e) {
            console.error("Barcode render failed", e);
        }
    };

    const startCamera = async () => {
        setError('');
        setScanResult('');
        try {
            await stopScanner();
            const html5QrCode = new Html5Qrcode("reader");
            qrScannerRef.current = html5QrCode;

            const qrCodeSuccessCallback = (decodedText) => {
                setScanResult(decodedText);
                stopScanner();
            };

            const config = {
                fps: 20,
                qrbox: (viewWidth, viewHeight) => {
                    const minEdge = Math.min(viewWidth, viewHeight);
                    const boxSize = Math.floor(minEdge * 0.7);
                    return { width: boxSize, height: boxSize };
                },
                aspectRatio: 1.0
            };

            setIsScanning(true);
            await html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
        } catch (err) {
            setError(t('scanner.errors.camera'));
            setIsScanning(false);
        }
    };

    const decodePharmacodeFallback = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d', { willReadFrequently: true });
                    ctx.drawImage(img, 0, 0);

                    const scanLines = [
                        Math.floor(img.height / 2),
                        Math.floor(img.height / 3),
                        Math.floor(img.height * 2 / 3),
                        Math.floor(img.height / 4)
                    ];

                    for (let y of scanLines) {
                        const pixels = ctx.getImageData(0, y, img.width, 1).data;
                        const blackRuns = [];
                        const whiteRuns = [];
                        let currentRun = 0;
                        let isBlack = false;
                        let started = false;

                        for (let x = 0; x < img.width; x++) {
                            const r = pixels[x * 4];
                            const g = pixels[x * 4 + 1];
                            const b = pixels[x * 4 + 2];
                            const a = pixels[x * 4 + 3];

                            const pixelIsBlack = a > 128 && ((r + g + b) / 3 < 128);

                            if (pixelIsBlack === isBlack) {
                                currentRun++;
                            } else {
                                if (started) {
                                    if (isBlack) blackRuns.push(currentRun);
                                    else whiteRuns.push(currentRun);
                                } else if (pixelIsBlack) {
                                    started = true;
                                    isBlack = true;
                                }
                                currentRun = 1;
                                isBlack = pixelIsBlack;
                            }
                        }
                        if (started && currentRun > 0) {
                            if (isBlack) blackRuns.push(currentRun);
                            else whiteRuns.push(currentRun);
                        }

                        if (blackRuns.length > 0 && blackRuns.length <= 16) {
                            let validSpacing = true;
                            if (whiteRuns.length > 1) {
                                const innerSpaces = whiteRuns.slice(0, blackRuns.length - 1);
                                if (innerSpaces.length > 0) {
                                    const minSpace = Math.min(...innerSpaces);
                                    const maxSpace = Math.max(...innerSpaces);
                                    if (maxSpace > minSpace * 2.5) {
                                        validSpacing = false;
                                    }
                                }
                            }

                            if (validSpacing) {
                                const minBar = Math.min(...blackRuns);
                                const maxBar = Math.max(...blackRuns);
                                let threshold = (minBar + maxBar) / 2;
                                if (maxBar < minBar * 1.5) threshold = maxBar + 1;

                                let value = 0;
                                let multiplier = 1;
                                for (let i = blackRuns.length - 1; i >= 0; i--) {
                                    value += (blackRuns[i] > threshold ? 2 : 1) * multiplier;
                                    multiplier *= 2;
                                }

                                if (value >= 1 && value <= 131070) {
                                    resolve(value.toString());
                                    return;
                                }
                            }
                        }
                    }
                    resolve(null);
                };
                img.onerror = () => resolve(null);
                img.src = e.target.result;
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    };



    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setError('');
        setScanResult('');
        try {
            const html5QrCode = new Html5Qrcode("reader");
            const decodedText = await html5QrCode.scanFile(file, true);
            setScanResult(decodedText);
        } catch (err) {
            // Fallback for custom decoding of Pharmacode
            const pharmacodeResult = await decodePharmacodeFallback(file);
            if (pharmacodeResult) {
                setScanResult(pharmacodeResult);
            } else {
                setError(t('scanner.errors.detect'));
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scanResult);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const isNumeric = /^\d+$/.test(scanResult);

    return (
        <section id="scanner" className="py-2 animate-fadeIn relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-xs font-black uppercase tracking-widest mb-8">
                        <ScanLine size={14} className="animate-pulse" /> {t('scanner.signal_processing')}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-navy-900 dark:text-white mb-8 tracking-tighter">
                        {t('scanner.title_main')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-deep-blue">{t('scanner.title_gradient')}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Main Viewport Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 to-deep-blue/20 rounded-[44px] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                        <div className="relative glass-card overflow-hidden bg-navy-950 border-navy-800 p-2 rounded-[42px] aspect-square flex items-center justify-center shadow-2xl">

                            {/* 1. Camera View (Active ONLY when scanning) */}
                            <div id="reader" className={`w-full h-full rounded-[34px] overflow-hidden ${isScanning ? 'block' : 'hidden'}`}></div>

                            {/* 2. Result View (Active ONLY when result exists AND not scanning) */}
                            {scanResult && !isScanning && (
                                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-12 transition-all animate-fadeIn z-30">
                                    <div className="mb-8 p-3 px-6 bg-navy-950/5 rounded-full border border-navy-950/10 flex items-center gap-3">
                                        {isNumeric ? <BarIcon size={18} className="text-deep-blue" /> : <QrIcon size={18} className="text-deep-blue" />}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-navy-950">{t('scanner.scanned')} {isNumeric ? t('scanner.barcode') : t('scanner.qr')}</span>
                                    </div>

                                    <div className="bg-white p-8 rounded-[40px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-navy-100 transition-transform hover:scale-105 duration-700">
                                        {isNumeric ? (
                                            <canvas ref={barcodeCanvasRef} className="max-w-full h-auto"></canvas>
                                        ) : (
                                            <QRCodeSVG value={scanResult} size={280} level="H" includeMargin={true} />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setScanResult('')}
                                        className="mt-12 group flex items-center gap-3 bg-navy-900 px-6 py-3 rounded-2xl text-white hover:bg-cyber-blue transition-all"
                                    >
                                        <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('scanner.new_scan')}</span>
                                    </button>
                                </div>
                            )}

                            {/* 3. Standby UI (Active ONLY when no result AND not scanning) */}
                            {!isScanning && !scanResult && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-8 animate-fadeIn z-10">
                                    <div className="relative">
                                        <div className="absolute inset-x-0 top-0 h-1 bg-cyber-blue shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-scanline"></div>
                                        <div className="w-32 h-32 bg-navy-900 border border-navy-800 rounded-[32px] flex items-center justify-center text-navy-600">
                                            <Monitor size={56} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-2xl font-black text-white uppercase tracking-widest">{t('scanner.standby')}</p>
                                        <p className="text-navy-500 font-medium">{t('scanner.standby_desc')}</p>
                                    </div>
                                </div>
                            )}

                            {/* 4. Active Scanning Overlays */}
                            {isScanning && (
                                <div className="absolute inset-0 pointer-events-none z-20">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-cyber-blue/30 rounded-3xl">
                                        <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-cyber-blue rounded-tl-2xl"></div>
                                        <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-cyber-blue rounded-tr-2xl"></div>
                                        <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-cyber-blue rounded-bl-2xl"></div>
                                        <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-cyber-blue rounded-br-2xl"></div>
                                        <div className="absolute inset-x-0 top-0 h-1.5 bg-cyber-blue shadow-[0_0_25px_rgba(59,130,246,1)] animate-scanline"></div>
                                    </div>
                                    <button
                                        onClick={stopScanner}
                                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-500 px-8 py-4 rounded-3xl text-white font-black uppercase tracking-widest text-xs pointer-events-auto hover:bg-red-600 transition-all shadow-xl shadow-red-500/30"
                                    >
                                        <XCircle size={18} /> {t('scanner.stop')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Controls */}
                    <div className="space-y-10">
                        <div className="glass-card p-10 space-y-10 bg-navy-900/40 dark:bg-navy-900/40 border-navy-200 dark:border-navy-800/60 backdrop-blur-xl transition-colors">
                            <div className="space-y-6">
                                <label className="text-[10px] font-black text-navy-500 uppercase tracking-[0.3em] block">{t('scanner.controls')}</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={startCamera}
                                        disabled={isScanning}
                                        className={`group flex items-center justify-center gap-4 px-8 py-6 rounded-3xl font-black transition-all uppercase tracking-widest text-xs border-2 ${isScanning ? 'bg-navy-900 text-navy-700 border-navy-800' : 'bg-navy-800 text-white hover:bg-cyber-blue border-navy-700 hover:border-white shadow-2xl'}`}
                                    >
                                        <Camera size={20} className={isScanning ? 'text-navy-700' : 'text-cyber-blue group-hover:text-white'} />
                                        <span>{t('scanner.realtime')}</span>
                                    </button>
                                    <label className="group flex items-center justify-center gap-4 px-8 py-6 rounded-3xl font-black transition-all uppercase tracking-widest text-xs bg-navy-800 text-white hover:bg-deep-blue border-2 border-navy-700 hover:border-white cursor-pointer shadow-2xl">
                                        <Upload size={20} className="text-cyber-blue group-hover:text-white" />
                                        <span>{t('scanner.import')}</span>
                                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            {error && (
                                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-start gap-4 animate-fadeIn">
                                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-red-200 text-sm font-bold leading-relaxed">{error}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-navy-500 uppercase tracking-[0.3em] block">{t('scanner.decoded_signal')}</label>
                                    {scanResult && <span className="text-[10px] font-black text-green-500 uppercase py-1.5 px-4 bg-green-500/10 rounded-full border border-green-500/20">{t('scanner.active_data')}</span>}
                                </div>
                                <div className="relative group">
                                    <div className={`w-full min-h-[160px] p-8 bg-navy-50/50 dark:bg-navy-950/80 border-2 rounded-[36px] flex items-center justify-center text-center transition-all duration-500 overflow-hidden relative ${scanResult ? 'border-cyber-blue/50 shadow-[0_0_60px_rgba(59,130,246,0.1)] ring-4 ring-cyber-blue/5' : 'border-navy-200 dark:border-navy-800'}`}>
                                        {scanResult ? (
                                            <p className="text-2xl font-black text-navy-900 dark:text-white break-all relative z-10 px-4">{scanResult}</p>
                                        ) : (
                                            <p className="text-navy-400 dark:text-navy-700 font-bold uppercase tracking-widest text-[10px] opacity-30">{t('scanner.waiting')}</p>
                                        )}
                                    </div>

                                    {scanResult && (
                                        <div className="absolute top-6 right-6">
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-4 bg-navy-800 hover:bg-white hover:text-navy-950 text-white rounded-2xl transition-all border border-navy-700 flex items-center gap-3 shadow-xl active:scale-95"
                                            >
                                                {isCopying ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-cyber-blue" />}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{isCopying ? t('barcode.copied') : t('barcode.copy')}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-navy-100/40 to-navy-200/20 dark:from-navy-800/40 dark:to-navy-900/20 rounded-[40px] border border-navy-200 dark:border-navy-800/60 backdrop-blur-sm group hover:border-cyber-blue/30 transition-all flex items-center gap-10 shadow-2xl">
                            <div className="w-20 h-20 bg-cyber-blue/20 text-cyber-blue rounded-[24px] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-cyber-blue/10">
                                <ShieldCheck size={40} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-navy-900 dark:text-white mb-2 tracking-tight">{t('scanner.private_channel')}</h4>
                                <p className="text-navy-500 dark:text-navy-400 font-medium">{t('scanner.private_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
