import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Sparkles, ChevronDown } from "lucide-react";

const HERO_IMAGE = "/media/photos/photo-03.jpg";

export default function Hero() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.82], [0.86, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const sparkleY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.12]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <motion.img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[56%_24%] sm:object-[56%_23%] md:object-[64%_26%] pointer-events-none"
        style={{
          scale: shouldReduceMotion ? 1.04 : backgroundScale,
          opacity: shouldReduceMotion ? 0.82 : backgroundOpacity,
        }}
      />

      <div className="absolute inset-0 bg-bg-deep/58 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,20,18,0.9) 0%, rgba(26,20,18,0.55) 46%, rgba(26,20,18,0.3) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(26,20,18,0.7) 78%, rgba(26,20,18,1) 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: shouldReduceMotion ? 0 : glowY,
          scale: shouldReduceMotion ? 1 : 1.06,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(212,165,116,0.08) 0%, rgba(201,130,122,0.04) 40%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute top-[18%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        style={{
          y: shouldReduceMotion ? 0 : sparkleY,
          opacity: shouldReduceMotion ? 0.18 : contentOpacity,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
        style={{
          y: shouldReduceMotion ? 0 : contentY,
          scale: shouldReduceMotion ? 1 : contentScale,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
        }}
      >
        {/* Sparkle icon */}
        <motion.div variants={fadeUp}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Sparkles
              className="text-gold-light mb-8 md:mb-10 drop-shadow-[0_0_20px_rgba(212,165,116,0.35)]"
              size={36}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-heading italic text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight drop-shadow-[0_8px_34px_rgba(0,0,0,0.55)]"
        >
          Happy Birthday
        </motion.h1>

        {/* Name */}
        <motion.p
          variants={fadeUp}
          className="font-heading text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mt-4 md:mt-6"
          style={{
            textShadow:
              "0 0 40px rgba(212,165,116,0.35), 0 12px 36px rgba(0,0,0,0.48)",
          }}
        >
          Durga
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-cream-muted text-base sm:text-lg mt-8 md:mt-10 max-w-md font-light tracking-wide drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
        >
          Here's something special, made just for you
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: shouldReduceMotion ? 1 : indicatorOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-muted" size={24} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
