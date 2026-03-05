import React, { useState, useEffect, useRef } from 'react';
import bwipjs from 'bwip-js';
import { jsPDF } from "jspdf";
import { Download, Copy, RefreshCw, RotateCcw, Layers, Settings, ChevronDown, Palette, Maximize, AlertCircle, Check, FileText, FileImage, FileCode, FileBox } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const formats = [
    { value: 'code128', label: 'Code 128', example: 'CODE-128-EX' },
    { value: 'gs1-128', label: 'GS1-128 (UCC/EAN-128)', example: '(01)12345678901231' },
    { value: 'code39', label: 'Code 39', example: 'CODE39' },
    { value: 'code93', label: 'Code 93', example: 'CODE93' },
    { value: 'code11', label: 'Code 11', example: '123-45' },
    { value: 'ean13', label: 'EAN-13', example: '9780201379624' },
    { value: 'ean8', label: 'EAN-8', example: '90311017' },
    { value: 'upca', label: 'UPC-A', example: '012345678905' },
    { value: 'upce', label: 'UPC-E', example: '01234565' },
    { value: 'ean2', label: 'UPC Extension 2 Digits', example: '12' },
    { value: 'ean5', label: 'UPC Extension 5 Digits', example: '12345' },
    { value: 'isbn', label: 'ISBN', example: '978-3-16-148410-0' },
    { value: 'issn', label: 'ISSN', example: '2049-3630' },
    { value: 'ismn', label: 'ISMN', example: '979-0-2600-0043-8' },
    { value: 'itf14', label: 'ITF-14 / EAN-14', example: '10012345678902' },
    { value: 'interleaved2of5', label: 'Interleaved 2 of 5', example: '12345670' },
    { value: 'code2of5', label: 'Standard 2 of 5', example: '1234567' },
    { value: 'msi', label: 'MSI Plessey', example: '123456' },
    { value: 'pharmacode', label: 'Pharmacode', example: '12345' },
    { value: 'code32', label: 'Italian Pharmacode (Code 32)', example: '12345678' },
    { value: 'postnet', label: 'PostNet', example: '123456789' },
    { value: 'datamatrix', label: 'Data Matrix', example: 'Hello World' },
    { value: 'codabar', label: 'Codabar', example: 'A123456A' },
];

