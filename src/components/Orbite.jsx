import React from 'react';

export default function Orbite({ 
  size = 150, 
  planetSize = 8, 
  planetColor = 'var(--accent-2)',
  className = '' 
}) {
  const center = size / 2;
  const orbitRadius = size / 2 - 20;
  
  return (
    <svg 
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Orbite */}
      <circle 
        cx={center} 
        cy={center} 
        r={orbitRadius} 
        fill="none" 
        stroke="var(--line)" 
        strokeWidth="1"
      />
      
      {/* Planète */}
      <g style={{ animation: 'rotate 40s linear infinite' }}>
        <circle 
          cx={center + orbitRadius} 
          cy={center} 
          r={planetSize}
          fill={planetColor}
        />
      </g>
      
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); transform-origin: ${center}px ${center}px; }
        }
        g {
          transform-origin: ${center}px ${center}px;
        }
        @media (prefers-reduced-motion: reduce) {
          g {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}
