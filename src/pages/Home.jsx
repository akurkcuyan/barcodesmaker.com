import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Barcode, ScanLine, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import GeneratorModule from '../components/Generator/GeneratorModule';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Helmet>
                <title>Free Barcode Generator & QR Code Maker Online | BarcodesMaker.com</title>
                <meta name="description" content="Generate EAN-13, Code 128, QR Codes and more barcodes free online. No signup, no server upload. Instant download in JPG, PNG, SVG." />
                <link rel="canonical" href="https://barcodesmaker.com/" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-blue/20 via-transparent to-transparent -z-10 blur-[120px] opacity-40"></div>
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyber-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>
                <div className="absolute -top-10 left-0 w-[400px] h-[400px] bg-deep-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>

                <div className="container mx-auto px-6 relative">
                    <div className="max-w-5xl mx-auto text-center space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-slate-200 dark:bg-navy-800 border border-navy-200 dark:border-navy-700 py-2 px-5 rounded-full shadow-lg"
                        >
                            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-navy-600 dark:text-navy-400">{t('hero.badge')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]"
                        >
                            {t('hero.title_main')}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue via-cyber-blue to-white text-glow">{t('hero.title_gradient')}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-navy-600 dark:text-navy-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <button
                                onClick={() => {
                                    document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn-primary px-10 py-5 text-lg group w-full sm:w-auto"
                            >
                                <Barcode className="group-hover:rotate-12 transition-transform" />
                                <span>{t('hero.start_btn')}</span>
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/scanner');
                                }}
                                className="btn-secondary px-10 py-5 text-lg group w-full sm:w-auto"
                            >
                                <ScanLine size={24} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                                <span>{t('hero.open_scanner')}</span>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="pt-10 flex flex-col items-center gap-4 text-navy-500 font-bold uppercase text-[10px] tracking-widest"
                        >
                            {t('hero.scroll_down')}
                            <ArrowDown size={14} className="animate-bounce" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Tool Area */}
            <section id="tool-section" className="relative pb-32 mesh-bg overflow-hidden">
                <div className="scanline"></div>

                <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start justify-center relative z-10">
                    <div className="flex-1 w-full max-w-5xl">
                        {/* Mode Switcher */}
                        <div className="flex justify-center mt-8 mb-12">
                            <div className="flex items-center gap-4 p-1.5 bg-slate-200/50 dark:bg-navy-800/40 rounded-[28px] border border-navy-200 dark:border-navy-700/50 shadow-xl backdrop-blur-md transition-colors">
                                <Link
                                    to="/"
                                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg`}
                                >
                                    {t('modes.generator')}
                                </Link>
                                <Link
                                    to="/scanner"
                                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 text-navy-500 hover:text-navy-900 dark:hover:text-white`}
                                >
                                    {t('modes.scanner')}
                                </Link>
                            </div>
                        </div>

                        <ErrorBoundary>
                            <motion.div
                                key="gen-view"
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                            >
                                <GeneratorModule />
                            </motion.div>
                        </ErrorBoundary>
                    </div>
                </div>
            </section>

            {/* Features grid */}
            <section className="py-20 bg-slate-100 dark:bg-navy-950/40 border-y border-navy-200 dark:border-navy-800 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { key: 'hd', icon: 'HD' },
                            { key: 'gs', icon: 'GS' },
                            { key: 'pr', icon: 'PR' }
                        ].map((f, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="w-14 h-14 bg-white dark:bg-navy-800 rounded-2xl flex items-center justify-center font-black text-cyber-blue border border-navy-200 dark:border-navy-700 shadow-lg group-hover:border-cyber-blue/30 transition-all shrink-0">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-navy-900 dark:text-white font-bold mb-2 uppercase text-xs tracking-widest">{t(`features.${f.key}.title`)}</h4>
                                    <p className="text-navy-600 dark:text-navy-500 text-sm leading-relaxed">{t(`features.${f.key}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
