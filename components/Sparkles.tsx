import React from 'react';

type Props = {
  className?: string;
  color?: string;
  size?: number;
};

// Small three-sparkle icon with staggered twinkle animation to match provided design
export default function Sparkles({ className = '', color = '#FCD34D', size = 14 }: Props) {
  // size controls the base scale; SVG uses a compact viewBox for crisp small icons
  return (
    <div className={`pointer-events-none inline-block ${className}`} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
        <g transform="translate(0,0)" fill={color}>
          <path className="spark-1" d="M6 2.5l1.2 2.4 2.6.5-2.0 1.7.5 2.6L6 8.0 3.7 9.7l.5-2.6L2.2 6.0l2.6-.5L6 2.5z" />
          <path className="spark-2" d="M12.8 1.8l0.9 1.8 1.9.4-1.4 1.2.4 1.9-1.9-1-1.9 1 .4-1.9-1.4-1.2 1.9-.4.9-1.8z" />
          <path className="spark-3" d="M18.5 3.6l0.7 1.6 1.5.3-1.1 0.9.3 1.5-1.6-0.8-1.6 0.8.3-1.5-1.1-0.9 1.5-.3 0.7-1.6z" />
        </g>
        <style>{`
          .spark-1 { transform-origin: 6px 6px; animation: twinkle 2200ms infinite ease-in-out; }
          .spark-2 { transform-origin: 13px 6px; animation: twinkle 1800ms infinite ease-in-out 220ms; }
          .spark-3 { transform-origin: 19px 7px; animation: twinkle 2000ms infinite ease-in-out 420ms; }
          @keyframes twinkle {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.18) translateY(-1px); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }
        `}</style>
      </svg>
    </div>
  );
}
