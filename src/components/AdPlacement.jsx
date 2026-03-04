import React from 'react';

export default function AdPlacement({ type = 'horizontal', className = '' }) {
    const isHorizontal = type === 'horizontal';
    const isSidebar = type === 'sidebar';

    return (
        <div className={`ad-container relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-navy-800 bg-navy-800/20 backdrop-blur-sm group transition-all duration-300 ${isHorizontal ? 'w-full h-24 md:h-32 my-8' : ''} ${isSidebar ? 'w-full lg:w-80 h-[400px] lg:h-[600px] shrink-0 sticky top-24' : ''} ${className}`}>
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-blue via-transparent to-transparent blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative text-center p-6 flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-navy-600 font-bold mb-1">Advertisement</span>
                <div className="w-12 h-1 bg-navy-700/50 rounded-full mb-2"></div>
                <p className="text-navy-500 text-xs font-medium max-w-[140px]">Sponsored by Google Ads</p>
                <div className="mt-4 text-[10px] text-navy-500/30 font-mono">AD_UNIT_ID_PLACEHOLDER</div>
            </div>

            {/* Loading Shimmer (Simulated) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
        </div>
    );
}
