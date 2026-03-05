import React, { useEffect } from 'react';

export default function AdPlacement({ type = 'horizontal', className = '', adSlot = '' }) {
    const isHorizontal = type === 'horizontal';
    const isSidebar = type === 'sidebar';

    useEffect(() => {
        try {
            // Push to Google Ads only if an adSlot is provided
            if (adSlot && window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, [adSlot]);

    return (
        <div className={`ad-container relative flex items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-navy-800 bg-navy-800/10 backdrop-blur-sm group transition-all duration-300 ${isHorizontal ? 'w-full h-24 md:h-32 my-8' : ''} ${isSidebar ? 'w-full lg:w-80 h-[400px] lg:h-[600px] shrink-0 sticky top-24' : ''} ${className}`}>

            {adSlot ? (
                <ins className="adsbygoogle"
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%'
                    }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your ID
                    data-ad-slot={adSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            ) : (
                <>
                    {/* Background Decor Placeholder */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-blue via-transparent to-transparent blur-3xl"></div>
                    </div>

                    {/* Content Placeholder */}
                    <div className="relative text-center p-6 flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-navy-600 font-bold mb-1">Space for Ad</span>
                        <div className="w-12 h-1 bg-navy-700/50 rounded-full mb-2"></div>
                        <p className="text-navy-500 text-xs font-medium max-w-[140px]">This space is reserved for Google AdSense</p>
                    </div>
                </>
            )}

            {/* Shimmer Effect */}
            {!adSlot && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>}
        </div>
    );
}
