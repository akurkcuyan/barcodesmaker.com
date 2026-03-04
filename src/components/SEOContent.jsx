import React from 'react';
import { ShieldCheck, Info, Package, QrCode } from 'lucide-react';

export default function SEOSection() {
    return (
        <section id="about" className="py-24 bg-navy-950/30 overflow-hidden relative border-t border-navy-800">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyber-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Why <span className="text-cyber-blue">BarcodesMaker?</span></h2>
                        <p className="text-navy-400 text-lg md:text-xl font-medium leading-relaxed">
                            BarcodesMaker.com is the definitive ecosystem for professional-grade barcode solutions. We combine cutting-edge browser technology with accessibility to provide a zero-cost, high-performance tool for businesses, developers, and individuals across the globe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6 animate-slideUp">
                            <div className="w-14 h-14 bg-deep-blue/20 text-deep-blue rounded-2xl flex items-center justify-center p-3 shadow-xl shadow-deep-blue/10">
                                <Package size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white">EAN-13 & Retail Standards</h3>
                            <p className="text-navy-400 leading-relaxed font-medium">
                                The **EAN-13** (European Article Number) barcode is the standard for global trade and retail. It consists of 13 digits and is globally unique, identifying not only the product but also the manufacturer and country of origin. At BarcodesMaker.com, we ensure every EAN-13 generated follows the strict checksum algorithms required for POS systems. Our high-resolution exports ensure that whether you're printing on product labels or digital packaging, the code remains pixel-perfect and scannable by laser and CMOS sensors alike.
                            </p>
                        </div>

                        <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
                            <div className="w-14 h-14 bg-cyber-blue/20 text-cyber-blue rounded-2xl flex items-center justify-center p-3 shadow-xl shadow-cyber-blue/10">
                                <Info size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white">Code 128 Architecture</h3>
                            <p className="text-navy-400 leading-relaxed font-medium">
                                For industrial applications, logistics, and supply chain management, **Code 128** is the gold standard. Unlike retail-focused EAN codes, Code 128 is high-density and alphanumeric, capable of encoding complex data strings, serial numbers, and shipping identifiers. Our generator optimizes the "Set A, B, and C" switching logic to create the shortest possible barcode length, maximizing space on small shipping labels and ensuring high-speed readability in automated sorting facilities.
                            </p>
                        </div>

                        <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                            <div className="w-14 h-14 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center p-3 shadow-xl shadow-purple-500/10">
                                <QrCode size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white">The QR Code Revolution</h3>
                            <p className="text-navy-400 leading-relaxed font-medium">
                                Originally designed for automotive tracking, **QR Codes** (Quick Response Codes) have revolutionized how we interact with the physical world. From URLs and Wi-Fi credentials to complex digital business cards, our QR tool supports "High Error Correction" (Level H). This means your QR codes remain functional even if up to 30% of the symbol is damaged or obscured. At BarcodesMaker, we empower you to customize colors and export in vector formats (SVG) for large-scale print production like billboards or professional signage.
                            </p>
                        </div>

                        <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                            <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center p-3 shadow-xl shadow-green-500/10">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white">Browser-Side Sovereignty</h3>
                            <p className="text-navy-400 leading-relaxed font-medium">
                                We believe in privacy by design. Unlike other online tools that transmit your data to remote servers, BarcodesMaker.com runs 100% in your local browser environment. This "Edge Computing" approach means your sensitive data—whether it's proprietary SKU numbers or private URLs—never leaves your computer. This architecture not only makes our tools faster but also ensures they are inherently compliant with modern data protection regulations like GDPR and CCPA.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 p-12 bg-navy-800/20 rounded-[40px] border border-navy-800/40 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-deep-blue via-cyber-blue to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-navy-400 leading-loose italic text-center text-lg">
                            "BarcodesMaker.com provides the bridge between digital data and physical identity. As the global supply chain scales, our mission is to provide the reliable, professional, and accessible tools necessary for creators and businesses to thrive in the modern economy. Every EAN-13, Code 128, and QR Code generated here is a testament to our commitment to precision."
                        </p>
                        <div className="mt-8 flex justify-center items-center gap-4">
                            <div className="w-12 h-1 bg-navy-700/50 rounded-full"></div>
                            <span className="text-xs text-navy-600 font-black uppercase tracking-widest">The BarcodesMaker Vision</span>
                            <div className="w-12 h-1 bg-navy-700/50 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
