"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Smile, RefreshCw, MessageSquareQuote } from "lucide-react";
import MediaLoader from "./MediaLoader";

interface JokeItem {
  id: number;
  title: string;
  setup: string;
  punchline: string;
  rating: string;
}

const JOKES: JokeItem[] = [
  {
    id: 1,
    title: "The Wi-Fi Whisperer",
    setup: "The time the internet went down and you spent 10 minutes gently speaking to the router like a lost puppy.",
    punchline: "The terrifying part is that the green lights actually turned back on. You have dark magic.",
    rating: "9.8/10 Spooky",
  },
  {
    id: 2,
    title: "The Mosquito War of 2021",
    setup: "That 3 AM tactical war room we set up to catch a single buzzing bug in our bedroom.",
    punchline: "We ended up breaking a nightstand lamp, throwing two pillows out the window, and the bug still survived.",
    rating: "10/10 Tactical Defeat",
  },
  {
    id: 3,
    title: "Blind Trust in GPS",
    setup: "When the satnav told us to make a sharp left, and you almost drove us straight into a community duck pond.",
    punchline: "You looked at the ducks and said, 'Well, the map says there's a ferry here.' There was no ferry.",
    rating: "9.5/10 Off-Roading",
  },
  {
    id: 4,
    title: "The Gym Phase of January 3rd",
    setup: "We bought matching neon sweatbands, spent $60 on fancy shakes, and walked into the gym ready to conquer.",
    punchline: "We spent exactly 15 minutes walking, got tired, and spent the next hour eating double burgers in the parking lot.",
    rating: "12/10 Fitness Goals",
  },
  {
    id: 5,
    title: "The 10-Second Rule Champion",
    setup: "Dropping a whole hot slice of pizza face-down on the park grass during our picnic.",
    punchline: "You picked it up, blew off a single blade of grass, and said, 'The soil is sterile, it's fine.' and ate it.",
    rating: "9.9/10 Iron Stomach",
  },
  {
    id: 6,
    title: "I'm 5 Minutes Away",
    setup: "The text message you send when I ask if you've left your house yet.",
    punchline: "Translation: 'I am currently wrapped in a towel, looking for a matching sock, and have not yet brushed my teeth.'",
    rating: "10/10 Time Travel",
  },
];

export default function Section5JokesVault() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialRotation, setDialRotation] = useState(0);

  // Play custom mechanical clicking synth
  const playClickSound = () => {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context blocked
    }
  };

  const handleOpenVault = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    setDialRotation(360);
    playClickSound();

    // Trigger click sound tick-ticks as dial spins
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      playClickSound();
      if (ticks >= 4) clearInterval(interval);
    }, 150);

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <section
      id="vault"
      className="relative min-h-screen py-24 px-4 bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <Smile className="w-3.5 h-3.5 fill-gold text-gold" /> Humor Archives
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Inside Jokes Vault
          </h2>
          <p className="text-sm text-white/50 font-light max-w-sm mx-auto">
            Classified files ahead. Only the birthday friend holds the clearance code to unlock our catalog of absolute absurdity.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full max-w-4xl px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED VAULT SCREEN */
            <motion.div
              key="closed-vault"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center w-full max-w-md relative"
            >
              {/* Outer Vault Ring */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-center shadow-2xl relative z-10">
                <div className="absolute inset-4 rounded-full border border-white/5 bg-slate-950/80 shadow-inner flex flex-col items-center justify-center">
                  
                  {/* Rotating Dial */}
                  <motion.div
                    animate={{ rotate: dialRotation }}
                    transition={{ duration: 1.0, ease: "easeInOut" }}
                    className="relative w-36 h-36 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg cursor-pointer hover:border-gold/50 transition-colors"
                    onClick={handleOpenVault}
                  >
                    {/* Dial Spokes */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-16 bg-slate-600 rounded-full"
                        style={{ transform: `rotate(${i * 30}deg)` }}
                      />
                    ))}
                    
                    {/* Dial Center */}
                    <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center relative z-10 shadow-inner text-gold">
                      {isAnimating ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-gold" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>
                  </motion.div>
                  
                </div>
              </div>

              {/* Glowing unlocking trigger */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenVault}
                disabled={isAnimating}
                className="mt-10 group relative px-8 py-3.5 rounded-full border border-gold/40 bg-slate-950/90 text-sm font-semibold tracking-wider uppercase text-gold hover:text-white hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Unlock className="w-4 h-4" /> Open The Vault
                </span>
              </motion.button>
            </motion.div>
          ) : (
            /* OPEN VAULT CONTENT REVEAL */
            <motion.div
              key="open-vault"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 20 }}
              className="w-full space-y-12"
            >
              {/* Media banner inside vault */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/40 aspect-[4/3] md:aspect-auto flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-gold/80 tracking-widest uppercase">Secret File 01</span>
                  <div className="my-4 text-center">
                    <MessageSquareQuote className="w-8 h-8 text-gold/60 mx-auto mb-2 animate-float" />
                    <p className="text-xs text-white/60 font-light italic">
                      &ldquo;We don't get older, we just become high-maintenance masterpieces.&rdquo;
                    </p>
                  </div>
                  <span className="text-[9px] text-white/30 text-right">Classified humor</span>
                </div>

                <div className="md:col-span-2 aspect-video rounded-2xl overflow-hidden border border-gold/20 shadow-[0_0_25px_rgba(212,175,55,0.1)]">
                  <MediaLoader
                    type="image"
                    src="/photos/funny_main.jpg"
                    alt="Comical Highlight"
                    fallbackText="Absolute Comedy Classic"
                    fallbackGradient="from-yellow-950/30 via-slate-900 to-amber-950/30"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Jokes Deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {JOKES.map((joke) => (
                  <motion.div
                    key={joke.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: joke.id * 0.1 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 relative group hover:border-gold/30 hover:bg-slate-950/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h4 className="text-sm font-bold text-gold uppercase tracking-wider">
                          {joke.title}
                        </h4>
                        <span className="text-[9px] font-mono text-white/40">{joke.rating}</span>
                      </div>
                      
                      <p className="text-xs text-white/80 font-light leading-relaxed">
                        {joke.setup}
                      </p>
                      
                      <div className="bg-gold/5 border border-gold/10 p-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-xs text-gold font-medium leading-relaxed">
                          {joke.punchline}
                        </p>
                      </div>
                    </div>
                    
                    <span className="text-[9px] text-white/30 mt-4 block text-center">
                      Hover to reveal punchline
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
