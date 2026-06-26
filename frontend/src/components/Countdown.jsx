import { useState, useEffect } from "react";
import { motion } from "motion/react";
import SectionReveal from "./SectionReveal";

const TARGET_DATE = new Date("2026-06-28T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="flex min-w-0 flex-col items-center gap-2"
    >
      <div
        className="aspect-square w-full max-w-16 sm:max-w-24 rounded-lg sm:rounded-xl flex items-center justify-center border border-gold/20 bg-bg-card shadow-lg"
        style={{
          boxShadow: "0 4px 24px rgba(212,165,116,0.06)",
        }}
      >
        <span
          className="text-gold font-heading text-2xl sm:text-4xl font-bold"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-muted text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest font-light">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionReveal variant="fadeUp" className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        {timeLeft ? (
          <>
            <h2 className="font-heading italic text-2xl sm:text-3xl text-cream mb-12 md:mb-14">
              Counting down to your day
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-8 max-w-xs sm:max-w-none mx-auto">
              <CountdownCard
                value={timeLeft.days}
                label="Days"
                delay={0}
              />
              <CountdownCard
                value={timeLeft.hours}
                label="Hours"
                delay={0.1}
              />
              <CountdownCard
                value={timeLeft.minutes}
                label="Min"
                delay={0.2}
              />
              <CountdownCard
                value={timeLeft.seconds}
                label="Sec"
                delay={0.3}
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-2xl sm:text-3xl mb-4 text-gold font-script">
              Birthday time!
            </p>
            <h2 className="font-heading italic text-3xl sm:text-4xl text-gold">
              It's Your Day!
            </h2>
            <p className="text-muted mt-3 text-lg">
              Happy Birthday, Durga!
            </p>
          </motion.div>
        )}
      </div>
    </SectionReveal>
  );
}
