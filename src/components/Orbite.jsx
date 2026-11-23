import React from 'react';

export default function Orbite({ size = 200, planetSize = 8, planetColor = 'var(--accent-2)' }) {
  return (
    <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Orbite */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="none"
          stroke="var(--line)"
          strokeWidth="1"
          style={{ animation: 'rotate 60s linear infinite' }}
        />
        {/* Planète */}
        <circle
          cx={size / 2}
          cy={10}
          r={planetSize / 2}
          fill={planetColor}
          style={{ animation: 'rotate 90s linear infinite' }}
        />
      </svg>
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(0deg); } }
        }
      `}</style>
    </div>
  );
}
