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
            <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 rounded-3xl shadow-2xl overflow-hidden animate-slideUp transition-colors duration-300">
                <div className="flex items-center justify-between p-6 border-b border-navy-200 dark:border-navy-800">
                    <h2 className="text-xl font-bold text-navy-900 dark:text-white">{title}</h2>
                    <button
                        className="p-2 text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto prose dark:prose-invert prose-blue scroll-smooth text-navy-700 dark:text-navy-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
