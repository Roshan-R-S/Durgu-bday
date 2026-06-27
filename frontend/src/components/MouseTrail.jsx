import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EMOJIS = ["🌸", "💮", "🌺", "🌻", "💖", "💗", "💝", "✨"];

export default function MouseTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    
    const handleMove = (e) => {
      const now = Date.now();
      // Throttle particle creation
      if (now - lastTime < 50) return;
      lastTime = now;

      let clientX = e.clientX;
      let clientY = e.clientY;
      
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const newParticle = {
        id: Math.random().toString(36).substr(2, 9),
        x: clientX,
        y: clientY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        angle: Math.random() * 360,
        offsetX: Math.random() * 40 - 20,
      };

      setParticles((prev) => {
        const updated = [...prev, newParticle];
        // Limit the number of particles on screen to avoid lag
        if (updated.length > 20) {
          return updated.slice(updated.length - 20);
        }
        return updated;
      });

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x - 12, y: p.y - 12, rotate: p.angle }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: p.y + 40, 
              x: p.x + p.offsetX,
              rotate: p.angle + 90 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-xl md:text-2xl drop-shadow-sm"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
