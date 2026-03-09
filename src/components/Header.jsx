import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Barcode, Sun, Moon, Globe, ChevronDown, BookOpen } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

export default function Header({ theme, toggleTheme, onNav }) {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateNow = () => {
        setIsOpen(false);
        if (location.pathname === '/') {
            document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code)) || LANGUAGES[0];

    const changeLang = (code) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-b border-navy-200 dark:border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 group transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-deep-blue to-cyber-blue rounded-xl flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform">
                        <Barcode className="text-white w-full h-full" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white group-hover:text-cyber-blue transition-colors">
                        Barcodes<span className="text-cyber-blue group-hover:text-deep-blue">Maker</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-navy-600 dark:text-navy-100 hover:text-cyber-blue dark:hover:text-cyber-blue font-medium transition-colors"
                    >
                        {t('nav.generator')}
                    </Link>
                    <Link
                        to="/scanner"
                        className="text-navy-600 dark:text-navy-100 hover:text-cyber-blue dark:hover:text-cyber-blue font-medium transition-colors"
                    >
                        {t('nav.scanner')}
                    </Link>
                    <Link to="/about" className="text-navy-600 dark:text-navy-100 hover:text-cyber-blue dark:hover:text-cyber-blue font-medium transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/guides" className="text-navy-600 dark:text-navy-100 hover:text-cyber-blue dark:hover:text-cyber-blue font-medium transition-colors flex items-center gap-1.5">
                        <BookOpen size={16} /> {t('pages.guides')}
                    </Link>

                    {/* Controls */}
                    <div className="flex items-center gap-4 border-l border-navy-200 dark:border-navy-700 pl-6">
                        {/* Language Dropdown */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 text-navy-600 dark:text-navy-400 hover:text-cyber-blue transition-colors font-bold text-xs tracking-widest"
                                title="Change Language"
                            >
                                <Globe size={18} />
                                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {langOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-xl shadow-2xl overflow-hidden min-w-[140px] animate-fadeIn">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLang(lang.code)}
                                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-cyber-blue/10 hover:text-cyber-blue text-left ${currentLang.code === lang.code ? 'text-cyber-blue bg-cyber-blue/5' : 'text-navy-700 dark:text-navy-200'}`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={toggleTheme} className="text-navy-600 dark:text-navy-400 hover:text-cyber-blue transition-colors">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <button onClick={handleCreateNow} className="btn-primary py-2 px-5 text-sm inline-flex items-center justify-center cursor-pointer">{t('nav.create_now')}</button>
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-navy-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-navy-900 backdrop-blur-2xl border-b border-navy-200 dark:border-white/5 p-6 animate-fadeIn shadow-2xl">
                    <nav className="flex flex-col gap-6">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-bold text-navy-900 dark:text-white hover:text-cyber-blue text-left block"
                        >
                            {t('nav.generator')}
                        </Link>
                        <Link
                            to="/scanner"
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-bold text-navy-900 dark:text-white hover:text-cyber-blue text-left block"
                        >
                            {t('nav.scanner')}
                        </Link>
                        <Link to="/about" className="text-xl font-bold text-navy-900 dark:text-white hover:text-cyber-blue block" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/guides" className="text-xl font-bold text-navy-900 dark:text-white hover:text-cyber-blue block flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <BookOpen size={20} className="text-cyber-blue" /> {t('pages.guides')}
                        </Link>

                        <div className="h-px bg-navy-200 dark:bg-navy-800 my-2"></div>

                        <div className="flex flex-col gap-3">
                            <p className="text-xs font-bold uppercase tracking-widest text-navy-400">Language / Sprache / भाषा</p>
                            <div className="grid grid-cols-2 gap-2">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLang(lang.code)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${currentLang.code === lang.code ? 'border-cyber-blue text-cyber-blue bg-cyber-blue/10' : 'border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 hover:border-cyber-blue hover:text-cyber-blue'}`}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button onClick={toggleTheme} className="flex items-center gap-3 text-navy-600 dark:text-navy-400">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                <span className="font-bold uppercase text-xs tracking-widest">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                        </div>

                        <button onClick={handleCreateNow} className="btn-primary w-full py-4 text-center inline-block cursor-pointer">{t('nav.create_now')}</button>
                    </nav>
                </div>
            )}
        </header>
    );
}
