import React, { useState, useEffect } from 'react';
import { Gamepad2, Search, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 800 }}>
          <div className="btn-icon" style={{ background: 'var(--primary-gradient)', padding: '0.5rem' }}>
            <Gamepad2 size={28} color="#fff" />
          </div>
          <span className="text-gradient">Klmn Games</span>
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
          <a href="#action" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">Action</a>
          <a href="#strategy" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">Strategy</a>
          <a href="#puzzle" style={{ fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">Puzzle</a>
          
          <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '50px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search games..." 
              style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.5rem', outline: 'none', width: '150px' }}
            />
          </div>
          
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Login</button>
        </div>

        <button className="btn-icon mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="glass animate-fade-in" style={{ padding: '1rem', margin: '1rem', position: 'absolute', top: '100%', left: 0, right: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#action">Action</a>
            <a href="#strategy">Strategy</a>
            <a href="#puzzle">Puzzle</a>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
