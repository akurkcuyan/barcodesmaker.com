import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ShoppingCart, Box, QrCode, ShieldCheck } from 'lucide-react';

export default function SEOContent() {
    const { t } = useTranslation();

    return (
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
    );
}
