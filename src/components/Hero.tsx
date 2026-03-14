import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="container" style={{ 
      paddingTop: '6rem', 
      paddingBottom: '2rem',
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
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t('hero.badge')}</span>
      </div>

      <h1 className="animate-fade-in" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
        {t('hero.title_1')}<span className="text-gradient">{t('hero.title_epic')}</span><br />
        {t('hero.title_2')}
      </h1>

      <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
        {t('hero.subtitle')}
      </p>

      <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
        <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          <Play fill="currentColor" size={20} />
          {t('hero.playNow')}
        </button>
        <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          {t('hero.exploreCatalog')}
        </button>
      </div>

    </section>
  );
};

export default Hero;
