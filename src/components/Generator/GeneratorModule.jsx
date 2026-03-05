import React, { useState } from 'react';
import BarcodeGenerator from './BarcodeGenerator';
import QRCodeGenerator from './QRCodeGenerator';
import { Barcode as BarcodeIcon, QrCode as QrIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function GeneratorModule() {
    const [activeTab, setActiveTab] = useState('barcode');
    const { t } = useTranslation();

    return (
        <section id="generator" className="py-20 animate-fadeIn overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-cyber-blue">Generator</span>
                    </h2>
                    <p className="text-navy-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Create high-resolution barcodes and QR codes instantly. Fast, reliable, and optimized for professional use.
                    </p>
                </div>

                {/* Tab switcher - centered, pushed down */}
                <div className="flex justify-center mt-10 mb-14">
                    <div className="bg-navy-800/50 p-1.5 rounded-full flex items-center gap-1 border border-navy-700 backdrop-blur-sm shadow-xl">
                        <button
                            onClick={() => setActiveTab('barcode')}
                            className={`tab-item flex items-center gap-2 ${activeTab === 'barcode' ? 'tab-item-active' : 'tab-item-inactive'}`}
                        >
                            <BarcodeIcon size={20} />
                            <span>{t('modes.generator')} — Barcode</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('qrcode')}
                            className={`tab-item flex items-center gap-2 ${activeTab === 'qrcode' ? 'tab-item-active' : 'tab-item-inactive'}`}
                        >
                            <QrIcon size={20} />
                            <span>QR Code Maker</span>
                        </button>
                    </div>
                </div>

                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'barcode' ? (
                            <motion.div
                                key="barcode-mod"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BarcodeGenerator />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="qrcode-mod"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <QRCodeGenerator />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
