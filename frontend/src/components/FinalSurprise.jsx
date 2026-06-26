import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { PartyPopper } from "lucide-react";
import SectionReveal from "./SectionReveal";

const CONFETTI_COLORS = ["#d4a574", "#c9827a", "#f5efe6", "#e8c5a0", "#d4948c"];
const headlineWords = ["Happy", "Birthday,", "Durga"];
const surpriseMessageLines = [
  "You mean the world to me. Here's to more memories, more laughter,",
  "and more of everything beautiful - together.",
];

const textGroupVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function fireConfetti() {
  const defaults = {
    colors: CONFETTI_COLORS,
    gravity: 0.8,
    ticks: 250,
    disableForReducedMotion: true,
  };

  /* Center burst */
  confetti({
    ...defaults,
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.65 },
  });

  /* Left burst */
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 60,
      spread: 55,
      origin: { x: 0.3, y: 0.7 },
      angle: 60,
    });
  }, 150);

  /* Right burst */
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 60,
      spread: 55,
      origin: { x: 0.7, y: 0.7 },
      angle: 120,
    });
  }, 300);
}

export default function FinalSurprise() {
  const [fired, setFired] = useState(false);

  const handleSurprise = useCallback(() => {
    if (fired) return;
    setFired(true);
    fireConfetti();
  }, [fired]);

  return (
    <SectionReveal variant="softSlide" className="py-20 md:py-32 px-6">
      <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PartyPopper
            className="text-gold"
            size={32}
            strokeWidth={1.5}
          />
        </motion.div>

        <h2 className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-cream">
          One More Thing...
        </h2>

        <AnimatePresence mode="wait">
          {!fired ? (
            <motion.button
              key="surprise-button"
              onClick={handleSurprise}
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-10 py-4 rounded-full bg-gold text-bg-deep font-body text-base sm:text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-gold-light"
              style={{
                boxShadow: "0 4px 24px rgba(212,165,116,0.25)",
              }}
            >
              Tap for a Surprise!
            </motion.button>
          ) : (
            <motion.div
              key="surprise-message"
              variants={textGroupVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="mt-4 flex flex-col items-center gap-4"
            >
              <p className="font-script text-gold text-2xl sm:text-3xl md:text-4xl">
                {headlineWords.map((word) => (
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>

              <motion.div
                variants={textGroupVariants}
                className="max-w-sm text-cream-muted text-base sm:text-lg font-light leading-relaxed"
              >
                {surpriseMessageLines.map((line) => (
                  <motion.p
                    key={line}
                    variants={lineVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

              <motion.p
                variants={lineVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-muted text-sm mt-2"
              >
                Made with love just for you
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}
