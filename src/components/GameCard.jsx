import React from 'react';
import { Link } from 'react-router-dom';

export default function GameCard({ 
  title, 
  description, 
  to, 
  icon: Icon,
  color = 'var(--accent-2)',
  disabled = false 
}) {
  return (
    <Link 
      to={to} 
      className={`block bg-[var(--surface)] rounded-3xl p-6 border border-[var(--line)] transition-all duration-300 hover:scale-[1.02] hover:border-[var(--accent)] ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: color }}>
          {Icon && <Icon className="w-8 h-8 text-[var(--on-accent)]" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-medium text-[var(--text)] truncate">{title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{description}</p>
        </div>
        <span className="text-2xl text-[var(--accent)]" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
