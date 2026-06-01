"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Wand2 } from "lucide-react";

interface WishStar {
  id: number;
  wish: string;
  x: number; // percentage width
  y: number; // percentage height
  size: number;
}

const WISHES: string[] = [
  "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you. (Numbers 6:24-25)",
  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. (Jeremiah 29:11)",
  "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. (Joshua 1:9)",
  "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters. (Psalm 23:1-2)",
  "Trust in the Lord with all your heart and lean not on your own understanding. (Proverbs 3:5)",
  "I can do all this through him who gives me strength. (Philippians 4:13)",
  "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. (Romans 8:28)",
  "But those who hope in the Lord will renew their strength. They will soar on wings like eagles. (Isaiah 40:31)",
  "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid. (John 14:27)",
  "Let all that you do be done in love. (1 Corinthians 16:14)",
  "This is the day that the Lord has made; let us rejoice and be glad in it. (Psalm 118:24)",
  "Cast all your anxiety on him because he cares for you. (1 Peter 5:7)",
  "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid? (Psalm 27:1)",
  "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus. (1 Thessalonians 5:16-18)",
  "A friend loves at all times, and a brother is born for a time of adversity. (Proverbs 17:17)",
  "Commit to the Lord whatever you do, and he will establish your plans. (Proverbs 16:3)",
  "The joy of the Lord is your strength. (Nehemiah 8:10)",
  "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own. (Matthew 6:34)",
  "He has made everything beautiful in its time. (Ecclesiastes 3:11)",
  "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven. (Matthew 5:16)",
  "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you. (Ephesians 4:32)",
  "You are the light of the world. A town built on a hill cannot be hidden. (Matthew 5:14)",
  "For we live by faith, not by sight. (2 Corinthians 5:7)",
  "Come to me, all you who are weary and burdened, and I will give you rest. (Matthew 11:28)",
  "Every good and perfect gift is from above, coming down from the Father of the heavenly lights. (James 1:17)"
];

// Map 25 stars to coordinates that look balanced and organic
const STARS: WishStar[] = WISHES.map((wish, idx) => {
  // Generate semi-random coordinates that are spread out
  const row = Math.floor(idx / 5);
  const col = idx % 5;
  const x = 10 + col * 18 + (Math.random() * 8 - 4);
  const y = 15 + row * 15 + (Math.random() * 6 - 3);
  const size = Math.random() * 6 + 6; // 6px to 12px
  return {
    id: idx + 1,
    wish,
    x,
    y,
    size,
  };
});

export default function Section9Constellation() {
  const [selectedStar, setSelectedStar] = useState<WishStar | null>(null);
  const [clickedStarsPath, setClickedStarsPath] = useState<WishStar[]>([]);

  // Synthesize custom sparkling note when a star is clicked
  const playSparkleChime = (index: number) => {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sparkling high pentatonic note linked to index
      const baseFreq = 880; // A5
      const notes = [1, 1.125, 1.25, 1.5, 1.667]; // Major pentatonic ratios
      const ratio = notes[index % notes.length];
      const frequency = baseFreq * ratio;

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      // Audio context blocked
    }
  };

  const handleStarClick = (star: WishStar) => {
    setSelectedStar(star);
    playSparkleChime(star.id);

    // Add star to constellation path if it's not already the active node
    if (clickedStarsPath.length === 0 || clickedStarsPath[clickedStarsPath.length - 1].id !== star.id) {
      // Limit path length to prevent clutter, keeping the last 8 connections
      const newPath = [...clickedStarsPath, star];
      if (newPath.length > 8) {
        newPath.shift();
      }
      setClickedStarsPath(newPath);
    }
  };

  const handleResetConstellation = () => {
    setClickedStarsPath([]);
    setSelectedStar(null);
  };

  return (
    <section
      id="constellation"
      className="relative min-h-screen py-24 px-4 bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial space texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] rounded-full bg-indigo-950/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl text-center mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 fill-gold text-gold" /> Cosmic Starfield
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Birthday Wish Constellation
          </h2>
          <p className="text-sm text-white/50 font-light max-w-sm mx-auto">
            A sky containing 25 sparkling stars. Click the stars to reveal secret birthday wishes, hear chime notes, and trace glowing constellation lines.
          </p>
        </motion.div>
      </div>

      {/* CONSTELLATION MAP CANVAS AREA */}
      <div className="relative w-full max-w-4xl aspect-[16/10] border border-white/10 rounded-3xl bg-slate-950/70 backdrop-blur-sm overflow-hidden z-10 shadow-2xl">
        <div className="absolute inset-0 bg-radial-gradient from-violet-600/5 to-transparent pointer-events-none" />

        {/* Dynamic Glowing Vector Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {clickedStarsPath.map((star, index) => {
            if (index === 0) return null;
            const prevStar = clickedStarsPath[index - 1];
            return (
              <motion.line
                key={`line-${index}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${star.x}%`}
                y2={`${star.y}%`}
                stroke="#d4af37"
                strokeWidth="1.5"
                className="drop-shadow-[0_0_6px_#d4af37]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* Wish Dialog Overlay (Inside the frame) */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-6 left-6 right-6 z-20 glass-panel p-5 rounded-2xl border border-gold/30 bg-slate-950/90 text-center shadow-2xl"
            >
              <div className="flex items-center justify-center gap-1.5 text-gold/80 font-bold uppercase tracking-widest text-[10px] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Wish Star #{selectedStar.id}</span>
              </div>
              <p className="text-sm font-light text-white/90 leading-relaxed max-w-xl mx-auto italic">
                &ldquo;{selectedStar.wish}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset / Clean map HUD */}
        {clickedStarsPath.length > 0 && (
          <button
            onClick={handleResetConstellation}
            className="absolute top-4 right-4 z-20 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-slate-950/80 text-white/60 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
          >
            Clear Sky Lines
          </button>
        )}

        {/* Coordinates Star Nodes */}
        {STARS.map((star) => {
          const isActive = selectedStar?.id === star.id;
          const isInPath = clickedStarsPath.some((s) => s.id === star.id);
          
          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group focus:outline-none z-10 cursor-pointer"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
            >
              {/* Pulsing ring indicator */}
              <div
                className={`absolute rounded-full border border-gold/30 opacity-0 transition-all duration-500 scale-50 ${
                  isActive ? "w-14 h-14 opacity-100 scale-100 animate-ping" : "w-10 h-10 group-hover:opacity-40 group-hover:scale-75"
                }`}
              />

              {/* Sparkle halo */}
              <div
                className={`absolute w-8 h-8 rounded-full blur-[6px] transition-all duration-300 ${
                  isActive 
                    ? "bg-gold/40 scale-125" 
                    : isInPath 
                    ? "bg-gold/15 scale-100" 
                    : "bg-white/0 group-hover:bg-gold/10 group-hover:scale-100"
                }`}
              />

              {/* Glowing star element */}
              <motion.div
                animate={isActive ? { scale: [1, 1.25, 1], rotate: [0, 90, 0] } : {}}
                transition={{ duration: 0.5 }}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive 
                    ? "text-gold scale-125 drop-shadow-[0_0_8px_#d4af37]" 
                    : isInPath
                    ? "text-gold/80 scale-100 drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]"
                    : "text-white/40 group-hover:text-gold/80 group-hover:scale-110"
                }`}
              >
                <Star
                  style={{ width: star.size, height: star.size }}
                  className={`transition-all ${
                    isActive || isInPath ? "fill-gold text-gold" : "text-white/40"
                  }`}
                />
              </motion.div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
