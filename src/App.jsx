import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOContent from './components/SEOContent';
import CookieBanner from './components/CookieBanner';
import NotFound from './components/NotFound';

// Pages
import Home from './pages/Home';
import ScannerPage from './pages/ScannerPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Guides from './pages/Guides';

function App() {
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const handleNav = (mode) => {
    if (mode === 'generator') navigate('/');
    else if (mode === 'scanner') navigate('/scanner');
    else if (mode === 'about') navigate('/about');
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-navy-900 dark:bg-navy-900 dark:text-white selection:bg-cyber-blue/30 overflow-x-hidden transition-colors duration-300 opacity-100`}>
      <Header theme={theme} toggleTheme={toggleTheme} onNav={handleNav} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <SEOContent />
      <Footer onNav={handleNav} />
      <CookieBanner />
    </div>
  );
}

export default App;
