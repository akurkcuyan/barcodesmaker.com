import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy-950/80 backdrop-blur-md animate-fadeIn"
                onClick={onClose}
            ></div>

            {/* Content Container */}
            <div className="relative w-full max-w-2xl bg-navy-900 border border-navy-800 rounded-3xl shadow-2xl shadow-cyber-blue/5 overflow-hidden animate-slideUp">
                <div className="flex items-center justify-between p-6 border-b border-navy-800">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button
                        className="p-2 text-navy-400 hover:text-white transition-colors"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto prose prose-invert prose-blue scroll-smooth">
                    {children}
                </div>
            </div>
        </div>
    );
}
