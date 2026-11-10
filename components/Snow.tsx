// Dezent fallender Schnee, rein mit CSS. Positionen sind deterministisch,
// damit Server- und Client-Rendering identisch sind.
export default function Snow({ count = 40 }: { count?: number }) {
  const flakes = Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return {
      left: `${(r(1) * 100).toFixed(2)}%`,
      size: `${(2 + r(2) * 5).toFixed(1)}px`,
      duration: `${(9 + r(3) * 14).toFixed(1)}s`,
      delay: `-${(r(4) * 20).toFixed(1)}s`,
      drift: `${(r(5) * 60 - 30).toFixed(0)}px`,
      opacity: (0.35 + r(6) * 0.6).toFixed(2),
    };
  });

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          style={
            {
              left: f.left,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDuration: f.duration,
              animationDelay: f.delay,
              "--drift": f.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
