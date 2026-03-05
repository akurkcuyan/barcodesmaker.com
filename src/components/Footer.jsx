import React from 'react';
import { Barcode, Github, Twitter, Mail, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer({ onNav, onOpenLegal }) {
    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-navy-900 border-t border-navy-200 dark:border-navy-800 transition-colors">
            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 space-y-8">
                        <a href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:rotate-12 transition-transform">
                                <Barcode className="text-white w-full h-full" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white">
                                Barcodes<span className="text-cyber-blue">Maker</span>
                            </span>
                        </a>
                        <p className="text-navy-600 dark:text-navy-400 text-sm font-medium leading-relaxed">
                            {t('footer.tagline')}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://x.com/barcodesmaker" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-navy-800 rounded-xl text-navy-500 hover:text-cyber-blue border border-navy-200 dark:border-navy-700 transition-all hover:scale-110" title="Follow on X (Twitter)">
                                <Twitter size={20} />
                            </a>
                            <a href="https://github.com/barcodesmaker" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-navy-800 rounded-xl text-navy-500 hover:text-cyber-blue border border-navy-200 dark:border-navy-700 transition-all hover:scale-110" title="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="mailto:hello@barcodesmaker.com" className="p-3 bg-slate-100 dark:bg-navy-800 rounded-xl text-navy-500 hover:text-cyber-blue border border-navy-200 dark:border-navy-700 transition-all hover:scale-110">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-cyber-blue">{t('footer.links')}</h4>
                        <nav className="flex flex-col gap-4">
                            {['Generator', 'Scanner', 'About'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === 'About') {
                                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            onNav?.(item.toLowerCase());
                                        }
                                    }}
                                    className="text-navy-600 dark:text-navy-400 font-bold hover:text-cyber-blue dark:hover:text-white transition-colors flex items-center gap-2 group w-fit"
                                >
                                    <span className="w-1.5 h-1.5 bg-navy-300 dark:bg-navy-700 rounded-full group-hover:bg-cyber-blue transition-colors"></span>
                                    {t(`nav.${item.toLowerCase()}`)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Resources */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-cyber-blue">{t('footer.legal')}</h4>
                        <nav className="flex flex-col gap-4">
                            <button
                                onClick={() => onOpenLegal?.('privacy')}
                                className="text-navy-600 dark:text-navy-400 font-bold hover:text-cyber-blue dark:hover:text-white transition-colors text-left flex items-center gap-2 group"
                            >
                                <ShieldCheck size={16} /> Privacy Policy
                            </button>
                            <button
                                onClick={() => onOpenLegal?.('terms')}
                                className="text-navy-600 dark:text-navy-400 font-bold hover:text-cyber-blue dark:hover:text-white transition-colors text-left flex items-center gap-2 group"
                            >
                                <ExternalLink size={16} /> Terms of Service
                            </button>
                            <a
                                href="mailto:hello@barcodesmaker.com"
                                className="text-navy-600 dark:text-navy-400 font-bold hover:text-cyber-blue dark:hover:text-white transition-colors text-left flex items-center gap-2 group"
                            >
                                <Mail size={16} /> Contact Support
                            </a>
                        </nav>
                    </div>

                    {/* Status Section */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-navy-800/40 border border-navy-200 dark:border-navy-700 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-navy-500">{t('footer.online')}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-black text-navy-900 dark:text-white">v1.2.0</span>
                                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-tighter">Production Build Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-navy-100 dark:border-navy-800 flex flex-col md:flex-row justify-between items-center gap-6 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-navy-400 text-center md:text-left">
                        © {new Date().getFullYear()} BarcodesMaker.com. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-navy-400">
                        Made with <Heart size={12} className="text-red-500 animate-pulse" /> for Global Trade
                    </div>
                </div>
            </div>
        </footer>
    );
}
