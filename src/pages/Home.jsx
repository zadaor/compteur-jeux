import React from 'react';
import Astre from '../components/Astre';
import GameCard from '../components/GameCard';
import QRCodeDisplay from '../components/QRCodeDisplay';

export default function Home() {
  const currentUrl = window.location.href;
  
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Navigation flottante */}
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-block bg-[var(--surface)] rounded-full px-4 py-2 text-sm text-[var(--accent)] border border-[var(--line)]">
              Soirée jeux de dés
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium mb-12 leading-tight">
            À quel jeu<br />
            on joue ?
          </h1>
          
          {/* Astre orbital */}
          <div className="relative w-64 h-64 mx-auto mb-16">
            <Astre size={250} />
          </div>
          
          {/* QR Code */}
          <div className="mb-16">
            <QRCodeDisplay url={currentUrl} size={180} />
          </div>
        </div>
      </section>
      
      {/* Games Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-medium mb-8 text-center">
            Choisissez votre jeu
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Yam's Card */}
            <GameCard
              title="Yam's"
              description="Feuilles de score pour tous les joueurs"
              to="/yams"
              color="var(--accent-2)"
            />
            
            {/* 5000 Card */}
            <GameCard
              title="5000"
              description="Le premier à 5000 points gagne"
              to="/5000"
              color="var(--accent-3)"
              disabled={true}
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-[var(--text-muted)] text-sm">
          Deux jeux, un seul endroit.
        </p>
      </footer>
    </main>
  );
}
