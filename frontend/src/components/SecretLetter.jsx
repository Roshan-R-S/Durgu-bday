import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { TegakiRenderer } from "tegaki/react";
import { createBundle } from "tegaki";
import SectionReveal from "./SectionReveal";
import glyphData from "../fonts/caveat/glyphData.json";
import glyphDataById from "../fonts/caveat/glyphDataById.json";
import fontUrl from "../fonts/caveat/unknown.ttf?url";

// ── Tegaki font bundle ─────────────────────────────────────────────────────
const caveatBundle = createBundle({
  version: 0,
  family: "Caveat",
  lineCap: "round",
  fontUrl,
  fontFaceCSS: `@font-face { font-family: 'Caveat'; src: url(${fontUrl}); }`,
  unitsPerEm: 1000,
  ascender: 960,
  descender: -300,
  glyphData,
  glyphDataById,
  features: ["calt", "frac", "liga", "locl"],
});

// ── Letter data — fill in content later ───────────────────────────────────
const LETTERS = [
  {
    id: "roshan",
    sender: "Roshan",
    accentColor: "#d4a574",
    paragraphs: [
      "Dear Durgu,",
      "Happy Birthday daa! 🎉❤️",
      "En life la naan meet pannina best people list la nee always top place la iruppa. Namma friendship start aagi ippo 5 years aagiduchu nu nenacha romba happy aa iruku. First year la casual a start aana friendship, ippo enakku romba precious relationship-a maari irukku.",
      "Indha 5 years la namma evlo moments share pannirukkom. Happiness, sadness, stress, fun, teasing, mokka jokes, serious talks, random conversations, ellame irundhuchu. Aana oru vishayam mattum change aagala - un friendship. Nee eppovume adhe kindness-oda, adhe care-oda irundha.",
      "Un kitta enakku romba pudicha vishayam enna na, nee evlo nalla heartu vechurukka nu. Yaarukku help venunalum first vandhu help panna try pannuva. Nee pesura way, care pannura way, ellame special. Un kindness, patience, understanding nature ellame unaku oru unique beauty kudukkudhu.",
      "Innum oru surprise enna na, namma friendship la ippo varaikkum oru periya fight kuda nadakala. Adhu romba rare. Athu namma friendship evlo strong nu kaamikudhu. Naan evlo tease pannalum nee adha smile oda handle pannuva. Adhanala dhaan un kitta pesuradhu eppovume comfortable a irukum.",
      "Honestly, nee enakku oru friend mattum illa. Naan trust panna mudiyura, nambikka veikka mudiyura oru nalla person. Life-la sila per dhaan vandhu permanent memories create pannuvaanga. Enakku appadi oru person nee.",
      "Indha birthday-la unaku naan wish pannradhu, nee eppovume happy a irukanum, healthy-aa irukanum, un dreams ellam achieve pannanum. Nee deserve panna happiness, success, love ellame un life-la neraiya varanum.",
      "Thank you for being such an amazing friend throughout these 5 years. Namma friendship innum pala varusham ippadiye strong a continue aaganum.",
      "Once again,\nHappy Birthday, Durgu! 🎂❤️",
      "With lots of care, respect, teasing and friendship,\nRoshan"
    ],
  },
  {
    id: "anu",
    sender: "Anu",
    accentColor: "#c9827a",
    paragraphs: [
      "Heyyy Durga!!! 🤍🐶",
      "Happy Birthday porombokkuuuu!!! 🎂🎉🫶🏻",
      "En lover kuda ivlo letter eluthunadhu illa 😂, but unakkaga eluthuren.",
      "First two sem la nee class ponnu nu mattum dhan theriyum.Then Praisy unna kootitu vantha aprm epdi ivlo close anom nu inniku varaikum enakku puriyala 😂. Aana andha naal la irundhu ippo varaikum nee en kooda iruka, Thanks for always being there for me till now. 🫂",
      "Evlo torture pannalum, adichalum, kadichalum, nonstop ah polambunalum 😭😂, nee en kooda iruka. Naan happy ah irundhalum, sad ah irundhalum, kovama irundhalum, overthinking la irundhalum, nee dhan iruka. ❤️",
      "Honestly, ena purinjikitu, en ah tolerate pannitu, en mood swings ellathayum handle pannitu enkooda irukurathe oru periya achievement dhan 😂🏆🤍.",
      "Namaku neraya memories iruku, innum neraya create pannanum. Sanda potalum, kadichalum, torture pannalum, aana endha situation vandhalum namma friendship mattum ipdiye strong ah irukum nu teriyum. 🧿♾️",
      "Nee deserve panra ella happiness um, success um, peace um, love um un life la kidaikanum. Un smile epovume ipdiye irukanum. ✨🤍",
      "Thank you for being my safe place, my therapist, en complaint box, en punching bag, en emergency contact ellamey 😂🫶🏻.",
      "Love you so much Durga! 🤍🫂\nHappy Birthday once again, porombokkuuuu! 😂🎂🧿♾️",
      "Forever and always,\nThigsha anu🤍🫶🏻 😘✨",
    ],
  },
  {
    id: "shivani",
    sender: "Shivani",
    accentColor: "#a88fc0",
    paragraphs: [
      "Hii my dear uyireyy 🫂",
      "Happy birthday d chlmmm💋💋",
      "Long life happya irru unna suthi irukuravangalayum happy ah vachiko. Health nalla pathuko nalla sapdu. I wish all your dreams comes true ✨.",
      "Ennaku enna solurathunu theriyala bcoz neraya sollanum thonuthu but enga irrunthu start panurathunu theriyala avlo irruku unkitta solla. First time unna pathapa ennaku feel achi ur mine nu 🥰. Unna epovum enkudavae vachikanumnu.",
      "Namba palagunathu vena short time ah irrukalam but you hold an very spl place in my heart ❤️. Ennaku neraya happiness kudutha like oru nalla companion, friend, amma, appa, ellamava irruntha en 18th birthday 🎂 marakavae mudiyatha mari celebrate panna 😘 that was my first 12 o clock celebration 🎊 en life laye athan best birthday and very spl one too 😊.",
      "Inno neraya days unkuda irrunthurukanum pola irruku neraya time spend panirukalam neraya suthirukalam thonum my bad na atha miss panitan 🫠. 2023 la en birthday apo na romba romba sad ah irruntha enga amma appa kuda wish panala but ne ennaku letter eluthi wish panna that has made my day to go forward 🫂",
      "Unna apo avlo miss panna unkuda spend panna time romba miss panna avlo aluthan unkuda irrukanum pola irrunthuchi 😔. Aprm namba food share panurathu romba miss panna🙃 unnakaga na biriyani vangi tharuvanla 🤣. Aprm hostel la enta thani irrukathu apolam un neyabagam than varum un water bottle la kudichae palagitan laa 😅.",
      "En life la neraya beautifulana memories ne kuduthuruka tq 🥰 for everything 🫂🫂🫂 . luv u lotsss d 💋💋💋.",
      "And once again happy birthday my girl 😘\nWith love,\nShivani",
    ],
  },
  {
    id: "prajith",
    sender: "Prajith",
    accentColor: "#7a9fc9",
    paragraphs: [
      "Dear Durga, My Thangachi ❤️,",
      "Some people come into our lives by chance, but they stay forever in our hearts. You are one of those people.",
      "I still remember the first time I saw you in college. I met you through our Shivani. At first, I became close to Shivani, and slowly, I got to know you. I never thought that the girl I met that day would become my own thangachi.",
      "You are not my sister by blood, but that has never mattered to me. To me, you are my family. They say family is decided by birth, but I believe family is decided by love, trust, and care. You have given me all of that.",
      "Do you know what makes you even more special to me?",
      "Whenever I look at you, I see my mom. Your face, your smile, the way you care for others, and even your little habits remind me so much of her. Every time you ask me whether I've eaten, tell me to take care of myself, or scold me for doing something stupid, I don't just feel like my thangachi is talking - I feel my mother is standing beside me. That feeling is something I can never explain.",
      "I know I'm a very annoying anna. I scold you more than I should, tease you all the time, and sometimes even hit you playfully. If someone watched us, they'd probably think I don't like you. But only we know the truth.",
      "The people we love the most are often the ones we tease the most.",
      "Behind every scolding, every fight, and every prank is a brother who loves his thangachi with all his heart. I may not say \"I love you\" often, but my care for you is hidden in all those little moments.",
      "Thank you for coming into my life. Thank you for accepting me as your anna. Thank you for giving me the happiness of having a sister when we don't even share the same blood.",
      "No matter where life takes us after college, I hope one thing never changes - our bond. I want to keep irritating you, pulling your leg, arguing with you over silly things, and then making up five minutes later. That's what siblings do, right?",
      "Promise me one thing: no matter how busy life gets, don't ever stop calling me your anna. Because I'll always be there for you - whether you're happy, sad, confused, or simply need someone to listen.",
      "I'm not your own brother by birth, but if I had the chance to choose my sister in every lifetime, I would choose you again and again.",
      "Take care of yourself, smile a lot, chase your dreams, and remember that your anna will always stand beside you, no matter what.",
      "Love you forever, my thangachi. ❤️",
      "Your forever irritating but overprotective Anna,\nPrajith",
    ],
  },
];

