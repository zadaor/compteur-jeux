import Orbite from '../components/Orbite';

export default function Jeu5000() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Décoration : orbite */}
        <div className="my-12">
          <Orbite size={250} planetColor="var(--accent-3)" />
        </div>
        
        <h1 className="text-4xl font-medium mb-8">
          Jeu 5000
        </h1>
        <p className="text-[var(--text-muted)]">
          Page en développement - Compteur de points pour le jeu de cartes 5000
        </p>
        
        {/* Décoration : autre orbite */}
        <div className="mt-20">
          <Orbite size={180} planetColor="var(--accent-2)" />
        </div>
      </div>
    </div>
  );
}
