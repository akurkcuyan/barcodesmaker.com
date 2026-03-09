import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Twitter, Github } from 'lucide-react';

export default function Contact() {
    return (
        <React.Fragment>
            <Helmet>
                <title>Contact Us | BarcodesMaker.com</title>
                <meta name="description" content="Get in touch with the BarcodesMaker.com team for support, feature requests, or business inquiries." />
                <link rel="canonical" href="https://barcodesmaker.com/contact" />
            </Helmet>

            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyber-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-2xl flex items-center justify-center p-4 shadow-xl">
                            <Mail className="text-white w-full h-full" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-cyber-blue">Support</span>
                        </h1>
                    </div>

                    <div className="bg-white/50 dark:bg-navy-800/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-navy-200 dark:border-navy-700 shadow-xl">
                        <p className="text-lg text-navy-600 dark:text-navy-300 mb-8 leading-relaxed">
                            Have a question about a generated barcode? Found a bug? Or simply want to drop us a note? We'd love to hear from you. We respond to most inquiries within 48 hours.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-slate-100 dark:bg-navy-900/50 rounded-2xl border border-navy-200 dark:border-navy-700 hover:border-cyber-blue transition-colors group">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-cyber-blue transition-colors">Email Us</h3>
                                <p className="text-navy-500 mb-4 text-sm">For all general inquiries, bug reports, and partnership requests.</p>
                                <a href="mailto:hello@barcodesmaker.com" className="inline-flex items-center gap-2 font-bold text-cyber-blue hover:text-deep-blue">
                                    <Mail size={18} /> hello@barcodesmaker.com
                                </a>
                            </div>

                            <div className="p-6 bg-slate-100 dark:bg-navy-900/50 rounded-2xl border border-navy-200 dark:border-navy-700 hover:border-cyber-blue transition-colors group">
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-cyber-blue transition-colors">Social & Open Source</h3>
                                <p className="text-navy-500 mb-4 text-sm">Reach out to us on X or contribute via our GitHub repository.</p>
                                <div className="flex gap-4">
                                    <a href="https://x.com/barcodesmaker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-cyber-blue hover:text-deep-blue">
                                        <Twitter size={18} /> Twitter
                                    </a>
                                    <a href="https://github.com/barcodesmaker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-cyber-blue hover:text-deep-blue">
                                        <Github size={18} /> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
