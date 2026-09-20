import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  const currentLangCode = i18n.language ? i18n.language.split('-')[0] : 'tr';
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0.85rem 0',
      transition: 'var(--transition)',
      background: isScrolled ? 'rgba(10, 10, 14, 0.88)' : 'transparent',
      backdropFilter: isScrolled ? 'var(--glass-blur)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logo} alt="Koluman Games Logo" style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
          <span className="text-gradient" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Koluman Games</span>
        </a>

        {/* Desktop Menu */}
        <style>
          {`
            @media (min-width: 820px) {
              .desktop-nav { display: flex !important; align-items: center; gap: 1.5rem; }
              .mobile-toggle { display: none !important; }
            }
            .lang-option:hover {
              background: rgba(0, 242, 254, 0.12) !important;
              color: var(--primary) !important;
            }
            .nav-link {
              color: var(--text-muted);
              font-weight: 500;
              transition: var(--transition);
              padding: 0.35rem 0.5rem;
              border-radius: 8px;
            }
            .nav-link:hover {
              color: #fff;
            }
          `}
        </style>

        <div className="desktop-nav" style={{ display: 'none' }}>
          <a href="#games" className="nav-link">{t('nav.action')}</a>
          <a href="#games" className="nav-link">{t('nav.strategy')}</a>
          <a href="#games" className="nav-link">{t('nav.puzzle')}</a>

          {/* Search Bar */}
          <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.9rem', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Search size={16} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder={t('nav.search')} 
              style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.5rem', outline: 'none', width: '130px', fontSize: '0.875rem' }}
            />
          </div>

          {/* Premium Language Dropdown */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '50px',
                border: langDropdownOpen ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.12)',
                background: langDropdownOpen ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                boxShadow: langDropdownOpen ? '0 0 15px rgba(0, 242, 254, 0.25)' : 'none',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Dili Değiştir / Change Language"
            >
              <Globe size={16} color={langDropdownOpen ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{currentLang.flag}</span>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{currentLang.code}</span>
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: 'var(--text-muted)'
                }} 
              />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div 
                className="glass animate-fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: '170px',
                  padding: '0.4rem',
                  borderRadius: '16px',
                  background: 'rgba(15, 17, 26, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 242, 254, 0.15)',
                  zIndex: 1100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}
              >
                {languages.map((lng) => {
                  const isSelected = lng.code === currentLang.code;
                  return (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className="lang-option"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '10px',
                        border: 'none',
                        background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                        color: isSelected ? 'var(--primary)' : '#f8fafc',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        width: '100%'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontSize: '1.15rem' }}>{lng.flag}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: isSelected ? 700 : 500 }}>
                          {lng.name}
                        </span>
                      </div>
                      {isSelected && <Check size={16} color="var(--primary)" style={{ strokeWidth: 2.5 }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button className="btn-icon mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass animate-fade-in" style={{ padding: '1.25rem', margin: '0.75rem 1rem 0 1rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#games" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1rem', fontWeight: 600 }}>{t('nav.action')}</a>
            <a href="#games" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1rem', fontWeight: 600 }}>{t('nav.strategy')}</a>
            <a href="#games" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1rem', fontWeight: 600 }}>{t('nav.puzzle')}</a>

            {/* Mobile Language Selector Grid */}
            <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Globe size={14} />
                <span>Dil Seçimi / Language</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {languages.map((lng) => {
                  const isSelected = lng.code === currentLang.code;
                  return (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 0.5rem',
                        borderRadius: '12px',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSelected ? 'var(--primary)' : '#fff',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{lng.flag}</span>
                      <span>{lng.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
