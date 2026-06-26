import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import SectionReveal from "./SectionReveal";

const photoFiles = [
  "WhatsApp Image 2026-06-22 at 6.51.18 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.19 PM (1).jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.19 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.20 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.21 PM (1).jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.21 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.22 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.24 PM (1).jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.24 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.26 PM.jpeg",
  "WhatsApp Image 2026-06-22 at 6.51.27 PM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.28 AM (1).jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.28 AM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.29 AM (1).jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.29 AM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.31 AM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.33 AM (1).jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.33 AM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.34 AM.jpeg",
  "WhatsApp Image 2026-06-25 at 12.05.36 AM.jpeg",
  "photo-11.jpg"
];

const photos = photoFiles.map((filename, i) => ({
  id: `friend-photo-${i}`,
  src: `/media/photos/pics with frnds/${filename}`,
  alt: `Friends Memory ${i + 1}`,
}));

export default function FriendsGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, selectedPhoto]);

  return (
    <SectionReveal variant="scaleIn" className="py-24 md:py-32 px-4 sm:px-6 bg-transparent">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-center text-cream mb-12 md:mb-16">
          Crazy Times, Best Memories
        </h2>

        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: (i % 6) * 0.08,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative block w-full overflow-hidden rounded-lg cursor-pointer break-inside-avoid text-left"
              aria-label={`Open ${photo.alt}`}
            >
              <motion.img
                layoutId={photo.id}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300"
                style={{
                  outline: "1px solid rgba(212,165,116,0.12)",
                  outlineOffset: "-1px",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  boxShadow: "inset 0 0 30px rgba(26,20,18,0.3)",
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.alt}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={closeLightbox}
          >
            <motion.div
              className="absolute inset-0 bg-overlay"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            />

            <motion.div
              className="relative z-10 flex max-h-[88vh] w-full max-w-5xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                layoutId={selectedPhoto.id}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain"
                style={{
                  boxShadow:
                    "0 24px 80px rgba(0,0,0,0.55), 0 0 50px rgba(212,165,116,0.08)",
                  outline: "1px solid rgba(212,165,116,0.18)",
                  outlineOffset: "-1px",
                }}
              />

              <motion.button
                type="button"
                aria-label="Close photo"
                onClick={closeLightbox}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="absolute -top-3 -right-3 sm:top-0 sm:right-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-bg-card/95 text-cream cursor-pointer transition-colors duration-200 hover:border-gold/50 hover:text-gold"
              >
                <X size={18} strokeWidth={2} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
