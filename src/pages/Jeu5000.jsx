export default function Jeu5000() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="my-12">
          <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
            <circle cx="100" cy="100" r="92" fill="none" stroke="var(--line)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="38" fill="var(--accent)"/>
            <circle cx="100" cy="100" r="9" fill="var(--bg)"/>
            <g className="orb o1">
              <circle cx="192" cy="100" r="9" fill="var(--accent-3)"/>
            </g>
            <g className="orb o2">
              <circle cx="34" cy="100" r="7" fill="var(--accent-2)"/>
              <circle cx="100" cy="34" r="4" fill="var(--text)"/>
            </g>
          </svg>
        </div>
        
        <h1 className="text-4xl font-medium mb-8">
          Jeu 5000
        </h1>
        <p className="text-[var(--text-muted)]">
          Page en développement - Compteur de points pour le jeu de cartes 5000
        </p>
        
        <div className="mt-20">
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            <circle cx="100" cy="100" r="92" fill="none" stroke="var(--line)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" strokeWidth="1"/>
            <circle cx="100" cy="100" r="38" fill="var(--accent)"/>
            <circle cx="100" cy="100" r="9" fill="var(--bg)"/>
            <g className="orb o1">
              <circle cx="192" cy="100" r="9" fill="var(--accent-2)"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
