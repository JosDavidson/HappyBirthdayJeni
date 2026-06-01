"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, X, Sparkles, BookOpen } from "lucide-react";

interface Letter {
  id: number;
  category: string;
  title: string;
  envelopeColor: string;
  teaser: string;
  content: string;
  emoji: string;
}

const LETTERS: Letter[] = [
  {
    id: 1,
    category: "For Next Birthday",
    title: "One Year From Today",
    envelopeColor: "from-purple-600/30 to-indigo-600/30",
    teaser: "A little note to read exactly 365 days from now...",
    content: "To my favorite human, one year from today. I hope that by the time you open this letter, you have conquered that massive goal we stayed up discussing last month. I hope you have laughed a million times, gotten plenty of deep sleep, and remained exactly as kind, funny, and warm as you are right now. No matter where this year takes us or how busy life gets, remember that I will always be right here, cheering you on. Here's to the next 365 days of absolute legends! ❤️",
    emoji: "🎂",
  },
  {
    id: 2,
    category: "For Future Success",
    title: "The Days You Doubt Yourself",
    envelopeColor: "from-amber-600/30 to-gold/30",
    teaser: "Open this when you feel stuck or need a steady reminder...",
    content: "For the quiet afternoons when the weight of the world feels heavy and you start wondering if you are doing enough. Let me be your mirror: you are one of the most stubborn, determined, and brilliant minds I have ever had the privilege to meet. Your future success isn't a question of 'if'—it is simply a matter of time. You have marched through storms before, and you will conquer this one too. Take a breath. I believe in you, always.",
    emoji: "🚀",
  },
  {
    id: 3,
    category: "For Future Dreams",
    title: "To the 2 AM Visions",
    envelopeColor: "from-cyan-600/30 to-blue-600/30",
    teaser: "For all the wild ideas and dreams we sketch in the dark...",
    content: "To the giant, cosmic plans we always cook up when we should be sleeping. Never let the busy, crowded world convince you that your dreams are too large, too loud, or impractical. Your capacity to see magic in the ordinary is what makes you rare. Don't lose that spark. Keep painting, keep building, and keep chasing those stars. The world needs the exact kind of magic only you can create.",
    emoji: "✨",
  },
  {
    id: 4,
    category: "For Future Adventures",
    title: "The Journeys Ahead",
    envelopeColor: "from-rose-600/30 to-pink-600/30",
    teaser: "For the train tickets and flights we haven't booked yet...",
    content: "To the mountain peaks we haven't climbed, the late-night flights we haven't boarded, and the unexpected muddy forest trails waiting for our shoes. May your coming years be packed with sudden, beautiful detours, new foods, friendly strangers, and endless discovery. I don't know where our next map will lead us, but I know one thing for certain: I cannot wait to explore the world with you. Let's go adventure. 🗺️",
    emoji: "🏔️",
  },
];

export default function Section8FutureLetters() {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);

  return (
    <section
      id="future-letters"
      className="relative min-h-screen py-24 px-4 bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background space elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-indigo-950/10 blur-[130px] pointer-events-none animate-cosmic-pulse" />
      
      {/* Drifting particle fireflies */}
      <div className="absolute top-1/3 left-10 w-2.5 h-2.5 rounded-full bg-gold/40 blur-sm animate-firefly" />
      <div className="absolute bottom-1/3 right-10 w-2 h-2 rounded-full bg-violet-400/40 blur-sm animate-firefly" style={{ animationDelay: "3s" }} />

      <div className="max-w-2xl text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 fill-gold text-gold" /> Future Letters
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Letters for the Future
          </h2>
          <p className="text-sm text-white/50 font-light max-w-sm mx-auto">
            Drifting gently in the stellar winds are four sealed envelopes. Click an envelope to unfold a heartfelt letter written for your future.
          </p>
        </motion.div>
      </div>

      {/* Floating Envelopes Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 w-full px-4">
        {LETTERS.map((letter, idx) => {
          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setActiveLetter(letter)}
              className={`glass-panel p-6 rounded-3xl border border-white/5 bg-gradient-to-tr ${letter.envelopeColor} cursor-pointer group hover:border-gold/30 transition-all duration-300 relative overflow-hidden`}
            >
              {/* Star sparkles badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/80 border border-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 group-hover:hidden" />
                <MailOpen className="w-4 h-4 hidden group-hover:block" />
              </div>

              <div className="space-y-4">
                <span className="text-2xl">{letter.emoji}</span>
                <div>
                  <span className="text-[10px] font-mono text-gold/80 tracking-widest uppercase block mb-1">
                    {letter.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                    {letter.title}
                  </h3>
                </div>
                <p className="text-xs text-white/50 font-light leading-relaxed">
                  {letter.teaser}
                </p>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* DETAILED LETTER DISPLAY OVERLAY */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6 backdrop-blur-md"
          >
            {/* Click outer to close */}
            <div className="absolute inset-0" onClick={() => setActiveLetter(null)} />

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="w-full max-w-xl glass-panel p-8 sm:p-10 rounded-3xl border border-gold/20 bg-slate-950 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Outer soft glowing halo */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-violet-600/5 blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setActiveLetter(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 bg-slate-950/80 text-white hover:text-rose-400 hover:border-rose-500/30 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Letter"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-white/10 pb-5 mb-6 text-center">
                <span className="text-3xl mb-3 block">{activeLetter.emoji}</span>
                <span className="text-[10px] font-mono text-gold tracking-widest uppercase block mb-1">
                  {activeLetter.category}
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {activeLetter.title}
                </h4>
              </div>

              {/* Letter Content Body */}
              <div className="max-h-[50vh] overflow-y-auto scrollbar-thin pr-2">
                <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed italic text-center px-2">
                  &ldquo;{activeLetter.content}&rdquo;
                </p>
              </div>

              {/* Letter Footer */}
              <div className="border-t border-white/10 pt-5 mt-6 flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>Postmarked for the future</span>
                <span className="flex items-center gap-1 text-gold/80">
                  <Sparkles className="w-3 h-3 text-gold" /> Sealed with love
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
