import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Barcode } from 'lucide-react';

export default function AboutUs() {
    return (
        <React.Fragment>
            <Helmet>
                <title>About Us | BarcodesMaker.com</title>
                <meta name="description" content="Learn more about BarcodesMaker.com. We provide free, fast, and privacy-focused barcode generation tools to businesses worldwide." />
                <link rel="canonical" href="https://barcodesmaker.com/about" />
            </Helmet>

            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-deep-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-2xl flex items-center justify-center p-4 shadow-xl">
                            <Barcode className="text-white w-full h-full" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-cyber-blue">BarcodesMaker</span>
                        </h1>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-navy-900 dark:prose-headings:text-white prose-a:text-cyber-blue hover:prose-a:text-deep-blue transition-colors bg-white/50 dark:bg-navy-800/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-navy-200 dark:border-navy-700 shadow-xl">
                        <p className="lead text-xl text-navy-700 dark:text-navy-300 font-medium">
                            BarcodesMaker.com was built with a simple mission: to provide developers, retailers, and supply chain managers with lightning-fast, highly accurate barcode tools entirely free of charge.
                        </p>

                        <h3>Our Philosophy</h3>
                        <p>We saw that many barcode generators were slow, overloaded with tracking scripts, or hid high-resolution files behind a paywall. We decided to build a platform that functions entirely within the browser. We combine high-performance graphics rendering through the HTML5 Canvas API and SVG technology to render the sharpest possible codes.</p>

                        <h3>Privacy by Design</h3>
                        <p>By shifting processing power client-side (to your browser), we've eliminated the need to send product tracking numbers, ISBNs, or private Wi-Fi passwords to a distant server. What gets typed in your browser stays in your browser.</p>

                        <h3>Technology Stack</h3>
                        <p>We leverage open web technologies to deliver professional output. Our tools are built with React and rely on rock-solid library standards used worldwide for algorithmic drawing of 1D and 2D codes. By implementing modern web architecture, we provide a smooth desktop-class experience right inside the browser.</p>

                        <h3>Free for All</h3>
                        <p>Whether you're a student building a library app or a warehouse manager organizing tens of thousands of SKUs, BarcodesMaker.com remains completely free for both personal and commercial use.</p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
