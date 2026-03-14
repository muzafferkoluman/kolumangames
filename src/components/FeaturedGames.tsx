import React from 'react';
import { Star, Users, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import spaceWarImg from '../assets/space-war.png';
import onlineFootballImg from '../assets/online-football.png';

const games = [
  {
    id: 1,
    titleKey: "games.space_war",
    categoryKey: "games.categories.action",
    image: spaceWarImg,
    rating: 4.9,
    players: "142K"
  },
  {
    id: 2,
    titleKey: "games.online_football",
    categoryKey: "games.categories.sports",
    image: onlineFootballImg,
    rating: 4.8,
    players: "285K"
  },
  {
    id: 3,
    titleKey: "games.neon_runner",
    categoryKey: "games.categories.action",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    players: "125K"
  }
];

const FeaturedGames: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="container" style={{ padding: '1.5rem 2rem 4rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Flame color="var(--secondary)" fill="var(--secondary)" /> 
            {t('featured.title')}<span className="text-gradient">{t('featured.title_highlight')}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{t('featured.subtitle')}</p>
        </div>
        <button className="btn btn-secondary">{t('featured.viewAll')}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {games.map((game) => (
          <div key={game.id} className="glass glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={game.image} 
                alt={t(game.titleKey)} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="game-img"
              />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                {t(game.categoryKey)}
              </div>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{t(game.titleKey)}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <span style={{ color: '#fff', fontWeight: 600 }}>{game.rating}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={16} />
                  <span>{game.players} {t('featured.active')}</span>
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>{t('featured.playNow')}</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .glass-card:hover .game-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default FeaturedGames;
