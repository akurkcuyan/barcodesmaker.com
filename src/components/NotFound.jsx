import React from 'react';
import { Barcode, Home, ArrowLeft } from 'lucide-react';

export default function NotFound({ onNav }) {
    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center px-6">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-deep-blue/20 blur-[150px] rounded-full opacity-40" />
            </div>

            <div className="text-center max-w-lg mx-auto space-y-8 animate-fadeIn">
                {/* 404 Visual */}
                <div className="relative">
                    <div className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-deep-blue via-cyber-blue to-white leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Barcode size={200} className="text-cyber-blue" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
                    <p className="text-navy-400 text-base leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back to generating barcodes!
                    </p>
                </div>

                {/* Barcode decoration */}
                <div className="flex justify-center gap-px opacity-30">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5].map((w, i) => (
                        <div
                            key={i}
                            className="bg-cyber-blue rounded-sm"
                            style={{ width: `${w * 3}px`, height: '48px' }}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => onNav ? onNav('generator') : window.location.href = '/'}
                        className="btn-primary px-8 py-3 flex items-center gap-2 justify-center"
                    >
                        <Home size={18} />
                        <span>Go to Homepage</span>
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary px-8 py-3 flex items-center gap-2 justify-center"
                    >
                        <ArrowLeft size={18} />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
