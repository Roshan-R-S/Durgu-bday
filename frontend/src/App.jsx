import { useEffect } from "react";
import Lenis from "lenis";
import ParticleField from "./components/ParticleField";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import PhotoGallery from "./components/PhotoGallery";
import FriendsGallery from "./components/FriendsGallery";
import VideoMemories from "./components/VideoMemories";
import SecretLetter from "./components/SecretLetter";
import FinalSurprise from "./components/FinalSurprise";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ParticleField />
      <main className="relative z-10 min-h-screen bg-transparent text-cream overflow-hidden">
        <div className="relative z-10">
          <Hero />

          {/* Soft divider between hero and content */}
          <div
            className="h-px mx-auto max-w-xs"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,165,116,0.2), transparent)",
            }}
          />

          <Countdown />
          <PhotoGallery />
          <FriendsGallery />
          <VideoMemories />
          <SecretLetter />
          <FinalSurprise />

          {/* Footer breathing room */}
          <div className="h-16 md:h-24" />
        </div>
      </main>
    </>
  );
}
