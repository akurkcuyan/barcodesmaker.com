import React from 'react';
import { Barcode } from 'lucide-react';

export default function SplashScreen() {
    return (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy-900">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-deep-blue/30 blur-[150px] rounded-full" />
            </div>

            <div className="relative flex flex-col items-center gap-8 animate-fadeIn">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-2xl flex items-center justify-center p-3 shadow-2xl">
                        <Barcode className="text-white w-full h-full" />
                    </div>
                    <span className="text-3xl font-black text-white tracking-tight">
                        Barcodes<span className="text-cyber-blue">Maker</span>
                    </span>
                </div>

                {/* Animated barcode bars */}
                <div className="flex items-end gap-1 h-10">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((h, i) => (
                        <div
                            key={i}
                            className="bg-cyber-blue/60 rounded-sm animate-pulse"
                            style={{
                                width: '4px',
                                height: `${h * 3 + 10}px`,
                                animationDelay: `${i * 60}ms`,
                                animationDuration: '1.2s'
                            }}
                        />
                    ))}
                </div>

                {/* Loading text */}
                <p className="text-navy-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    Initializing Engine...
                </p>
            </div>
        </div>
    );
}
