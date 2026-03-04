import React, { useState, useEffect } from 'react';
import { Menu, X, Barcode, QrCode } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Generator', href: '#generator' },
        { name: 'Scanner', href: '#scanner' },
        { name: 'About', href: '#about' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 group transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform">
                        <Barcode className="text-white w-full h-full" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white group-hover:text-cyber-blue transition-colors">
                        Barcodes<span className="text-cyber-blue group-hover:text-deep-blue">Maker</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-navy-100 hover:text-cyber-blue font-medium transition-colors">
                            {link.name}
                        </a>
                    ))}
                    <a href="#generator" className="btn-primary py-2 px-5 text-sm">Create Now</a>
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-navy-800/95 backdrop-blur-2xl border-b border-white/5 p-6 animate-fadeIn">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xl font-semibold text-white hover:text-cyber-blue"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a href="#generator" className="btn-primary w-full" onClick={() => setIsOpen(false)}>Create Now</a>
                    </nav>
                </div>
            )}
        </header>
    );
}