const downloadFormats = [
    { id: 'png', label: 'PNG', icon: <FileImage size={18} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'svg', label: 'SVG', icon: <FileCode size={18} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'pdf', label: 'PDF', icon: <FileText size={18} />, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'eps', label: 'EPS', icon: <FileBox size={18} />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

export default function BarcodeGenerator() {
    const { t } = useTranslation();
    const [data, setData] = useState('1234567890');
    const [format, setFormat] = useState('code128');
    const [fgColor, setFgColor] = useState('000000');
    const [bgColor, setBgColor] = useState('ffffff');
    const [scale, setScale] = useState(3);
    const [height, setHeight] = useState(15);
    const [showMore, setShowMore] = useState(false);
    const [error, setError] = useState('');
    const [isCopying, setIsCopying] = useState(false);
    const [selectedDownloadFormat, setSelectedDownloadFormat] = useState('png');

    const canvasRef = useRef(null);

    useEffect(() => {
        generateBarcode();
    }, [data, format, fgColor, bgColor, scale, height]);

    const generateBarcode = () => {
        if (!data) {
            setError(t('barcode.no_data'));
            return;
        }
        setError('');

        try {
            bwipjs.toCanvas(canvasRef.current, {
                bcid: format,
                text: data,
                scale: scale,
                height: height,
                includetext: true,
                textxalign: 'center',
                barcolor: fgColor,
                backgroundcolor: bgColor,
            });
        } catch (err) {
            setError(`${t('barcode.invalid_data')} ${format.toUpperCase()}`);
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const fileName = `BarcodesMaker-${format}-${data}`;

        if (selectedDownloadFormat === 'png') {
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvasRef.current.toDataURL('image/png', 1.0);
            link.click();
        } else if (selectedDownloadFormat === 'pdf') {
            const imgData = canvasRef.current.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: canvasRef.current.width > canvasRef.current.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvasRef.current.width + 40, canvasRef.current.height + 40]
            });
            pdf.setProperties({ title: fileName });
            pdf.addImage(imgData, 'PNG', 20, 20, canvasRef.current.width, canvasRef.current.height);
            pdf.save(`${fileName}.pdf`);
        } else if (selectedDownloadFormat === 'svg') {
            try {
                const svg = bwipjs.toSVG({
                    bcid: format,
                    text: data,
                    scale: scale,
                    height: height,
                    includetext: true,
                    textxalign: 'center',
                    barcolor: fgColor,
                    backgroundcolor: bgColor,
                });
                const blob = new Blob([svg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}.svg`;
                a.click();
            } catch (err) {
                console.error('SVG Generation Error:', err);
            }
        } else if (selectedDownloadFormat === 'eps') {
            alert(t('barcode.vector_alert'));
            setSelectedDownloadFormat('svg');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Side: Settings & Export */}
            <div className="space-y-8">
                <div className="glass-card p-8 md:p-10 space-y-8 animate-slideUp border-navy-800/40 bg-navy-800/30 overflow-hidden relative">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-black text-navy-400 uppercase tracking-widest flex items-center gap-2">
                                <Maximize size={16} className="text-cyber-blue" />
                                {t('barcode.format_selection')}
                            </label>
                            <div className="relative group">
                                <select
                                    value={format}
                                    onChange={(e) => {
                                        const nextFormat = e.target.value;
                                        setFormat(nextFormat);
                                        const example = formats.find(f => f.value === nextFormat)?.example;
                                        if (example) setData(example);
                                    }}
                                    className="input-field appearance-none cursor-pointer pr-12 focus:ring-2 focus:ring-cyber-blue/20"
                                >
                                    {formats.map(f => <option key={f.value} value={f.value} className="bg-navy-900">{f.label}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-500 pointer-events-none group-hover:text-white transition-colors" size={20} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-navy-400 uppercase tracking-widest block">{t('barcode.contents')}</label>
                            <div className="relative group">
                                <textarea
                                    rows="3"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    className="input-field resize-none py-4 pr-12 group-focus:border-cyber-blue"
                                    placeholder={t('barcode.placeholder')}
                                />
                                <button
                                    onClick={() => setData(formats.find(f => f.value === format)?.example || Math.floor(Math.random() * 1000000000).toString())}
                                    className="absolute right-4 top-4 text-navy-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                                    title={t('barcode.example')}
                                >
                                    <RefreshCw size={20} />
                                </button>
                            </div>
                            <div className="flex justify-between items-start mt-2">
                                {error ? (
                                    <p className="text-red-500 text-xs font-bold animate-pulse flex items-center gap-2">
                                        <AlertCircle size={14} />
                                        {error}
                                    </p>
                                ) : (
                                    <p className="text-navy-500 text-xs font-semibold flex items-center gap-2">
                                        <Check size={14} className="text-green-500" /> {t('barcode.format_ready')}
                                    </p>
                                )}
                                <p className="text-[10px] text-navy-400 font-bold uppercase tracking-widest bg-navy-100 dark:bg-navy-900/50 px-2 py-1 rounded-md border border-navy-200 dark:border-navy-700">
                                    {t('barcode.example')}: <span className="text-cyber-blue tracking-normal font-mono">{formats.find(f => f.value === format)?.example}</span>
                                </p>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-all group"
                            >
                                <Settings size={14} className={`transition-transform duration-500 ${showMore ? 'rotate-180' : ''}`} />
                                {showMore ? t('barcode.less_options') : t('barcode.more_options')}
                            </button>

                            {showMore && (
                                <button
                                    onClick={() => {
                                        setFgColor('000000');
                                        setBgColor('ffffff');
                                        setScale(3);
                                        setHeight(15);
                                    }}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors"
                                    title="Reset to default"
                                >
                                    <RotateCcw size={12} />
                                    {t('barcode.reset')}
                                </button>
                            )}
                        </div>

                        {showMore && (
                            <div className="mt-8 space-y-8 animate-fadeIn">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.bar_color')}</label>
                                        <div className="flex items-center gap-2 bg-navy-900/50 p-2 rounded-xl border border-navy-800">
                                            <input type="color" value={`#${fgColor}`} onChange={(e) => setFgColor(e.target.value.replace('#', ''))} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                            <span className="text-[10px] font-mono text-navy-400">{fgColor.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.background')}</label>
                                        <div className="flex items-center gap-2 bg-navy-900/50 p-2 rounded-xl border border-navy-800">
                                            <input type="color" value={`#${bgColor}`} onChange={(e) => setBgColor(e.target.value.replace('#', ''))} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                            <span className="text-[10px] font-mono text-navy-400">{bgColor.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.resolution')}: {scale}</label>
                                        <input type="range" min="1" max="5" step="1" value={scale} onChange={(e) => setScale(parseInt(e.target.value))} className="w-full accent-cyber-blue h-1 bg-navy-900 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.height')}: {height}</label>
                                        <input type="range" min="5" max="50" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full accent-cyber-blue h-1 bg-navy-900 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Preview Side */}
            <div className="lg:sticky lg:top-32 space-y-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="relative group perspective">
                    <div className="absolute inset-0 bg-cyber-blue/5 blur-[120px] -z-10 rounded-full group-hover:bg-deep-blue/15 transition-all duration-1000"></div>

                    <div
                        style={{ backgroundColor: `#${bgColor}` }}
                        className="p-16 md:p-24 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center min-h-[350px] transition-all duration-700 bg-white border border-white/5 overflow-hidden"
                    >
                        <canvas ref={canvasRef} className="max-w-full h-auto drop-shadow-sm"></canvas>
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-navy-800 border border-navy-700 py-4 px-8 rounded-2xl shadow-2xl backdrop-blur-xl opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{format.toUpperCase()} {t('barcode.engine_ready')}</span>
                        </div>
                        <div className="w-px h-4 bg-navy-600"></div>
                        <button onClick={copyToClipboard} className="flex items-center gap-2 hover:text-cyber-blue transition-colors group/btn">
                            {isCopying ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="group-hover/btn:scale-110" />}
                            <span className="text-[10px] font-black uppercase tracking-widest">{isCopying ? t('barcode.copied') : t('barcode.copy')}</span>
                        </button>
                    </div>
                </div>

                <div className="pt-8 space-y-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-navy-400 uppercase tracking-[0.2em] block text-center">{t('barcode.export_format')}</label>
                        <div className="grid grid-cols-4 gap-3">
                            {downloadFormats.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setSelectedDownloadFormat(f.id)}
                                    className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${selectedDownloadFormat === f.id ? 'border-cyber-blue bg-cyber-blue/10 scale-105 shadow-lg shadow-cyber-blue/10' : 'border-navy-800/50 bg-navy-900/40 hover:border-navy-600'}`}
                                >
                                    <div className={`${f.color}`}>{f.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-white">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleDownload} className="btn-primary w-full py-5 text-xl relative group overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                            {t('barcode.download')} {selectedDownloadFormat.toUpperCase()}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    </button>
                </div>
            </div>
        </div >
    );
}
