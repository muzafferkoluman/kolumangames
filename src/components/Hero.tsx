import React from 'react';
import { Play, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="container" style={{ 
      paddingTop: '8rem', 
      paddingBottom: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        background: 'rgba(0, 242, 254, 0.2)',
        filter: 'blur(100px)',
        zIndex: -1,
        borderRadius: '50%',
      }} className="animate-pulse-glow" />

      <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Sparkles size={16} color="var(--primary)" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>The Next Generation Gaming Portal</span>
      </div>

      <h1 className="animate-fade-in" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        Discover <span className="text-gradient">Epic</span><br />
        Worlds & Adventures
      </h1>

      <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
        Welcome to Koluman Games. Experience an exclusive collection of mind-bending puzzles, action-packed adventures, and strategic battles on one platform.
      </p>

      <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
        <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          <Play fill="currentColor" size={20} />
          Play Now
        </button>
        <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Explore Catalog
        </button>
      </div>

      <div className="animate-float" style={{ marginTop: '5rem', position: 'relative', width: '100%', maxWidth: '900px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid var(--border-color)' }}>
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
          alt="Gaming Dashboard" 
          style={{ width: '100%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-base), transparent)' }} />
      </div>
    </section>
  );
};

export default Hero;
