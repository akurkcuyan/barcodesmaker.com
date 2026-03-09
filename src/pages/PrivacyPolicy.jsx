import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <React.Fragment>
            <Helmet>
                <title>Privacy Policy | BarcodesMaker.com</title>
                <meta name="description" content="Read our privacy policy. BarcodesMaker.com prioritizes your data privacy by rendering all barcodes securely in your browser without tracking or uploading sensitive data." />
                <link rel="canonical" href="https://barcodesmaker.com/privacy-policy" />
            </Helmet>

            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-blue/20 via-transparent to-transparent -z-10 blur-[120px] opacity-40"></div>

                <div className="container mx-auto px-6 relative max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-2xl flex items-center justify-center p-4 shadow-xl">
                            <ShieldCheck className="text-white w-full h-full" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-900 dark:text-white">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue to-cyber-blue">Policy</span>
                        </h1>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-navy-900 dark:prose-headings:text-white prose-a:text-cyber-blue hover:prose-a:text-deep-blue transition-colors bg-white/50 dark:bg-navy-800/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-navy-200 dark:border-navy-700">
                        <p>At BarcodesMaker.com, we prioritize your privacy. Our core tools use <strong>Client-Side Processing</strong>, meaning barcodes are generated entirely within your browser.</p>

                        <h3>Advertising & Cookies</h3>
                        <p>We use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>

                        <h3>Personalized Ads</h3>
                        <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</p>

                        <h3>Data Sovereignty</h3>
                        <p>We do not store your sensitive business data. Your inputs for barcodes and QR codes never leave your computer unless you explicitly choose to download or share them. The rendering engine works completely within your local DOM.</p>

                        <h3>Changes to This Policy</h3>
                        <p>We reserve the right to update this policy as our tools evolve. Since we do not collect your email addresses, we cannot notify users directly of changes; therefore, we encourage you to review this page periodically.</p>

                        <p className="mt-8 text-sm text-navy-500 font-medium">Last Updated: October 2023</p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
