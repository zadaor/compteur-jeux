export default function Orbite({ size = 200, planetColor = "var(--accent-2)", speed = 60 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Orbite */}
      <circle
        cx="200"
        cy="200"
        r={size / 2}
        fill="none"
        stroke="var(--line)"
        strokeWidth="1"
        style={{
          animation: `rotate ${speed}s linear infinite`,
          transformOrigin: 'center'
        }}
      />
      
      {/* Planète */}
      <circle
        cx="200"
        cy={100 - size / 2}
        r="8"
        fill={planetColor}
        style={{
          animation: `rotate ${speed}s linear infinite`,
          transformOrigin: 'center'
        }}
      />
    </svg>
  );
}
