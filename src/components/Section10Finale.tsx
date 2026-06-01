"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useMusic } from "./MusicManager";
import MediaLoader from "./MediaLoader";
import { Heart, Stars } from "lucide-react";

export default function Section10Finale() {
  const { setTrack } = useMusic();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);

  // Trigger Section track and launch finale confetti
  useEffect(() => {
    // Check intersection to trigger track
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrack("finale");
          
          // Trigger grand slow falling confetti rain
          const duration = 15 * 1000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 15, spread: 360, ticks: 120, zIndex: 30 };

          const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
          };

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);
            // Confetti bursts from different sides
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
          }, 350);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    const current = containerRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [setTrack]);

  // Handle slow cinematic narrative timing
  useEffect(() => {
    // Step 0: "Thank you..."
    // Step 1: "Happy Birthday..."
    // Step 2: "The story continues..."
    const t1 = setTimeout(() => setStep(1), 5000);
    const t2 = setTimeout(() => setStep(2), 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="finale"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden z-10"
    >
      {/* Background massive glowing visual system */}
      <div className="absolute w-[80vw] h-[80vw] rounded-full bg-radial-gradient from-rose-500/10 via-violet-600/5 to-transparent blur-[140px] pointer-events-none animate-cosmic-pulse" />
      <div className="absolute bottom-12 w-64 h-64 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      {/* Floating firefly particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/40 blur-[1px] animate-firefly pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            animationDuration: `${Math.random() * 8 + 8}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* DRIFTING BACKGROUND MEMORY MONTAGE */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full px-4 rotate-12 scale-110">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                rotate: [i % 2 === 0 ? 8 : -8, i % 2 === 0 ? 10 : -10, i % 2 === 0 ? 8 : -8],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl relative"
            >
              <MediaLoader
                type="image"
                src={`/photos/montage${i + 1}.jpg`}
                alt="Montage item"
                fallbackText={`Chapter ${i + 1}`}
                fallbackGradient="from-slate-950 via-[#07010f] to-slate-950"
                className="w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOREGROUND STORY DISPLAY CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            /* PHASE 1: GRATITUDE CARD */
            <motion.div
              key="gratitude"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="space-y-4"
            >
              <span className="text-xs font-semibold tracking-[0.25em] text-violet-400 uppercase text-glow-violet flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-violet-400 text-violet-400" /> With Gratitude
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Thank you for every laugh, <br />
                every memory, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-violet-400 to-cyber-blue text-glow-gold">
                  every single moment.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-sm mx-auto">
                Friendship is not about the years we live, but the magic we create together along the way.
              </p>
            </motion.div>
          )}

          {step >= 1 && (
            /* PHASE 2: HAPPY BIRTHDAY UNLEASHED */
            <motion.div
              key="birthday-finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.0, type: "spring", stiffness: 45 }}
              className="space-y-6 flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 rounded-full border border-gold/40 bg-slate-950 flex items-center justify-center text-gold shadow-[0_0_40px_rgba(212,175,55,0.4)] mb-2 animate-float"
              >
                <Stars className="w-8 h-8 fill-gold text-gold" />
              </motion.div>

              <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold text-glow-gold">
                Happy Birthday
              </h2>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                to the world's best akka, senior, aunty n brndd❤️
              </h3>
              
              <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-md mx-auto italic">
                &ldquo;Here's to the chapters we have written, and the blank pages waiting for our next adventures.&rdquo;
              </p>

              {/* PHASE 3: THE STORY CONTINUES */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2.5 }}
                  className="pt-16"
                >
                  <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-white/30 text-glow-cyber border-t border-white/10 pt-4 px-6">
                    The story continues...
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
