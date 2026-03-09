import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BookOpen, HelpCircle, Layers, CheckCircle } from 'lucide-react';

export default function Guides() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-navy-900 pt-32 pb-20 px-6 font-sans">
            <Helmet>
                <title>Comprehensive Barcode & QR Code Guides | BarcodesMaker</title>
                <meta name="description" content="Learn everything about 1D and 2D barcodes. Detailed guides on EAN, UPC, Code 128, and QR codes. Find answers to frequently asked questions about barcode generation and scanning." />
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-4 bg-cyber-blue/10 rounded-2xl mb-4">
                        <BookOpen size={48} className="text-cyber-blue" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-900 dark:text-white tracking-tight">
                        Barcode & QR Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-cyber-blue">Guides</span>
                    </h1>
                    <p className="text-xl text-navy-600 dark:text-navy-400 max-w-2xl mx-auto leading-relaxed">
                        Your ultimate resource for understanding different barcode formats, how they work, and choosing the right one for your needs.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">

                    {/* Section 1: Introduction */}
                    <section className="glass-card p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-3">
                            <Layers className="text-cyber-blue" />
                            Understanding Barcode Technology
                        </h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-navy-700 dark:text-navy-300 space-y-4">
                            <p>
                                A barcode is a machine-readable representation of data visualized as parallel lines and spaces of varying widths. Originally developed to track railroad cars, barcodes are now ubiquitous across retail, healthcare, logistics, and inventory management worldwide.
                            </p>
                            <p>
                                Traditional barcodes (known as 1D or linear barcodes) represent data systematically by varying the widths and spacings of parallel lines. Modern advancements have led to 2D barcodes (like QR codes and Data Matrix), which use geometric patterns in two dimensions to store significantly more information, including text, URLs, and binary data.
                            </p>
                            <p>
                                By utilizing high-quality barcode generators like BarcodesMaker, businesses can ensure their products are easily scannable, reducing human error during data entry and streamlining supply chain operations.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: 1D Formats */}
                    <section className="glass-card p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Common 1D Barcode Formats</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-navy-50 dark:bg-navy-800/50 p-6 rounded-2xl border border-navy-100 dark:border-navy-700">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">EAN-13 & UPC-A</h3>
                                <p className="text-navy-600 dark:text-navy-400 text-sm mb-4">
                                    The global standards for retail point-of-sale. UPC-A is predominantly used in North America, while EAN-13 is used globally. They contain numerical digits exclusively representing the product's global trade item number (GTIN).
                                </p>
                                <ul className="space-y-2 text-sm text-navy-700 dark:text-navy-300">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Numeric only</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Required for supermarkets</li>
                                </ul>
                            </div>

                            <div className="bg-navy-50 dark:bg-navy-800/50 p-6 rounded-2xl border border-navy-100 dark:border-navy-700">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Code 128</h3>
                                <p className="text-navy-600 dark:text-navy-400 text-sm mb-4">
                                    A highly versatile and compact alphanumeric barcode. It can encode all 128 ASCII characters. It is the preferred standard for logistics, shipping labels, and internal tracking due to its high data density.
                                </p>
                                <ul className="space-y-2 text-sm text-navy-700 dark:text-navy-300">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Alphanumeric</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Variable length</li>
                                </ul>
                            </div>

                            <div className="bg-navy-50 dark:bg-navy-800/50 p-6 rounded-2xl border border-navy-100 dark:border-navy-700">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Code 39</h3>
                                <p className="text-navy-600 dark:text-navy-400 text-sm mb-4">
                                    An older alphameric format still widely used in automotive and defense industries. It only supports uppercase letters (A-Z), numeric digits (0-9), and a handful of special characters.
                                </p>
                                <ul className="space-y-2 text-sm text-navy-700 dark:text-navy-300">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Easily scannable</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Low data density</li>
                                </ul>
                            </div>

                            <div className="bg-navy-50 dark:bg-navy-800/50 p-6 rounded-2xl border border-navy-100 dark:border-navy-700">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">ITF-14</h3>
                                <p className="text-navy-600 dark:text-navy-400 text-sm mb-4">
                                    Used exclusively to mark cartons and pallets comprising packaging levels of a product. It usually features thick black borders (bearer bars) to prevent short-scanning and prints well on corrugated cardboard.
                                </p>
                                <ul className="space-y-2 text-sm text-navy-700 dark:text-navy-300">
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Wholesale & Logistics</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> High printing tolerance</li>
                                </ul>
                            </div>

                        </div>
                    </section>

                    {/* Section 3: 2D Formats */}
                    <section className="glass-card p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">The Power of 2D Barcodes</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-navy-700 dark:text-navy-300 space-y-4">
                            <p>
                                Two-dimensional codes revolutionized data sharing by expanding capacity horizontally and vertically. The most famous 2D format is the <strong>Quick Response (QR) Code</strong>.
                            </p>
                            <p>
                                Unlike 1D barcodes that require a laser line to read across the bars, 2D codes are read by image scanners (like smartphone cameras). This allows them to encode complex data types natively. With our QR Code generator, you can instantly create codes for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-cyber-blue">
                                <li><strong>Website URLs:</strong> Direct users to your homepage, menus, or promotional landing pages.</li>
                                <li><strong>WiFi Credentials:</strong> Securely share network access without revealing plaintext passwords.</li>
                                <li><strong>vCard (Contacts):</strong> Instantly transfer phone numbers, emails, and physical addresses to a user's address book.</li>
                                <li><strong>Crypto Wallets:</strong> Facilitate seamless cryptocurrency transactions by providing exact public addresses.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: FAQ */}
                    <section className="glass-card p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 flex items-center gap-3">
                            <HelpCircle className="text-cyber-blue" />
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-6">
                            <div className="border-b border-navy-200 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Do I need to officially register a barcode?</h3>
                                <p className="text-navy-600 dark:text-navy-400">
                                    If you are generating a barcode for internal use (inventory tracking, internal tickets, asset management), no registration is required. You can freely use formats like Code 128. However, if you are selling retail products globally (like on Amazon or in grocery stores), you must purchase an official GTIN/UPC prefix from GS1. You can then use our tool to generate the visual barcode image for your registered number.
                                </p>
                            </div>

                            <div className="border-b border-navy-200 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Why does my barcode fail to scan?</h3>
                                <p className="text-navy-600 dark:text-navy-400">
                                    Scanning failures usually stem from contrast issues or scaling. Ensure there is high contrast between the bars and background (black on white is best). Avoid resizing barcode images disproportionately. If printing, ensure the printer DPI is high enough so the tight spaces don't bleed into one another. Always test scan your printouts.
                                </p>
                            </div>

                            <div className="border-b border-navy-200 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Can I generate multiple barcodes at once?</h3>
                                <p className="text-navy-600 dark:text-navy-400">
                                    Yes! Our platform supports batch processing. Simply paste your data list into the generator input box, separating each entry with a new line (Enter). Our system will preview all visual codes instantly, and you can download them securely mapped into a standard ZIP file.
                                </p>
                            </div>

                            <div className="border-b border-navy-200 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Is the data processed securely?</h3>
                                <p className="text-navy-600 dark:text-navy-400">
                                    Absolutely. BarcodesMaker is a 100% client-side application. The barcode rendering algorithms run directly inside your computer's browser. We do not transmit your sensitive payload data (like WiFi passwords or internal IDs) to any external server. Your data remains strictly on your device.
                                </p>
                            </div>
                        </div>

                    </section>

                </div>
            </div>
        </div>
    );
}
