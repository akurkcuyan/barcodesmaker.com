import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ShoppingCart, Box, QrCode, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, MousePointerClick, Download } from 'lucide-react';

// Supported barcode formats data
const FORMATS = [
    { name: 'EAN-13', use: 'Retail / Grocery', desc: 'Global product identification for POS systems' },
    { name: 'EAN-8', use: 'Small packaging', desc: 'Compact product codes for small items' },
    { name: 'UPC-A', use: 'US Retail', desc: 'Standard for US and Canadian retail products' },
    { name: 'UPC-E', use: 'US Retail (compact)', desc: 'Compressed UPC-A for small packages' },
    { name: 'Code 128', use: 'Logistics / Shipping', desc: 'High-density alphanumeric for supply chain' },
    { name: 'Code 39', use: 'Industrial / Automotive', desc: 'Alphanumeric barcode for manufacturing' },
    { name: 'Code 93', use: 'Logistics', desc: 'Compact, secure variant of Code 39' },
    { name: 'ITF-14', use: 'Cartons / Pallets', desc: 'Outer shipping carton identification' },
    { name: 'MSI Plessey', use: 'Inventory / Retail', desc: 'Shelf labels and inventory management' },
    { name: 'Codabar', use: 'Healthcare / Libraries', desc: 'Used in blood banks and libraries' },
    { name: 'QR Code', use: 'Universal (URL, vCard, WiFi…)', desc: 'Matrix code with high error correction' },
    { name: 'DataMatrix', use: 'Electronics / Pharma', desc: 'Tiny footprint for component marking' },
];

