import React, { useState } from 'react';
import Modal from './LegalModal';
import { Barcode, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <footer className="bg-navy-950/50 pt-20 pb-10 border-t border-navy-800 backdrop-blur-3xl overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyber-blue/10 blur-[150px] -z-10 rounded-full"></div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative">
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-xl flex items-center justify-center p-2 shadow-lg">
                            <Barcode className="text-white w-full h-full" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white focus:outline-none">
                            Barcodes<span className="text-cyber-blue">Maker</span>
                        </span>
                    </div>
                    <p className="text-navy-400 leading-relaxed max-w-sm">
                        Professional Barcode & QR Tools for Everyone. Generating, scanning, and managing barcodes has never been easier. Secure, fast, and free forever.
                    </p>
                    <div className="flex items-center gap-4 text-navy-400">
                        {/* Simple Icon placeholders for social */}
                        <div className="w-10 h-10 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center hover:border-cyber-blue hover:text-white transition-all cursor-pointer">
                            <span className="text-[10px] font-bold">TW</span>
                        </div>
                        <div className="w-10 h-10 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center hover:border-cyber-blue hover:text-white transition-all cursor-pointer">
                            <span className="text-[10px] font-bold">FB</span>
                        </div>
                        <div className="w-10 h-10 bg-navy-900 border border-navy-800 rounded-full flex items-center justify-center hover:border-cyber-blue hover:text-white transition-all cursor-pointer">
                            <span className="text-[10px] font-bold">LN</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-navy-400 font-medium">
                        <li><a href="#generator" className="hover:text-cyber-blue transition-colors">Generator</a></li>
                        <li><a href="#scanner" className="hover:text-cyber-blue transition-colors">Scanner</a></li>
                        <li><a href="#about" className="hover:text-cyber-blue transition-colors">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">Support & Legal</h4>
                    <ul className="space-y-4 text-navy-400 font-medium cursor-pointer">
                        <li onClick={() => setActiveModal('privacy')} className="hover:text-cyber-blue transition-colors">Privacy Policy</li>
                        <li onClick={() => setActiveModal('terms')} className="hover:text-cyber-blue transition-colors">Terms of Use</li>
                        <li onClick={() => setActiveModal('contact')} className="hover:text-cyber-blue transition-colors">Contact</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-10 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-navy-500 text-sm font-medium">© {new Date().getFullYear()} BarcodesMaker.com. All rights reserved.</p>
                <div className="flex items-center gap-2 text-navy-600 text-[10px] uppercase font-bold tracking-widest">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/40"></div>
                    System Online & Encrypted
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'privacy'} onClose={closeModal} title="Privacy Policy">
                <div className="space-y-4">
                    <h3 className="text-cyber-blue font-bold">How We Use Your Data</h3>
                    <p>BarcodesMaker.com is committed to protecting your privacy. We do not store any barcode or QR data generated on our servers. All generation happens locally in your browser.</p>
                    <p>We use standard web analytics to improve our service and Google AdSense for monetization. For more details, please review the full policy below.</p>
                    <h3 className="text-cyber-blue font-bold">Cookies</h3>
                    <p>We use cookies to save your preferences and for advertising services. By using our site, you consent to our use of cookies.</p>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'terms'} onClose={closeModal} title="Terms of Use">
                <div className="space-y-4">
                    <p>By using BarcodesMaker.com, you agree to comply with our terms. Our service is provided "as is" without any warranties of any kind.</p>
                    <p>You may use generated codes for personal or commercial projects. However, reverse engineering our tools or using them for illegal automated activities is strictly prohibited.</p>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'contact'} onClose={closeModal} title="Contact Us">
                <div className="space-y-6">
                    <p className="text-navy-100">Have questions or feedback? Our team is here to help you with your professional barcode needs.</p>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-navy-800 rounded-2xl flex items-center gap-4 transition-transform hover:scale-105 cursor-pointer">
                            <div className="w-10 h-10 bg-deep-blue/20 text-deep-blue rounded-xl flex items-center justify-center">
                                <Mail size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-navy-500 font-bold uppercase">Email Address</div>
                                <div className="text-sm font-semibold text-white">support@barcodesmaker.com</div>
                            </div>
                        </div>
                        <div className="p-4 bg-navy-800 rounded-2xl flex items-center gap-4 transition-transform hover:scale-105 cursor-pointer">
                            <div className="w-10 h-10 bg-cyber-blue/20 text-cyber-blue rounded-xl flex items-center justify-center">
                                <Phone size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-navy-500 font-bold uppercase">Phone Support</div>
                                <div className="text-sm font-semibold text-white">+1 (800) BARCODE-QR</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </footer>
    );
}
