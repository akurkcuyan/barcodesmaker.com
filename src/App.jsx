import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Barcode, ScanLine, ArrowDown } from 'lucide-react';
import Header from './components/Header';
import GeneratorModule from './components/Generator/GeneratorModule';
import ScannerModule from './components/Scanner/ScannerModule';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';
import LegalModal from './components/LegalModal';
import AdPlacement from './components/AdPlacement';
import ErrorBoundary from './components/ErrorBoundary';
import CookieBanner from './components/CookieBanner';
import SplashScreen from './components/SplashScreen';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState('generator');
  const [theme, setTheme] = useState('dark'); // Default to dark as requested earlier
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('privacy');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    // Hide splash screen
    const splashTimer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(splashTimer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleNav = (mode) => {
    setActiveMode(mode);
    setTimeout(() => {
      const element = document.getElementById('tool-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openLegal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <div className={`min-h-screen bg-slate-50 text-navy-900 dark:bg-navy-900 dark:text-white selection:bg-cyber-blue/30 overflow-x-hidden transition-colors duration-300 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Header theme={theme} toggleTheme={toggleTheme} onNav={handleNav} />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-deep-blue/20 via-transparent to-transparent -z-10 blur-[120px] opacity-40"></div>
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyber-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>
          <div className="absolute -top-10 left-0 w-[400px] h-[400px] bg-deep-blue/10 blur-[150px] -z-10 rounded-full opacity-30"></div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-5xl mx-auto text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-slate-200 dark:bg-navy-800 border border-navy-200 dark:border-navy-700 py-2 px-5 rounded-full shadow-lg"
              >
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-navy-600 dark:text-navy-400">{t('hero.badge')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]"
              >
                {t('hero.title_main')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue via-cyber-blue to-white text-glow">{t('hero.title_gradient')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-navy-600 dark:text-navy-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <button
                  onClick={() => {
                    setActiveMode('generator');
                    document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary px-10 py-5 text-lg group w-full sm:w-auto"
                >
                  <Barcode className="group-hover:rotate-12 transition-transform" />
                  <span>{t('hero.start_btn')}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMode('scanner');
                    document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary px-10 py-5 text-lg group w-full sm:w-auto"
                >
                  <ScanLine size={24} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                  <span>{t('hero.open_scanner')}</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="pt-10 flex flex-col items-center gap-4 text-navy-500 font-bold uppercase text-[10px] tracking-widest"
              >
                {t('hero.scroll_down')}
                <ArrowDown size={14} className="animate-bounce" />
              </motion.div>
            </div>
          </div>
        </section>


        {/* Main Tool Area */}
        <section id="tool-section" className="relative pb-32 mesh-bg overflow-hidden">
          <div className="scanline"></div>
          {/* Layout with Sidebar on Desktop */}
          <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start justify-center relative z-10">

            {/* Tool Content Area */}
            <div className="flex-1 w-full max-w-5xl">
              {/* Mode Switcher */}
              <div className="flex justify-center mt-8 mb-12">
                <div className="flex items-center gap-4 p-1.5 bg-slate-200/50 dark:bg-navy-800/40 rounded-[28px] border border-navy-200 dark:border-navy-700/50 shadow-xl backdrop-blur-md transition-colors">
                  <button
                    onClick={() => setActiveMode('generator')}
                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeMode === 'generator' ? 'bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg' : 'text-navy-500 hover:text-navy-900 dark:hover:text-white'}`}
                  >
                    {t('modes.generator')}
                  </button>
                  <button
                    onClick={() => setActiveMode('scanner')}
                    className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeMode === 'scanner' ? 'bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg' : 'text-navy-500 hover:text-navy-900 dark:hover:text-white'}`}
                  >
                    {t('modes.scanner')}
                  </button>
                </div>
              </div>

              <ErrorBoundary>
                <AnimatePresence mode="wait">
                  {activeMode === 'generator' ? (
                    <motion.div
                      key="gen-view"
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      <GeneratorModule />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="scan-view"
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5 }}
                    >
                      <ScannerModule />
                    </motion.div>
                  )}
                </AnimatePresence>
              </ErrorBoundary>

            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-20 bg-slate-100 dark:bg-navy-950/40 border-y border-navy-200 dark:border-navy-800 transition-colors">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { key: 'hd', icon: 'HD' },
                { key: 'gs', icon: 'GS' },
                { key: 'pr', icon: 'PR' }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-navy-800 rounded-2xl flex items-center justify-center font-black text-cyber-blue border border-navy-200 dark:border-navy-700 shadow-lg group-hover:border-cyber-blue/30 transition-all shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-navy-900 dark:text-white font-bold mb-2 uppercase text-xs tracking-widest">{t(`features.${f.key}.title`)}</h4>
                    <p className="text-navy-600 dark:text-navy-500 text-sm leading-relaxed">{t(`features.${f.key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SEOContent />
        <Footer onNav={handleNav} onOpenLegal={openLegal} />

        <LegalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        >
          <div className="space-y-6">
            {modalType === 'privacy' ? (
              <>
                <p>At BarcodesMaker.com, we prioritize your privacy. Our core tools use <strong>Client-Side Processing</strong>, meaning barcodes are generated entirely within your browser.</p>

                <h3>Advertising & Cookies</h3>
                <p>We use Google AdSense to serve ads. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>

                <h3>Personalized Ads</h3>
                <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyber-blue">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-cyber-blue">www.aboutads.info</a>.</p>

                <h3>Data Sovereignty</h3>
                <p>We do not store your sensitive business data. Your inputs for barcodes and QR codes never leave your computer unless you explicitly choose to download or share them.</p>
              </>
            ) : (
              <>
                <p>By using BarcodesMaker.com, you agree to these Terms of Service. Our tools are provided "as-is" for professional and personal use.</p>
                <h3>Usage Rights</h3>
                <p>The barcodes and QR codes generated are free for commercial and personal use. No attribution is required, though appreciated.</p>
                <h3>Limitations</h3>
                <p>While we strive for 100% accuracy using industrial-grade libraries like bwip-js, you are responsible for verifying the readability of your printed labels before full-scale production.</p>
              </>
            )}
          </div>
        </LegalModal>
      </div>
      <CookieBanner />
    </>
  );
}

export default App;
