import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay to avoid flash on page load
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('cookie_consent', 'all');
        setVisible(false);
    };

    const acceptNecessary = () => {
        localStorage.setItem('cookie_consent', 'necessary');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-fadeIn">
            <div className="max-w-4xl mx-auto bg-navy-800/95 backdrop-blur-xl border border-navy-700 rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-cyber-blue/10 rounded-xl flex items-center justify-center shrink-0 border border-cyber-blue/20">
                        <Cookie size={20} className="text-cyber-blue" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 space-y-1">
                        <h4 className="text-white font-bold text-sm">We use cookies</h4>
                        <p className="text-navy-400 text-xs leading-relaxed">
                            We use cookies to improve your experience and show relevant ads via Google AdSense.
                            Your barcode data is <strong className="text-cyber-blue">never stored</strong> — processing is 100% local.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        <button
                            onClick={acceptNecessary}
                            className="px-4 py-2 text-xs font-bold text-navy-400 hover:text-white border border-navy-600 hover:border-navy-500 rounded-xl transition-colors"
                        >
                            Necessary Only
                        </button>
                        <button
                            onClick={acceptAll}
                            className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
                        >
                            <ShieldCheck size={14} />
                            Accept All
                        </button>
                        <button
                            onClick={() => setVisible(false)}
                            className="p-2 text-navy-500 hover:text-white transition-colors"
                            title="Dismiss"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
