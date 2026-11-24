import React from 'react';

export default function Astre({ size = 200, className = '' }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Orbites */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--line)" strokeWidth="1" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" strokeWidth="1" />
      
      {/* Astre central */}
      <circle cx="100" cy="100" r="38" fill="var(--accent)" />
      <circle cx="100" cy="100" r="9" fill="var(--bg)" />
      
      {/* Planètes sur orbites */}
      <g className="orb o1" style={{ animation: 'rotate 60s linear infinite' }}>
        <circle cx="192" cy="100" r="9" fill="var(--accent-2)" />
      </g>
      <g className="orb o2" style={{ animation: 'rotate 45s linear infinite reverse' }}>
        <circle cx="34" cy="100" r="7" fill="var(--accent-3)" />
        <circle cx="100" cy="34" r="4" fill="var(--text)" />
      </g>
      
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .orb {
          transform-origin: 100px 100px;
        }
        @media (prefers-reduced-motion: reduce) {
          .orb {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}
