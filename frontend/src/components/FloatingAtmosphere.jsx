import { motion, useReducedMotion } from "motion/react";

const particles = [
  { left: "8%", top: "18%", size: 6, color: "rgba(212,165,116,0.25)", delay: 0, duration: 12 },
  { left: "18%", top: "72%", size: 4, color: "rgba(201,130,122,0.22)", delay: 1.5, duration: 15 },
  { left: "32%", top: "36%", size: 5, color: "rgba(245,239,230,0.14)", delay: 0.8, duration: 14 },
  { left: "48%", top: "82%", size: 7, color: "rgba(212,165,116,0.18)", delay: 2.1, duration: 18 },
  { left: "62%", top: "22%", size: 4, color: "rgba(201,130,122,0.2)", delay: 0.4, duration: 13 },
  { left: "76%", top: "64%", size: 6, color: "rgba(232,197,160,0.18)", delay: 1.1, duration: 16 },
  { left: "90%", top: "30%", size: 5, color: "rgba(212,165,116,0.2)", delay: 2.6, duration: 17 },
  { left: "84%", top: "88%", size: 3, color: "rgba(245,239,230,0.16)", delay: 3.2, duration: 14 },
];

export default function FloatingAtmosphere() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 5}px ${particle.color}`,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.25 }
              : {
                  opacity: [0.16, 0.42, 0.18],
                  scale: [1, 1.35, 1],
                  x: [0, index % 2 === 0 ? 18 : -14, 0],
                  y: [0, index % 3 === 0 ? -36 : -22, 0],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
            repeat: shouldReduceMotion ? 0 : Infinity,
          }}
        />
      ))}
    </div>
  );
}