// ── Playback speed multiplier (20x = very fast, aesthetic only) ───────────
const SPEED = 13;

// ── Wax seal ──────────────────────────────────────────────────────────────
function WaxSeal({ color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
      className="flex flex-col items-center gap-2 mt-4"
      aria-hidden="true"
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" fill={color} opacity="0.85" />
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f5ede0" strokeWidth="1" opacity="0.5" />
        <text x="26" y="31" textAnchor="middle" fontSize="18" fill="#f5ede0" fontFamily="serif" opacity="0.9">♥</text>
      </svg>
    </motion.div>
  );
}

// ── Paragraph writer ───────────────────────────────────────────────────────
function ParagraphWriter({ text, isActive, isComplete, onComplete, isFirst, inkColor }) {
  const shouldReduceMotion = useReducedMotion();
  if (!isActive && !isComplete) return null;

  const style = {
    fontFamily: "'Caveat', cursive",
    fontSize: isFirst ? "1.45rem" : "1.15rem",
    fontWeight: isFirst ? "600" : "400",
    color: inkColor,
    lineHeight: "1.85rem",
    whiteSpace: "pre-line",
    marginBottom: isFirst ? "1.4rem" : "0",
    marginTop: isFirst ? "0" : "1rem",
    display: "block",
    width: "100%",
  };

  if (shouldReduceMotion || isComplete) {
    return <p style={style}>{text}</p>;
  }

  return (
    <TegakiRenderer
      font={caveatBundle}
      time={{ mode: 'uncontrolled', speed: SPEED }}
      onComplete={onComplete}
      style={style}
    >
      {text}
    </TegakiRenderer>
  );
}

