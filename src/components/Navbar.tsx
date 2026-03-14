import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0',
      transition: 'var(--transition)',
      background: isScrolled ? 'rgba(10, 10, 14, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'var(--glass-blur)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logo} alt="Koluman Games Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Koluman Games</span>
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'none' }} className="desktop-menu">
          {/* Will use CSS to show on desktop */}
        </div>

        <style>
          {`
            @media (min-width: 768px) {
              .desktop-menu-items { display: flex !important; align-items: center; gap: 2rem; }
              .mobile-toggle { display: none !important; }
            }
          `}
        </style>

        <div className="desktop-menu-items" style={{ display: 'none' }}>
          <a href="#action" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">{t('nav.action')}</a>
          <a href="#strategy" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">{t('nav.strategy')}</a>
          <a href="#puzzle" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">{t('nav.puzzle')}</a>
          
          <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '50px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder={t('nav.search')} 
              style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.5rem', outline: 'none', width: '150px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Globe size={18} color="var(--text-muted)" />
            <select 
              onChange={(e) => changeLanguage(e.target.value)} 
              value={i18n.language}
              className="glass"
              style={{ padding: '0.25rem 0.5rem', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', appearance: 'none' }}
            >
              <option value="tr">TR</option>
              <option value="en">EN</option>
              <option value="de">DE</option>
              <option value="sv">SV</option>
            </select>
          </div>
        </div>

        <button className="btn-icon mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="glass animate-fade-in" style={{ padding: '1rem', margin: '1rem', position: 'absolute', top: '100%', left: 0, right: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#action">{t('nav.action')}</a>
            <a href="#strategy">{t('nav.strategy')}</a>
            <a href="#puzzle">{t('nav.puzzle')}</a>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <Globe size={18} color="var(--text-muted)" />
              <select 
                onChange={(e) => {
                  changeLanguage(e.target.value);
                  setMobileMenuOpen(false);
                }} 
                value={i18n.language}
                style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', flex: 1 }}
              >
                <option value="tr" style={{ color: '#000' }}>Türkçe</option>
                <option value="en" style={{ color: '#000' }}>English</option>
                <option value="de" style={{ color: '#000' }}>Deutsch</option>
                <option value="sv" style={{ color: '#000' }}>Svenska</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
