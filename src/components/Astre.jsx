import React from 'react';

export default function Astre() {
  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {/* Orbite 1 (la plus proche) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          style={{ animation: 'rotate 60s linear infinite' }}
        />
        {/* Planète 1 */}
        <circle
          cx="100"
          cy="10"
          r="6"
          fill="var(--accent-2)"
          style={{ animation: 'rotate 90s linear infinite' }}
        />
      </svg>

      {/* Orbite 2 (moyenne) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="280"
        height="280"
        viewBox="0 0 280 280"
      >
        <circle
          cx="140"
          cy="140"
          r="130"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          style={{ animation: 'rotate 70s linear infinite' }}
        />
        {/* Planète 2 */}
        <circle
          cx="270"
          cy="140"
          r="4"
          fill="var(--accent-3)"
          style={{ animation: 'rotate 80s linear infinite' }}
        />
      </svg>

      {/* Astre Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="60" fill="var(--accent)" />
          <circle cx="60" cy="60" r="20" fill="var(--bg)" />
        </svg>
      </div>

      {/* Planète 3 (sur orbite invisible) */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="350"
        height="350"
        viewBox="0 0 350 350"
      >
        <circle
          cx="10"
          cy="175"
          r="8"
          fill="var(--accent-2)"
          style={{ animation: 'rotate 100s linear infinite' }}
        />
      </svg>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .astre {
          animation: pulse 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(0deg); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1); } }
        }
      `}</style>
    </div>
  );
}
