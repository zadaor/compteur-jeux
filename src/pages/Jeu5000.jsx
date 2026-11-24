import React from 'react';
import Astre from '../components/Astre';

export default function Jeu5000() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="flex justify-between items-center p-4 pt-16">
        <h1 className="text-2xl font-medium">5000</h1>
      </header>
      
      <section className="flex flex-col items-center justify-center h-[calc(100vh-100px)] px-4">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-8">
            <Astre size={200} />
          </div>
          
          <h2 className="text-3xl font-medium mb-4">Jeu 5000</h2>
          <p className="text-[var(--text-muted)] mb-8">
            Page en développement
          </p>
          
          <p className="text-sm text-[var(--text-muted)]">
            Compteur de points pour le jeu de cartes 5000
          </p>
        </div>
      </section>
    </main>
  );
}
