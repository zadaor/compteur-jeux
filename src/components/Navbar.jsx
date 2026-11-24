import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/yams', label: 'Yam\'s' },
    { path: '/5000', label: '5000' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[var(--surface)] rounded-full px-4 py-2 shadow-lg border border-[var(--line)]">
        <ul className="flex gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[var(--accent-2)] text-[var(--on-accent)]'
                    : 'text-[var(--text)] hover:bg-[var(--line)]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
