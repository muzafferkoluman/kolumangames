import React from 'react';
import { Sparkles, Gamepad2, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="container" style={{ 
      paddingTop: '6.5rem', 
      paddingBottom: '2.5rem',
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
        width: '320px',
        height: '320px',
        background: 'rgba(0, 242, 254, 0.18)',
        filter: 'blur(110px)',
        zIndex: -1,
        borderRadius: '50%',
      }} className="animate-pulse-glow" />

      {/* Badge */}
      <div className="glass" style={{ padding: '0.5rem 1.25rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
        <Sparkles size={16} color="var(--primary)" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t('hero.badge')}</span>
      </div>

      {/* Title */}
      <h1 className="animate-fade-in" style={{ fontSize: 'clamp(2.75rem, 7vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        {t('hero.title_1')}<span className="text-gradient">{t('hero.title_epic')}</span><br />
        {t('hero.title_2')}
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-in" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '620px', marginBottom: '2.25rem', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards', lineHeight: 1.6 }}>
        {t('hero.subtitle')}
      </p>

      {/* Action Buttons */}
      <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
        <a 
          href="#games" 
          className="btn btn-primary"
          style={{ textDecoration: 'none', gap: '0.6rem', padding: '0.85rem 2rem' }}
        >
          <Gamepad2 size={20} />
          <span>{t('hero.playNow')}</span>
        </a>
        <a 
          href="#games" 
          className="btn btn-secondary"
          style={{ textDecoration: 'none', gap: '0.5rem', padding: '0.85rem 1.75rem' }}
        >
          <span>{t('hero.exploreCatalog')}</span>
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
