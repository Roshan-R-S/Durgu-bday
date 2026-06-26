import { motion } from "motion/react";
import SectionReveal from "./SectionReveal";

const videos = [
  { src: `/media/videos/video-01.mp4`, label: `Memory 1` },
  { src: `/media/videos/video-02.mp4`, label: `Memory 2` },
  { src: `/media/videos/video-03.mp4`, label: `Memory 3` },
  { src: `/media/videos/video-04.mp4`, label: `Memory 4` },
  { src: `/media/videos/WhatsApp Video 2026-06-25 at 12.05.30 AM (1).mp4`, label: `Memory 5` },
  { src: `/media/videos/WhatsApp Video 2026-06-25 at 12.05.30 AM.mp4`, label: `Memory 6` },
  { src: `/media/videos/WhatsApp Video 2026-06-25 at 12.05.37 AM.mp4`, label: `Memory 7` }
];

export default function VideoMemories() {
  return (
    <SectionReveal variant="scaleIn" className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-center text-cream mb-12 md:mb-16">
          A Little Film, All About You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: i * 0.12,
              }}
              className="relative rounded-xl overflow-hidden border border-gold/15 bg-bg-card"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <video
                src={video.src}
                controls
                preload="metadata"
                playsInline
                className="w-full h-auto block"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
