import React from 'react';
import { Star, Users, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import spaceWarImg from '../assets/space-war.png';
import onlineFootballImg from '../assets/online-football.png';
import valendorImg from '../assets/valendor.png';
import cyberEscapeImg from '../assets/cyber-escape.jpg';

const games = [
  {
    id: 0,
    titleKey: "games.valendor",
    categoryKey: "games.categories.strategy",
    descriptionKey: "games.valendor_description",
    image: valendorImg,
    rating: "—",
    players: "Mobile RTS",
    url: "#",
    comingSoon: true,
    featured: true
  },
  {
    id: 1,
    titleKey: "games.space_war",
    categoryKey: "games.categories.action",
    image: spaceWarImg,
    rating: 4.9,
    players: "142K",
    url: "/uzay-savasi/",
    comingSoon: false
  },
  {
    id: 2,
    titleKey: "games.cyber_escape",
    categoryKey: "games.categories.action",
    descriptionKey: "games.cyber_escape_description",
    image: cyberEscapeImg,
    rating: 4.9,
    players: "98K",
    url: "/cyber-escape/",
    comingSoon: false
  },
  {
    id: 3,
    titleKey: "games.online_football",
    categoryKey: "games.categories.sports",
    image: onlineFootballImg,
    rating: 4.8,
    players: "285K",
    url: "/online-futbol/",
    comingSoon: true
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
          <div key={game.id} className="glass glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: game.comingSoon && !game.featured ? 0.75 : 1, border: game.featured ? '1px solid rgba(79, 172, 254, 0.5)' : undefined, boxShadow: game.featured ? '0 0 30px rgba(79, 172, 254, 0.12)' : undefined }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={game.image}
                alt={t(game.titleKey)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', filter: game.comingSoon && !game.featured ? 'grayscale(30%)' : 'none' }}
                className="game-img"
              />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                {t(game.categoryKey)}
              </div>
              {game.comingSoon && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, var(--secondary), #ff6b6b)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: '#fff', boxShadow: '0 2px 12px rgba(254,1,154,0.4)' }}>
                  {t('featured.comingSoon')}
                </div>
              )}
              {game.featured && (
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.65)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
                  {t('featured.newRelease')}
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{t(game.titleKey)}</h3>
              {game.descriptionKey && <p style={{ color: 'var(--text-muted)', minHeight: '3.2rem', marginBottom: '1rem' }}>{t(game.descriptionKey)}</p>}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <span style={{ color: '#fff', fontWeight: 600 }}>{game.rating}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={16} />
                  <span>{game.players} {game.featured ? '' : t('featured.active')}</span>
                </div>
              </div>

              {game.comingSoon ? (
                <button disabled className="btn" style={{ width: '100%', marginTop: '1.5rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.15)', cursor: 'not-allowed' }}>
                  {t('featured.comingSoon')}
                </button>
              ) : (
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', textDecoration: 'none' }}
                >
                  {t('featured.playNow')}
                </a>
              )}
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
