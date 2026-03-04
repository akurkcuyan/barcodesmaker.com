import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratorModule from './components/Generator/GeneratorModule';
import ScannerModule from './components/Scanner/ScannerModule';
import SEOSection from './components/SEOContent';
import AdPlacement from './components/AdPlacement';
import { Barcode, ScanLine, ArrowDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeMode, setActiveMode] = useState('generator');

  return (
    <div className="min-h-screen bg-navy-900 text-white selection:bg-cyber-blue/30 overflow-x-hidden">
      <Header />

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
              className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 py-2 px-5 rounded-full shadow-xl"
            >
              <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-widest text-navy-400">Professional Grade Tools</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1]"
            >
              Generate & Scan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-blue via-cyber-blue to-white text-glow">Barcodes Instantly.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-navy-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              "Professional Barcode & QR Tools for Everyone." High-resolution exports, real-time scanning, and full privacy compliance.
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
                <span>Start Creating</span>
              </button>
              <button
                onClick={() => {
                  setActiveMode('scanner');
                  document.getElementById('tool-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary px-10 py-5 text-lg group w-full sm:w-auto"
              >
                <ScanLine size={24} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                <span>Open Scanner</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="pt-10 flex flex-col items-center gap-4 text-navy-500 font-bold uppercase text-[10px] tracking-widest"
            >
              Scroll Down to Explore
              <ArrowDown size={14} className="animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ad Placement: Top Responsive */}
      <div className="container mx-auto px-6">
        <AdPlacement type="horizontal" />
      </div>

      {/* Main Tool Area */}
      <section id="tool-section" className="relative pb-32 mesh-bg overflow-hidden">
        <div className="scanline"></div>
        {/* Layout with Sidebar on Desktop */}
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start justify-center relative z-10">

          {/* Tool Content Area */}
          <div className="flex-1 w-full max-w-5xl">
            {/* Mode Switcher */}
            <div className="flex items-center gap-4 mb-12 p-1.5 bg-navy-800/40 rounded-[28px] border border-navy-700/50 w-fit mx-auto lg:mx-0 shadow-2xl backdrop-blur-md">
              <button
                onClick={() => setActiveMode('generator')}
                className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeMode === 'generator' ? 'bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg' : 'text-navy-500 hover:text-white'}`}
              >
                Generator
              </button>
              <button
                onClick={() => setActiveMode('scanner')}
                className={`px-8 py-3 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all duration-500 ${activeMode === 'scanner' ? 'bg-gradient-to-r from-deep-blue to-cyber-blue text-white shadow-lg' : 'text-navy-500 hover:text-white'}`}
              >
                Scanner
              </button>
            </div>

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

            {/* Ad Placement: Below Tools */}
            <AdPlacement type="horizontal" className="my-12 opacity-80" />
          </div>

          {/* Sticky Sidebar Ad */}
          <div className="hidden lg:block">
            <AdPlacement type="sidebar" />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-navy-950/40 border-y border-navy-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Ultra High Res', desc: 'Download labels in pixel-perfect formats for professional printing.', icon: 'HD' },
              { title: 'Global Standards', desc: 'Supporting EAN, Code 128, and many more industrial standards.', icon: 'GS' },
              { title: 'Zero Storage', desc: 'No data is ever stored on our servers. Your privacy is paramount.', icon: 'PR' }
            ].map((f, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-14 h-14 bg-navy-800 rounded-2xl flex items-center justify-center font-black text-cyber-blue border border-navy-700 shadow-xl group-hover:border-cyber-blue/30 transition-all shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{f.title}</h4>
                  <p className="text-navy-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SEOSection />

      <Footer />
    </div>
  );
}

export default App;
