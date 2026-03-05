import React, { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from "jspdf";
import {
    Download, RefreshCw, RotateCcw, Palette, Settings2, Share2, CornerRightDown,
    Shield, LayoutGrid, Maximize, AlertCircle, FileText, FileImage,
    FileCode, FileBox, Globe, Phone, Mail, User, Info, Wifi, Type, Link as LinkIcon, ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const downloadFormats = [
    { id: 'png', label: 'PNG', icon: <FileImage size={18} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'svg', label: 'SVG', icon: <FileCode size={18} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'pdf', label: 'PDF', icon: <FileText size={18} />, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'eps', label: 'EPS', icon: <FileBox size={18} />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

const qrTypes = [
    { id: 'text', labelKey: 'qr.types.text', icon: <Type size={18} /> },
    { id: 'url', labelKey: 'qr.types.url', icon: <LinkIcon size={18} /> },
    { id: 'phone', labelKey: 'qr.types.phone', icon: <Phone size={18} /> },
    { id: 'email', labelKey: 'qr.types.email', icon: <Mail size={18} /> },
    { id: 'mecard', labelKey: 'qr.types.mecard', icon: <User size={18} /> },
    { id: 'vcard', labelKey: 'qr.types.vcard', icon: <Info size={18} /> },
    { id: 'wifi', labelKey: 'qr.types.wifi', icon: <Wifi size={18} /> },
];

export default function QRCodeGenerator() {
    const { t } = useTranslation();
    const [qrType, setQrType] = useState('url');
    const [data, setData] = useState('https://barcodesmaker.com');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [size, setSize] = useState(256);
    const [level, setLevel] = useState('H');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedDownloadFormat, setSelectedDownloadFormat] = useState('png');

    // Specific states for different types
    const [fields, setFields] = useState({
        text: '',
        url: 'https://barcodesmaker.com',
        phone: '',
        email: { to: '', subject: '', body: '' },
        mecard: { name: '', tel: '', email: '', note: '' },
        vcard: { name: '', org: '', tel: '', email: '', url: '' },
        wifi: { ssid: '', password: '', encryption: 'WPA' }
    });

    const containerRef = useRef(null);

    // Update data whenever fields or qrType changes
    useEffect(() => {
        let newData = '';
        switch (qrType) {
            case 'text': newData = fields.text; break;
            case 'url': newData = fields.url; break;
            case 'phone': newData = `tel:${fields.phone}`; break;
            case 'email':
                newData = `mailto:${fields.email.to}?subject=${encodeURIComponent(fields.email.subject)}&body=${encodeURIComponent(fields.email.body)}`;
                break;
            case 'mecard':
                newData = `MECARD:N:${fields.mecard.name};TEL:${fields.mecard.tel};EMAIL:${fields.mecard.email};NOTE:${fields.mecard.note};;`;
                break;
            case 'vcard':
                newData = `BEGIN:VCARD\nVERSION:3.0\nN:${fields.vcard.name}\nORG:${fields.vcard.org}\nTEL:${fields.vcard.tel}\nEMAIL:${fields.vcard.email}\nURL:${fields.vcard.url}\nEND:VCARD`;
                break;
            case 'wifi':
                newData = `WIFI:T:${fields.wifi.encryption};S:${fields.wifi.ssid};P:${fields.wifi.password};;`;
                break;
            default: newData = fields.text;
        }
        setData(newData || ' ');
    }, [qrType, fields]);

    const handleDownload = async () => {
        if (!containerRef.current) return;
        const fileName = `BarcodesMaker-QR`;
        const svgElement = containerRef.current.querySelector('svg');

        if (selectedDownloadFormat === 'png') {
            const svgString = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                canvas.width = size * 4; // High resolution
                canvas.height = size * 4;
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const link = document.createElement('a');
                link.download = `${fileName}.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
                URL.revokeObjectURL(url);
            };
            img.src = url;
        } else if (selectedDownloadFormat === 'svg') {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.svg`;
            a.click();
        } else if (selectedDownloadFormat === 'pdf') {
            const svgString = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                canvas.width = size * 2;
                canvas.height = size * 2;
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const imgData = canvas.toDataURL('image/png', 1.0);

                const pdf = new jsPDF({
                    unit: 'px',
                    format: [canvas.width + 40, canvas.height + 40]
                });
                pdf.addImage(imgData, 'PNG', 20, 20, canvas.width, canvas.height);
                pdf.save(`${fileName}.pdf`);
                URL.revokeObjectURL(url);
            };
            img.src = url;
        } else if (selectedDownloadFormat === 'eps') {
            alert(t('barcode.vector_alert'));
            setSelectedDownloadFormat('svg');
        }
    };

    const levelLabels = {
        'L': { label: 'Low', desc: '7% damage proof', color: 'bg-green-500/20 text-green-500' },
        'M': { label: 'Medium', desc: '15% damage proof', color: 'bg-yellow-500/20 text-yellow-500' },
        'Q': { label: 'High', desc: '25% damage proof', color: 'bg-orange-500/20 text-orange-500' },
        'H': { label: 'Maximum', desc: '30% damage proof', color: 'bg-red-500/20 text-red-500' },
    };

    const handleFieldChange = (key, value) => {
        setFields(prev => ({
            ...prev,
            [qrType]: typeof prev[qrType] === 'object'
                ? { ...prev[qrType], [key]: value }
                : value
        }));
    };

    const renderInputFields = () => {
        switch (qrType) {
            case 'text':
                return (
                    <textarea
                        rows="4"
                        value={fields.text}
                        onChange={(e) => handleFieldChange(null, e.target.value)}
                        className="input-field py-4 resize-none"
                        placeholder={t('qr.placeholders.text')}
                    />
                );
            case 'url':
                return (
                    <input
                        type="url"
                        value={fields.url}
                        onChange={(e) => handleFieldChange(null, e.target.value)}
                        className="input-field py-4"
                        placeholder={t('qr.placeholders.url')}
                    />
                );
            case 'phone':
                return (
                    <input
                        type="tel"
                        value={fields.phone}
                        onChange={(e) => handleFieldChange(null, e.target.value)}
                        className="input-field py-4"
                        placeholder={t('qr.placeholders.phone')}
                    />
                );
            case 'email':
                return (
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={fields.email.to}
                            onChange={(e) => handleFieldChange('to', e.target.value)}
                            className="input-field py-3"
                            placeholder={t('qr.placeholders.email_to')}
                        />
                        <input
                            type="text"
                            value={fields.email.subject}
                            onChange={(e) => handleFieldChange('subject', e.target.value)}
                            className="input-field py-3"
                            placeholder={t('qr.placeholders.email_subject')}
                        />
                        <textarea
                            rows="2"
                            value={fields.email.body}
                            onChange={(e) => handleFieldChange('body', e.target.value)}
                            className="input-field py-3 resize-none"
                            placeholder={t('qr.placeholders.email_body')}
                        />
                    </div>
                );
            case 'mecard':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={fields.mecard.name}
                            onChange={(e) => handleFieldChange('name', e.target.value)}
                            className="input-field py-3"
                            placeholder={t('qr.placeholders.name')}
                        />
                        <input
                            type="tel"
                            value={fields.mecard.tel}
                            onChange={(e) => handleFieldChange('tel', e.target.value)}
                            className="input-field py-3"
                            placeholder={t('qr.placeholders.tel')}
                        />
                        <input
                            type="email"
                            value={fields.mecard.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="input-field py-3 col-span-2"
                            placeholder={t('qr.placeholders.email')}
                        />
                    </div>
                );
            case 'wifi':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={fields.wifi.ssid}
                                onChange={(e) => handleFieldChange('ssid', e.target.value)}
                                className="input-field py-3"
                                placeholder={t('qr.placeholders.ssid')}
                            />
                            <select
                                value={fields.wifi.encryption}
                                onChange={(e) => handleFieldChange('encryption', e.target.value)}
                                className="input-field py-3 appearance-none cursor-pointer"
                            >
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">None</option>
                            </select>
                        </div>
                        <input
                            type="password"
                            value={fields.wifi.password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                            className="input-field py-3"
                            placeholder={t('qr.placeholders.pass')}
                        />
                    </div>
                );
            case 'vcard':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={fields.vcard.name} onChange={(e) => handleFieldChange('name', e.target.value)} className="input-field py-3" placeholder={t('qr.placeholders.name')} />
                        <input type="text" value={fields.vcard.org} onChange={(e) => handleFieldChange('org', e.target.value)} className="input-field py-3" placeholder={t('qr.placeholders.org')} />
                        <input type="tel" value={fields.vcard.tel} onChange={(e) => handleFieldChange('tel', e.target.value)} className="input-field py-3" placeholder={t('qr.placeholders.tel')} />
                        <input type="email" value={fields.vcard.email} onChange={(e) => handleFieldChange('email', e.target.value)} className="input-field py-3" placeholder={t('qr.placeholders.email')} />
                        <input type="url" value={fields.vcard.url} onChange={(e) => handleFieldChange('url', e.target.value)} className="input-field py-3 col-span-2" placeholder={t('qr.placeholders.web')} />
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column: Settings and Export */}
            <div className="space-y-8">
                <div className="glass-card p-8 md:p-10 space-y-8 animate-slideUp border-navy-800/40 bg-navy-800/30 overflow-hidden relative">
                    <div className="space-y-6">
                        {/* QR Type Selector */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-navy-400 dark:text-navy-500 uppercase tracking-widest block">{t('qr.data_type')}</label>
                            <div className="relative group">
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
                                    {qrTypes.map((t_item) => (
                                        <button
                                            key={t_item.id}
                                            onClick={() => setQrType(t_item.id)}
                                            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 ${qrType === t_item.id ? 'border-cyber-blue bg-cyber-blue/10 shadow-lg' : 'border-navy-800 bg-navy-900/40 hover:border-navy-600'}`}
                                        >
                                            <div className={`${qrType === t_item.id ? 'text-cyber-blue' : 'text-navy-500'}`}>{t_item.icon}</div>
                                            <span className={`text-[9px] font-black uppercase tracking-tight mt-2 ${qrType === t_item.id ? 'text-white' : 'text-navy-500'}`}>{t(t_item.labelKey)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-navy-400 dark:text-navy-500 uppercase tracking-widest block flex items-center gap-2">
                                {qrTypes.find(t_item => t_item.id === qrType)?.icon}
                                {t(qrTypes.find(t_item => t_item.id === qrType)?.labelKey)} {t('qr.details')}
                            </label>
                            <div className="relative animate-fadeIn">
                                {renderInputFields()}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-navy-400 uppercase tracking-widest flex items-center gap-2">
                                <Shield size={16} className="text-cyber-blue" />
                                {t('qr.error_correction')}
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {Object.keys(levelLabels).map((lvl) => (
                                    <button
                                        key={lvl}
                                        onClick={() => setLevel(lvl)}
                                        className={`px-3 py-4 rounded-2xl border-2 text-center transition-all duration-300 relative group/lvl ${level === lvl ? 'border-cyber-blue bg-cyber-blue/10 shadow-lg' : 'border-navy-800 bg-navy-900/40 hover:border-navy-600'}`}
                                    >
                                        <div className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${level === lvl ? 'text-white' : 'text-navy-500 group-hover/lvl:text-navy-300'}`}>
                                            {levelLabels[lvl].label}
                                        </div>
                                        <div className={`text-[8px] font-bold uppercase tracking-tight opacity-60 ${level === lvl ? 'text-cyber-blue' : 'text-navy-600'}`}>
                                            {lvl} {t('qr.level')}
                                        </div>
                                        {level === lvl && <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyber-blue rounded-full shadow-lg shadow-cyber-blue"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="pt-2 flex items-center justify-between">
                                <button
                                    onClick={() => setShowOptions(!showOptions)}
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-all group"
                                >
                                    <Settings2 size={14} className={`transition-transform duration-500 ${showOptions ? 'rotate-180' : ''}`} />
                                    {showOptions ? t('barcode.less_options') : t('barcode.more_options')}
                                </button>

                                {showOptions && (
                                    <button
                                        onClick={() => {
                                            setFgColor('#000000');
                                            setBgColor('#ffffff');
                                            setSize(256);
                                            setLevel('H');
                                        }}
                                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors"
                                        title="Reset to default"
                                    >
                                        <RotateCcw size={12} />
                                        {t('barcode.reset')}
                                    </button>
                                )}
                            </div>

                            {showOptions && (
                                <div className="mt-8 space-y-8 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.bar_color')}</label>
                                            <div className="flex items-center gap-3 bg-navy-900/50 p-2 rounded-xl border border-navy-800">
                                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                                <span className="text-[10px] font-mono font-bold text-navy-400 uppercase tracking-widest">{fgColor}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-navy-500 uppercase tracking-tighter">{t('barcode.background')}</label>
                                            <div className="flex items-center gap-3 bg-navy-900/50 p-2 rounded-xl border border-navy-800">
                                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                                <span className="text-[10px] font-mono font-bold text-navy-400 uppercase tracking-widest">{bgColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-black text-navy-500 uppercase flex items-center gap-2">
                                                <LayoutGrid size={12} /> {t('barcode.resolution')} (Pixel Size: {size}px)
                                            </label>
                                            <span className="text-[10px] font-black text-cyber-blue tracking-widest">{size > 512 ? 'High Density' : 'Standard'}</span>
                                        </div>
                                        <input type="range" min="128" max="1024" step="128" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-cyber-blue h-1 bg-navy-900 rounded-full appearance-none cursor-pointer" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Preview Side */}
            <div className="lg:sticky lg:top-32 space-y-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="relative group perspective">
                    <div className="absolute inset-0 bg-cyber-blue/5 blur-[120px] -z-10 rounded-full group-hover:bg-deep-blue/15 transition-all duration-1000"></div>

                    <div
                        ref={containerRef}
                        style={{ backgroundColor: bgColor }}
                        className="p-16 md:p-24 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex items-center justify-center min-h-[350px] transition-all duration-700 bg-white border border-white/5 overflow-hidden"
                    >
                        <QRCodeSVG
                            value={data}
                            size={size > 400 ? 400 : size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level={level}
                            includeMargin={true}
                            className="drop-shadow-sm transition-all duration-500"
                        />

                        <div className="absolute bottom-6 right-8 p-3 bg-navy-900/10 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-navy-400">{t('qr.security_check')}</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full mt-1 ${levelLabels[level].color}`}>{t('qr.level')} {level} {t('qr.active')}</span>
                        </div>
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-navy-800 border border-navy-700 py-4 px-8 rounded-2xl shadow-2xl backdrop-blur-xl opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${levelLabels[level].color.split(' ')[1]}`}></div>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{levelLabels[level].desc}</span>
                        </div>
                        <div className="w-px h-4 bg-navy-600"></div>
                        <div className="flex items-center gap-2">
                            <AlertCircle size={14} className="text-navy-500" />
                            <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest whitespace-nowrap">{data.length} {t('barcode.chars')} Input</span>
                        </div>
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
                    </button>
                </div>
            </div>
        </div>
    );
}
