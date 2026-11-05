function Loader({ text = "Đang tải", fullScreen = false }) {

  const petals = [
    { angle: -62, delay: 0.0, layer: "back" },
    { angle: 62, delay: 0.0, layer: "back" },
    { angle: -32, delay: 0.15, layer: "back" },
    { angle: 32, delay: 0.15, layer: "back" },
    { angle: -18, delay: 0.35, layer: "front" },
    { angle: 18, delay: 0.35, layer: "front" },
    { angle: 0, delay: 0.5, layer: "front" },
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? "fixed inset-0 z-[200] flex items-center justify-center bg-white/80 dark:bg-gray-900/85 backdrop-blur-sm"
          : "flex items-center justify-center py-10"
      }
    >
      <style>{`
        @keyframes ldPetalBloom {
          0%   { transform: scale(0.15); opacity: 0; }
          35%  { transform: scale(1);    opacity: 1; }
          80%  { transform: scale(1);    opacity: 1; }
          100% { transform: scale(1.06); opacity: 0; }
        }
        @keyframes ldHalo {
          0%, 100% { transform: scale(0.92); opacity: 0.35; }
          50%      { transform: scale(1.06); opacity: 0.95; }
        }
        @keyframes ldRipple {
          0%   { transform: scale(0.3); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes ldFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes ldDot {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.3; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ld-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-3">
        <svg
          viewBox="0 0 120 120"
          className="h-28 w-28 sm:h-32 sm:w-32 overflow-visible"
          style={{ animation: "ldFloat 3s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ldPetalFront" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
            <linearGradient id="ldPetalBack" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fce7f3" />
            </linearGradient>
            <radialGradient id="ldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g
            className="ld-anim"
            style={{
              transformOrigin: "60px 62px",
              animation: "ldHalo 2.4s ease-in-out infinite",
            }}
          >
            <circle cx="60" cy="62" r="46" fill="url(#ldGlow)" />
            <circle
              cx="60"
              cy="62"
              r="40"
              fill="none"
              stroke="#fb923c"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
          </g>

          {[0, 1.1].map((d) => (
            <ellipse
              key={d}
              className="ld-anim"
              cx="60"
              cy="96"
              rx="34"
              ry="7"
              fill="none"
              stroke="#fb923c"
              strokeWidth="1.2"
              style={{
                transformOrigin: "60px 96px",
                animation: `ldRipple 2.4s ease-out ${d}s infinite`,
              }}
            />
          ))}

          {["back", "front"].map((layer) =>
            petals
              .filter((p) => p.layer === layer)
              .map((p) => (
                <g key={`${layer}-${p.angle}`} transform={`rotate(${p.angle} 60 92)`}>
                  <path
                    className="ld-anim"
                    d="M60 92 C46 74 46 48 60 24 C74 48 74 74 60 92 Z"
                    fill={`url(#${layer === "front" ? "ldPetalFront" : "ldPetalBack"})`}
                    stroke="#ffffff"
                    strokeOpacity="0.55"
                    strokeWidth="0.8"
                    style={{
                      transformOrigin: "60px 92px",
                      animation: `ldPetalBloom 2.6s ease-out ${p.delay}s infinite both`,
                      filter: "drop-shadow(0 2px 4px rgba(236,72,153,0.35))",
                    }}
                  />
                </g>
              )),
          )}
        </svg>

        <div className="flex items-end gap-1 font-bold text-gray-500 dark:text-gray-400">
          <span>{text}</span>
          <span className="flex items-end gap-1 pb-1.5">
            {[0, 0.15, 0.3].map((d) => (
              <span
                key={d}
                className="ld-anim h-1.5 w-1.5 rounded-full bg-orange-400"
                style={{ animation: `ldDot 1.2s ease-in-out ${d}s infinite` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Loader;