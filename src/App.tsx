
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedGames from './components/FeaturedGames';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <FeaturedGames />
      </main>
      <footer className="glass" style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0' }}>
        <p style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Koluman Games. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
