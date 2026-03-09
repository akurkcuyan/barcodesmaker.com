import React, { useState, useEffect, useRef } from 'react';
import bwipjs from 'bwip-js';
import { jsPDF } from "jspdf";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Download, Copy, RefreshCw, RotateCcw, Settings, ChevronDown, Maximize, AlertCircle, Check, FileText, FileImage, FileCode, FileBox, Archive } from 'lucide-react';
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

// Helper Component for rendering individual barcodes
const BarcodeItem = ({ text, format, fgColor, bgColor, scale, height, onError, index, registerCanvas }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!text || !canvasRef.current) return;
        try {
            bwipjs.toCanvas(canvasRef.current, {
                bcid: format,
                text: text,
                scale: scale,
                height: height,
                includetext: true,
                textxalign: 'center',
                barcolor: fgColor,
                backgroundcolor: bgColor,
            });
            registerCanvas(index, canvasRef.current, text);
            onError(index, null);
        } catch (err) {
            onError(index, err.message);
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            registerCanvas(index, null, text);
        }
    }, [text, format, fgColor, bgColor, scale, height, index]);

    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-navy-700 rounded-xl relative">
            <div className="absolute top-2 left-2 text-[10px] text-navy-500 font-mono">#{index + 1}</div>
            <div className="bg-white p-4 rounded-lg shadow-sm w-full flex justify-center min-h-[100px]" style={{ backgroundColor: `#${bgColor}` }}>
                <canvas ref={canvasRef} className="max-w-full h-auto drop-shadow-sm"></canvas>
            </div>
            <div className="text-[10px] text-navy-400 font-mono truncate max-w-full px-2">{text}</div>
        </div>
    );
};