// ── Envelope card ─────────────────────────────────────────────────────────
function EnvelopeCard({ letter, isRead, onClick }) {
  const { sender, accentColor } = letter;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col items-center gap-3 rounded-2xl p-5 cursor-pointer w-full"
      style={{
        background: isRead
          ? "rgba(35,30,27,0.6)"
          : "rgba(35,30,27,0.9)",
        border: `1px solid ${accentColor}${isRead ? "40" : "30"}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
        outline: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
      }}
      aria-label={`Open letter from ${sender}`}
    >
      {/* Read badge */}
      {isRead && (
        <div
          className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full"
          style={{ background: `${accentColor}20`, color: accentColor, fontSize: "0.65rem", letterSpacing: "0.08em" }}
        >
          READ
        </div>
      )}

      {/* Envelope illustration */}
      <div className="relative h-20 w-32" aria-hidden="true">
        {/* Envelope body */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 rounded-lg"
          style={{ background: `linear-gradient(135deg, rgba(35,30,27,0.95), rgba(45,38,34,0.95))`, border: `1px solid ${accentColor}25` }}
        />
        {/* Envelope flap */}
        <div
          className="absolute inset-x-0 bottom-8 h-10 rounded-t-lg"
          style={{
            clipPath: isRead ? "polygon(0 0, 50% 100%, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 50% 0, 100% 100%)",
            background: `linear-gradient(160deg, ${accentColor}22, rgba(35,30,27,0.9))`,
            border: `1px solid ${accentColor}20`,
            transition: "clip-path 0.4s ease",
          }}
        />
        {/* Seal dot */}
        {!isRead && (
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-5 w-3 h-3 rounded-full"
            style={{ background: accentColor, opacity: 0.6 }}
          />
        )}
      </div>

      {/* Sender name */}
      <span
        className="font-heading italic text-base sm:text-lg"
        style={{ color: isRead ? `${accentColor}80` : accentColor }}
      >
        {sender}
      </span>

      <span
        className="text-xs font-body tracking-widest uppercase"
        style={{ color: isRead ? "rgba(154,142,133,0.5)" : "rgba(154,142,133,0.8)" }}
      >
        {isRead ? "Re-read" : "Open"}
      </span>
    </motion.button>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function SecretLetter() {
  const [activeLetter, setActiveLetter] = useState(null); // letter object or null
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [showSeal, setShowSeal] = useState(false);
  const [readLetters, setReadLetters] = useState(new Set());
  const scrollRef = useRef(null);

  const closeLetter = useCallback(() => {
    setActiveLetter(null);
  }, []);

  const openLetter = useCallback((letter) => {
    setActiveLetter(letter);
    setActiveParagraph(0);
    setCompletedParagraphs([]);
    setShowSeal(false);
  }, []);

  // Auto-scroll as new paragraphs appear
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 200);
    }
  }, [activeParagraph]);

  const handleParagraphComplete = useCallback((index) => {
    setCompletedParagraphs((prev) => [...prev, index]);
    const total = activeLetter?.paragraphs?.length ?? 0;
    if (index < total - 1) {
      setActiveParagraph(index + 1);
    } else {
      // Mark as read when all paragraphs complete
      setReadLetters((prev) => new Set([...prev, activeLetter.id]));
      setTimeout(() => setShowSeal(true), 600);
    }
  }, [activeLetter]);

  // Body scroll lock
  useEffect(() => {
    if (!activeLetter) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") closeLetter(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeLetter, closeLetter]);

  return (
    <>
      {/* ── Section ─────────────────────────────────────────── */}
      <SectionReveal variant="softSlide" className="py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-center text-cream mb-4">
            Letters From The People Who Love You
          </h2>
          <p className="text-muted text-sm sm:text-base text-center font-light mb-12 md:mb-16">
            Each envelope holds something written just for you. Open them in any order.
          </p>

          {/* 4-card envelope grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {LETTERS.map((letter) => (
              <EnvelopeCard
                key={letter.id}
                letter={letter}
                isRead={readLetters.has(letter.id)}
                onClick={() => openLetter(letter)}
              />
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* ── Letter modal ────────────────────────────────────── */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-4 sm:p-6"
            onClick={closeLetter}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(15,11,9,0.9)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            />

            {/* Envelope + letter card */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 48, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex w-full max-w-lg flex-col items-center"
            >
              {/* Envelope flap */}
              <div
                className="relative mb-[-2rem] h-28 w-[78%] max-w-sm sm:h-36"
                style={{ perspective: "1200px" }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -145 }}
                  transition={{ duration: 0.75, ease: "easeInOut", delay: 0.2 }}
                  className="absolute inset-x-0 bottom-14 h-20 rounded-t-2xl sm:bottom-16 sm:h-24"
                  style={{
                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                    transformOrigin: "50% 100%",
                    transformStyle: "preserve-3d",
                    background: `linear-gradient(160deg, ${activeLetter.accentColor}22, rgba(35,30,27,0.9))`,
                    border: `1px solid ${activeLetter.accentColor}30`,
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-24 rounded-2xl sm:h-28"
                  style={{ background: "rgba(35,30,27,0.95)", border: `1px solid ${activeLetter.accentColor}25` }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-24 rounded-2xl sm:h-28"
                  style={{
                    clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)",
                    background: `linear-gradient(135deg, ${activeLetter.accentColor}18, rgba(35,30,27,0.95))`,
                  }}
                />
              </div>

              {/* Paper letter card */}
              <motion.div
                initial={{ y: 72, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.55 }}
                ref={scrollRef}
                data-lenis-prevent
                tabIndex={0}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative w-full max-h-[72vh] sm:max-h-[78vh] overflow-y-auto overscroll-contain rounded-2xl p-7 sm:p-9"
                style={{
                  backgroundColor: "#f5ede0",
                  boxShadow: `0 24px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(180,140,100,0.25), 0 0 40px ${activeLetter.accentColor}10`,
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
              >
                {/* Close button */}
                <button
                  onClick={closeLetter}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
                  style={{ color: "#9a7a6a" }}
                  aria-label="Close letter"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3d2b1f")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9a7a6a")}
                >
                  <X size={18} strokeWidth={2} />
                </button>

                {/* Left margin rule */}
                <div
                  className="absolute top-0 bottom-0 left-12 w-px"
                  style={{ background: `${activeLetter.accentColor}30` }}
                  aria-hidden="true"
                />

                {/* Letter heading */}
                <p
                  className="text-center mb-6"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: activeLetter.accentColor, letterSpacing: "0.04em" }}
                >
                  A Letter From {activeLetter.sender}
                </p>

                {/* Tegaki paragraphs */}
                <div className="pl-6">
                  {activeLetter.paragraphs.map((text, index) => (
                    <ParagraphWriter
                      key={`${activeLetter.id}-${index}`}
                      text={text}
                      isFirst={index === 0}
                      isActive={activeParagraph === index}
                      isComplete={completedParagraphs.includes(index)}
                      onComplete={() => handleParagraphComplete(index)}
                      inkColor="#3d2b1f"
                    />
                  ))}
                </div>

                {/* Wax seal */}
                <AnimatePresence>
                  {showSeal && <WaxSeal color={activeLetter.accentColor} />}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
