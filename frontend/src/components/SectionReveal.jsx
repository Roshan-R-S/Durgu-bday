import { motion, useReducedMotion } from "motion/react";

const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  softSlide: {
    hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}) {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = revealVariants[variant] ?? revealVariants.fadeUp;

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 0 } : selectedVariant.hidden}
      whileInView={shouldReduceMotion ? { opacity: 1 } : selectedVariant.show}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
