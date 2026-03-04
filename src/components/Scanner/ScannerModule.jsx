import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import bwipjs from 'bwip-js';
import { Camera, Upload, Copy, Check, RotateCcw, Monitor, ShieldCheck, AlertCircle, ScanLine, XCircle, QrCode as QrIcon, BarChart as BarIcon } from 'lucide-react';

export default function ScannerModule() {
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
            setError("Camera access failed. Check permission/HTTPS.");
            setIsScanning(false);
        }
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
            setError("Could not detect a valid code. Try another image.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scanResult);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const isNumeric = /^\d+$/.test(scanResult);

    return (
        <section id="scanner" className="py-32 animate-fadeIn relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-xs font-black uppercase tracking-widest mb-8">
                        <ScanLine size={14} className="animate-pulse" /> Signal Processing
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-deep-blue">Decoder</span>
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
                                        <span className="text-[10px] font-black uppercase tracking-widest text-navy-950">Scanned {isNumeric ? 'Barcode' : 'QR Code'}</span>
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
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Scan</span>
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
                                        <p className="text-2xl font-black text-white uppercase tracking-widest">Scanner Standby</p>
                                        <p className="text-navy-500 font-medium">Point camera or upload image to decode</p>
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
                                        <XCircle size={18} /> Stop Sensor
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Controls */}
                    <div className="space-y-10">
                        <div className="glass-card p-10 space-y-10 bg-navy-900/40 border-navy-800/60 backdrop-blur-xl">
                            <div className="space-y-6">
                                <label className="text-[10px] font-black text-navy-500 uppercase tracking-[0.3em] block">Scanner Controls</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={startCamera}
                                        disabled={isScanning}
                                        className={`group flex items-center justify-center gap-4 px-8 py-6 rounded-3xl font-black transition-all uppercase tracking-widest text-xs border-2 ${isScanning ? 'bg-navy-900 text-navy-700 border-navy-800' : 'bg-navy-800 text-white hover:bg-cyber-blue border-navy-700 hover:border-white shadow-2xl'}`}
                                    >
                                        <Camera size={20} className={isScanning ? 'text-navy-700' : 'text-cyber-blue group-hover:text-white'} />
                                        <span>Real-time</span>
                                    </button>
                                    <label className="group flex items-center justify-center gap-4 px-8 py-6 rounded-3xl font-black transition-all uppercase tracking-widest text-xs bg-navy-800 text-white hover:bg-deep-blue border-2 border-navy-700 hover:border-white cursor-pointer shadow-2xl">
                                        <Upload size={20} className="text-cyber-blue group-hover:text-white" />
                                        <span>Import File</span>
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
                                    <label className="text-[10px] font-black text-navy-500 uppercase tracking-[0.3em] block">Decoded Signal</label>
                                    {scanResult && <span className="text-[10px] font-black text-green-500 uppercase py-1.5 px-4 bg-green-500/10 rounded-full border border-green-500/20">Active Data</span>}
                                </div>
                                <div className="relative group">
                                    <div className={`w-full min-h-[160px] p-8 bg-navy-950/80 border-2 rounded-[36px] flex items-center justify-center text-center transition-all duration-500 overflow-hidden relative ${scanResult ? 'border-cyber-blue/50 shadow-[0_0_60px_rgba(59,130,246,0.1)] ring-4 ring-cyber-blue/5' : 'border-navy-800'}`}>
                                        {scanResult ? (
                                            <p className="text-2xl font-black text-white break-all relative z-10 px-4">{scanResult}</p>
                                        ) : (
                                            <p className="text-navy-700 font-bold uppercase tracking-widest text-[10px] opacity-30">Sensors Calibrated...</p>
                                        )}
                                    </div>

                                    {scanResult && (
                                        <div className="absolute top-6 right-6">
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-4 bg-navy-800 hover:bg-white hover:text-navy-950 text-white rounded-2xl transition-all border border-navy-700 flex items-center gap-3 shadow-xl active:scale-95"
                                            >
                                                {isCopying ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-cyber-blue" />}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{isCopying ? 'Copied' : 'Copy'}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-navy-800/40 to-navy-900/20 rounded-[40px] border border-navy-800/60 backdrop-blur-sm group hover:border-cyber-blue/30 transition-all flex items-center gap-10 shadow-2xl">
                            <div className="w-20 h-20 bg-cyber-blue/20 text-cyber-blue rounded-[24px] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-cyber-blue/10">
                                <ShieldCheck size={40} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white mb-2 tracking-tight">Private Signal Channel</h4>
                                <p className="text-navy-400 font-medium">Direct browser-to-silicon decryption. No cloud data leakage.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
