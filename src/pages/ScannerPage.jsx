import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScannerModule from '../components/Scanner/ScannerModule';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ScannerPage() {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Helmet>
                <title>Free Online Barcode & QR Code Scanner | BarcodesMaker.com</title>
                <meta name="description" content="Scan barcodes and QR codes instantly using your camera or image file. Professional grade barcode reading directly in your browser without app downloads." />
                <link rel="canonical" href="https://barcodesmaker.com/scanner" />
            </Helmet>

            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-blue/10 via-transparent to-transparent -z-10 blur-[120px] opacity-40"></div>

                <div className="container mx-auto px-6 relative text-center max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue via-cyber-blue to-white text-glow">
                            Universal Scanner
                        </span>
                    </h1>
                    <p className="text-navy-600 dark:text-navy-400 text-lg font-medium leading-relaxed">
                        Access your camera or upload an image to instantly decode EAN, UPC, QR Codes, Code 128, and many other formats right in your browser. All decoding happens locally on your device for absolute privacy.
                    </p>
                </div>
            </section>

            {/* Main Tool Area */}
            <section id="tool-section" className="relative pb-32 mesh-bg overflow-hidden">
                <div className="scanline"></div>

                <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start justify-center relative z-10">
                    <div className="flex-1 w-full max-w-5xl">
                        {/* Mode Switcher */}
                        <div className="flex justify-center mt-4 mb-12">
                            <div className="flex items-center gap-4 p-1.5 bg-slate-200/50 dark:bg-navy-800/40 rounded-[28px] border border-navy-200 dark:border-navy-700/50 shadow-xl backdrop-blur-md transition-colors">
                                <Link
                                    to="/"
                                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 text-navy-500 hover:text-navy-900 dark:hover:text-white`}
                                >
                                    {t('modes.generator')}
                                </Link>
                                <Link
                                    to="/scanner"
                                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg`}
                                >
                                    {t('modes.scanner')}
                                </Link>
                            </div>
                        </div>

                        <ErrorBoundary>
                            <motion.div
                                key="scan-view"
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.5 }}
                            >
                                <ScannerModule />
                            </motion.div>
                        </ErrorBoundary>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