export default function BarcodeGenerator() {
    const { t } = useTranslation();
    const [data, setData] = useState("1234567890\n12232112121\n12121212121");
    const [format, setFormat] = useState('code128');
    const [fgColor, setFgColor] = useState('000000');
    const [bgColor, setBgColor] = useState('ffffff');
    const [scale, setScale] = useState(3);
    const [height, setHeight] = useState(15);
    const [showMore, setShowMore] = useState(false);
    const [errors, setErrors] = useState({});
    const [isCopying, setIsCopying] = useState(false);
    const [selectedDownloadFormat, setSelectedDownloadFormat] = useState('png');
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    // Keep track of all generated canvases for ZIP building
    const canvasRegistry = useRef({});

    const registerCanvas = (index, canvas, text) => {
        canvasRegistry.current[index] = { canvas, text };
    };

    const handleItemError = (index, err) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            if (err) {
                newErrors[index] = err;
            } else {
                delete newErrors[index];
            }
            return newErrors;
        });
    };

    // Filter out empty lines
    const dataLines = data.split('\n').filter(line => line.trim() !== '');

    const handleDownload = async () => {
        if (dataLines.length === 0) return;

        if (selectedDownloadFormat === 'eps') {
            alert(t('barcode.vector_alert'));
            setSelectedDownloadFormat('svg'); // Auto-switch for the user
            return;
        }

        const isBatch = dataLines.length > 1;

        if (isBatch) {
            await downloadBatch();
        } else {
            downloadSingle(0);
        }
    };

    const downloadSingle = (index) => {
        const item = canvasRegistry.current[index];
        if (!item || !item.canvas) return;

        const textToSave = item.text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `BarcodesMaker-${format}-${textToSave}`;

        if (selectedDownloadFormat === 'png') {
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = item.canvas.toDataURL('image/png', 1.0);
            link.click();
        } else if (selectedDownloadFormat === 'pdf') {
            const imgData = item.canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: item.canvas.width > item.canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [item.canvas.width + 40, item.canvas.height + 40]
            });
            pdf.setProperties({ title: fileName });
            pdf.addImage(imgData, 'PNG', 20, 20, item.canvas.width, item.canvas.height);
            pdf.save(`${fileName}.pdf`);
        } else if (selectedDownloadFormat === 'svg') {
            try {
                const svg = bwipjs.toSVG({
                    bcid: format,
                    text: item.text,
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
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error('SVG Generation Error:', err);
            }
        }
    };

    const downloadBatch = async () => {
        setIsGeneratingZip(true);
        const zip = new JSZip();
        const folderName = `barcodes-${format}`;
        const folder = zip.folder(folderName);

        let validCount = 0;

        for (let i = 0; i < dataLines.length; i++) {
            const item = canvasRegistry.current[i];
            // Skip invalid barcodes
            if (!item || !item.canvas || errors[i]) continue;

            const safeText = item.text.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const fileName = `barcode-${i + 1}-${safeText}`;

            if (selectedDownloadFormat === 'png') {
                const dataUrl = item.canvas.toDataURL('image/png', 1.0);
                const base64Data = dataUrl.split(',')[1];
                folder.file(`${fileName}.png`, base64Data, { base64: true });
                validCount++;
            } else if (selectedDownloadFormat === 'pdf') {
                const imgData = item.canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF({
                    orientation: item.canvas.width > item.canvas.height ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [item.canvas.width + 40, item.canvas.height + 40]
                });
                pdf.addImage(imgData, 'PNG', 20, 20, item.canvas.width, item.canvas.height);
                const pdfData = pdf.output('blob');
                folder.file(`${fileName}.pdf`, pdfData);
                validCount++;
            } else if (selectedDownloadFormat === 'svg') {
                try {
                    const svg = bwipjs.toSVG({
                        bcid: format,
                        text: item.text,
                        scale: scale,
                        height: height,
                        includetext: true,
                        textxalign: 'center',
                        barcolor: fgColor,
                        backgroundcolor: bgColor,
                    });
                    folder.file(`${fileName}.svg`, svg);
                    validCount++;
                } catch (err) {
                    console.error('SVG generation failed for index', i, err);
                }
            }
        }

        if (validCount > 0) {
            try {
                const content = await zip.generateAsync({ type: 'blob' });
                saveAs(content, `BarcodesMaker-${format}-batch.zip`);
            } catch (err) {
                console.error("Error generating ZIP:", err);
            }
        }
        setIsGeneratingZip(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const hasErrors = Object.keys(errors).length > 0;

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
                            <label className="text-sm font-black text-navy-400 uppercase tracking-widest block flex justify-between items-center">
                                <span>{t('barcode.contents')}</span>
                                <span className="text-[10px] text-cyber-blue lowercase tracking-normal bg-cyber-blue/10 px-2 py-0.5 rounded">
                                    multi-line batch supported
                                </span>
                            </label>
                            <div className="relative group">
                                <textarea
                                    rows="4"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    className="input-field resize-y py-4 pr-12 group-focus:border-cyber-blue leading-relaxed font-mono"
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
                                {hasErrors ? (
                                    <p className="text-red-500 text-xs font-bold animate-pulse flex items-center gap-2">
                                        <AlertCircle size={14} />
                                        {Object.keys(errors).length} invalid lines for {format.toUpperCase()}
                                    </p>
                                ) : (
                                    <p className="text-navy-500 text-xs font-semibold flex items-center gap-2">
                                        <Check size={14} className="text-green-500" /> {t('barcode.format_ready')} ({dataLines.length} total)
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
            <div className="lg:sticky lg:top-32 space-y-8 animate-fadeIn flex flex-col" style={{ animationDelay: '0.2s', maxHeight: 'calc(100vh - 150px)' }}>
                <div className="relative group perspective flex-1 flex flex-col min-h-0">
                    <div className="absolute inset-0 bg-cyber-blue/5 blur-[120px] -z-10 rounded-full group-hover:bg-deep-blue/15 transition-all duration-1000"></div>

                    <div className="bg-navy-800/40 p-6 rounded-[30px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 flex-1 overflow-y-auto custom-scrollbar relative">
                        {dataLines.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-navy-500 min-h-[250px]">
                                <AlertCircle size={32} className="mb-2 opacity-50" />
                                <span className="text-sm font-semibold">{t('barcode.no_data', 'No valid data provided')}</span>
                            </div>
                        ) : (
                            <div className={`grid gap-4 ${dataLines.length > 1 ? 'grid-cols-2 sm:grid-cols-2' : 'grid-cols-1'}`}>
                                {dataLines.map((line, index) => (
                                    <BarcodeItem
                                        key={`${format}-${line}-${index}-${scale}-${height}-${fgColor}-${bgColor}`}
                                        text={line}
                                        format={format}
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        scale={scale}
                                        height={height}
                                        index={index}
                                        registerCanvas={registerCanvas}
                                        onError={handleItemError}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Badge */}
                    {dataLines.length > 0 && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-navy-800 border border-navy-700 py-3 px-6 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-500 z-10">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${hasErrors ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                    {dataLines.length > 1 ? `BATCH: ${dataLines.length - Object.keys(errors).length}/${dataLines.length} READY` : `${format.toUpperCase()} READY`}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-8 space-y-6 shrink-0">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-navy-400 uppercase tracking-[0.2em] block text-center">{t('barcode.export_format')}</label>
                        <div className="grid grid-cols-4 gap-3">
                            {downloadFormats.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setSelectedDownloadFormat(f.id)}
                                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 border-2 ${selectedDownloadFormat === f.id ? 'border-cyber-blue bg-cyber-blue/10 scale-105 shadow-lg shadow-cyber-blue/10' : 'border-navy-800/50 bg-navy-900/40 hover:border-navy-600'}`}
                                >
                                    <div className={`${f.color}`}>{f.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-white">{f.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={isGeneratingZip || dataLines.length === 0}
                        className={`btn-primary w-full py-4 text-xl relative group overflow-hidden ${(isGeneratingZip || dataLines.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isGeneratingZip ? (
                                <RefreshCw size={24} className="animate-spin" />
                            ) : dataLines.length > 1 ? (
                                <Archive size={24} className="group-hover:scale-110 transition-transform" />
                            ) : (
                                <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                            )}

                            {isGeneratingZip
                                ? t('barcode.zipping')
                                : dataLines.length > 1
                                    ? `${t('barcode.download_zip')} (${selectedDownloadFormat.toUpperCase()})`
                                    : `${t('barcode.download')} ${selectedDownloadFormat.toUpperCase()}`
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div >
    );
}
