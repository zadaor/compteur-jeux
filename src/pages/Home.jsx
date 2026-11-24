import { Link, useEffect } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const thButton = document.getElementById('th');
    if (thButton) {
      thButton.addEventListener('click', function() {
        const h = document.documentElement;
        h.setAttribute('data-theme', h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }
  }, []);
  return (
    <main className="home-app">
      <div className="top">
        <span className="tag">Soirée jeux de dés</span>
        <button className="th" id="th" aria-label="Changer de thème">Thème</button>
      </div>
      
      <h1>À quel jeu<br>on joue ?</h1>
      
      <div className="hero" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="orb-svg">
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--line)" strokeWidth="1"/>
          <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" strokeWidth="1"/>
          <circle cx="100" cy="100" r="38" fill="var(--accent)"/>
          <circle cx="100" cy="100" r="9" fill="var(--bg)"/>
          <g className="orb o1">
            <circle cx="192" cy="100" r="9" fill="var(--accent-2)"/>
          </g>
          <g className="orb o2">
            <circle cx="34" cy="100" r="7" fill="var(--accent-3)"/>
            <circle cx="100" cy="34" r="4" fill="var(--text)"/>
          </g>
        </svg>
      </div>
      
      <nav className="cards" aria-label="Jeux">
        <div className="g">
          <Link className="card y" to="/yams">
            <svg className="die" viewBox="0 0 72 72" aria-hidden="true">
              <rect x="2" y="2" width="68" height="68" rx="20" fill="var(--accent-2)"/>
              <g fill="var(--on-accent)">
                <circle cx="21" cy="21" r="5"/>
                <circle cx="51" cy="21" r="5"/>
                <circle cx="36" cy="36" r="5"/>
                <circle cx="21" cy="51" r="5"/>
                <circle cx="51" cy="51" r="5"/>
              </g>
            </svg>
            <div className="txt">
              <h2>Yam's</h2>
              <p>Feuilles de score pour tous les joueurs</p>
            </div>
            <span className="go" aria-hidden="true">→</span>
          </Link>
          <Link className="hist" to="/yams">Historique des parties</Link>
        </div>
        
        <div className="g">
          <div className="card soon" role="group" aria-label="5000, bientôt disponible">
            <svg className="die" viewBox="0 0 72 72" aria-hidden="true">
              <rect x="2" y="2" width="68" height="68" rx="20" fill="var(--accent-3)"/>
              <g fill="var(--on-accent)">
                <circle cx="21" cy="21" r="5"/>
                <circle cx="36" cy="36" r="5"/>
                <circle cx="51" cy="51" r="5"/>
              </g>
            </svg>
            <div className="txt">
              <h2>5 000</h2>
              <p>Le premier à 5 000 points gagne</p>
            </div>
            <span className="go">Bientôt</span>
          </div>
          <span className="hist off">Historique des parties · bientôt</span>
        </div>
      </nav>
      
      <p className="foot">Deux jeux, un seul endroit.</p>
    </main>
  );
}
