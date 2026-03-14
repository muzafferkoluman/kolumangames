import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedGames from './components/FeaturedGames';

function App() {
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <FeaturedGames />
      </main>
      <footer className="glass" style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0' }}>
        <p style={{ color: 'var(--text-muted)' }}>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}

export default App;