function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border border-navy-200 dark:border-navy-700/60 rounded-2xl overflow-hidden transition-colors">
            <button
                onClick={onClick}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800/60 transition-colors"
            >
                <span className="font-bold text-navy-900 dark:text-white text-sm md:text-base leading-snug">{question}</span>
                {isOpen
                    ? <ChevronUp size={18} className="text-cyber-blue shrink-0" />
                    : <ChevronDown size={18} className="text-navy-400 shrink-0" />}
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-0 bg-white dark:bg-navy-900 text-navy-600 dark:text-navy-400 text-sm leading-relaxed border-t border-navy-100 dark:border-navy-800 transition-colors">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function SEOContent() {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { q: t('seo.faq_q1'), a: t('seo.faq_a1') },
        { q: t('seo.faq_q2'), a: t('seo.faq_a2') },
        { q: t('seo.faq_q3'), a: t('seo.faq_a3') },
        { q: t('seo.faq_q4'), a: t('seo.faq_a4') },
        { q: t('seo.faq_q5'), a: t('seo.faq_a5') },
        { q: t('seo.faq_q6'), a: t('seo.faq_a6') },
    ];

    const howSteps = [
        { icon: <MousePointerClick size={28} />, title: t('seo.how_step1_title'), desc: t('seo.how_step1_desc') },
        { icon: <CheckCircle2 size={28} />, title: t('seo.how_step2_title'), desc: t('seo.how_step2_desc') },
        { icon: <Download size={28} />, title: t('seo.how_step3_title'), desc: t('seo.how_step3_desc') },
    ];

    return (
        <>
            {/* ── WHY BARCODESMAKER ── */}
            <section id="about" className="py-24 bg-slate-100/50 dark:bg-navy-950/30 border-b border-navy-200 dark:border-navy-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Intro */}
                        <div className="text-center space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-navy-900 dark:text-white">
                                {t('seo.why_title')} <span className="text-cyber-blue">{t('seo.why_brand')}</span>
                            </h2>
                            <p className="text-navy-600 dark:text-navy-400 text-lg md:text-xl leading-relaxed font-medium">
                                {t('seo.sub_text')}
                            </p>
                        </div>

                        {/* Detailed Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-white dark:bg-navy-900 rounded-2xl flex items-center justify-center text-cyber-blue border border-navy-200 dark:border-navy-800 shadow-xl group-hover:scale-110 transition-transform">
                                    <ShoppingCart size={28} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-widest text-cyber-blue">{t('seo.ean_title')}</h3>
                                    <p className="text-navy-600 dark:text-navy-500 leading-relaxed">
                                        <Trans i18nKey="seo.ean_text">
                                            The **EAN-13** (European Article Number) barcode is the standard for global trade and retail. It consists of 13 digits and is globally unique, identifying not only the product but also the manufacturer and country of origin. At BarcodesMaker.com, we ensure every EAN-13 generated follows the strict checksum algorithms required for POS systems.
                                        </Trans>
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-white dark:bg-navy-900 rounded-2xl flex items-center justify-center text-cyber-blue border border-navy-200 dark:border-navy-800 shadow-xl group-hover:scale-110 transition-transform">
                                    <Box size={28} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-widest text-cyber-blue">{t('seo.code128_title')}</h3>
                                    <p className="text-navy-600 dark:text-navy-500 leading-relaxed">
                                        <Trans i18nKey="seo.code128_text">
                                            For industrial applications, logistics, and supply chain management, **Code 128** is the gold standard. Unlike retail-focused EAN codes, Code 128 is high-density and alphanumeric, capable of encoding complex data strings, serial numbers, and shipping identifiers.
                                        </Trans>
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-white dark:bg-navy-900 rounded-2xl flex items-center justify-center text-cyber-blue border border-navy-200 dark:border-navy-800 shadow-xl group-hover:scale-110 transition-transform">
                                    <QrCode size={28} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-widest text-cyber-blue">{t('seo.qr_title')}</h3>
                                    <p className="text-navy-600 dark:text-navy-500 leading-relaxed">
                                        <Trans i18nKey="seo.qr_text">
                                            Originally designed for automotive tracking, **QR Codes** (Quick Response Codes) have revolutionized how we interact with the physical world. From URLs and Wi-Fi credentials to complex digital business cards, our QR tool supports \"High Error Correction\" (Level H).
                                        </Trans>
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-white dark:bg-navy-900 rounded-2xl flex items-center justify-center text-cyber-blue border border-navy-200 dark:border-navy-800 shadow-xl group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={28} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black uppercase tracking-widest text-cyber-blue">{t('seo.browser_title')}</h3>
                                    <p className="text-navy-600 dark:text-navy-500 leading-relaxed">
                                        {t('seo.browser_text')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mission Quote */}
                        <div className="relative p-10 md:p-16 rounded-[40px] bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xl overflow-hidden transition-colors">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-blue/5 blur-3xl -z-10 rounded-full"></div>
                            <div className="space-y-8 relative">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-cyber-blue">{t('seo.vision')}</span>
                                <blockquote className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white leading-tight italic">
                                    "{t('seo.quote')}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-1 bg-cyber-blue rounded-full"></div>
                                    <span className="text-sm font-black uppercase tracking-widest text-navy-400">Team BarcodesMaker</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-24 bg-white dark:bg-navy-900 border-b border-navy-200 dark:border-navy-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                                {t('seo.how_title')}
                            </h2>
                            <p className="text-navy-500 dark:text-navy-400 text-lg">{t('seo.how_subtitle')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {howSteps.map((step, i) => (
                                <div key={i} className="relative flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-slate-50 dark:bg-navy-800/40 border border-navy-100 dark:border-navy-700/50 group hover:border-cyber-blue/40 transition-all">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-deep-blue to-cyber-blue text-white text-xs font-black flex items-center justify-center shadow-lg">
                                        {i + 1}
                                    </div>
                                    <div className="w-16 h-16 bg-white dark:bg-navy-900 rounded-2xl flex items-center justify-center text-cyber-blue border border-navy-200 dark:border-navy-700 shadow-lg group-hover:scale-110 transition-transform mt-2">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-black text-navy-900 dark:text-white text-sm uppercase tracking-wider">{step.title}</h3>
                                    <p className="text-navy-500 dark:text-navy-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SUPPORTED FORMATS ── */}
            <section className="py-24 bg-slate-50 dark:bg-navy-950/40 border-b border-navy-200 dark:border-navy-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                                {t('seo.formats_title')}
                            </h2>
                            <p className="text-navy-500 dark:text-navy-400 text-lg max-w-2xl mx-auto">
                                {t('seo.formats_subtitle')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {FORMATS.map((f, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 hover:border-cyber-blue/30 transition-all group shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-blue/10 to-cyber-blue/20 flex items-center justify-center shrink-0 group-hover:from-deep-blue/20 group-hover:to-cyber-blue/30 transition-all">
                                        <span className="text-cyber-blue text-xs font-black">▌▌</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-navy-900 dark:text-white text-sm">{f.name}</p>
                                        <p className="text-cyber-blue text-xs font-semibold mb-1">{f.use}</p>
                                        <p className="text-navy-500 dark:text-navy-500 text-xs leading-snug">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="py-24 bg-white dark:bg-navy-900 border-b border-navy-200 dark:border-navy-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                                {t('seo.faq_title')}
                            </h2>
                            <p className="text-navy-500 dark:text-navy-400 text-lg">{t('seo.faq_subtitle')}</p>
                        </div>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem
                                    key={i}
                                    question={faq.q}
                                    answer={faq.a}
                                    isOpen={openFaq === i}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
