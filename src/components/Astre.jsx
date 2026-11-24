import Orbite from './Orbite';

export default function Astre() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Astre central */}
      <div className="astre">
        <div className="absolute inset-0 rounded-full bg-[var(--accent)]" />
        <div className="absolute inset-4 rounded-full bg-[var(--bg)]" />
      </div>
      
      {/* Orbites */}
      <Orbite size={150} planetColor="var(--accent-2)" speed={40} />
      <Orbite size={200} planetColor="var(--accent-3)" speed={60} />
    </div>
  );
}
