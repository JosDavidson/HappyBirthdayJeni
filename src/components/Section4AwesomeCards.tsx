"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMusic } from "./MusicManager";
import { Award, Compass, Heart, Smile, Sparkles, Flame, ShieldAlert, Star, Users, Zap, Eye, CheckCircle2, MessageSquare, HelpCircle, ArrowUpRight } from "lucide-react";

interface AwesomeCard {
  id: number;
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderGlow: string;
}

const CARDS: AwesomeCard[] = [
  {
    id: 1,
    title: "Your Kindness",
    desc: "A gentle force that heals.",
    longDesc: "You remember the smallest details and reach out when everyone else assumes everything is fine. Your heart is a safe harbor for everyone around you, and your quiet warmth makes the world a significantly brighter place.",
    icon: Heart,
    color: "from-pink-500/20 to-rose-500/20",
    borderGlow: "group-hover:border-pink-500/30 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  },
  {
    id: 2,
    title: "Your Humor",
    desc: "Finding light in the dark.",
    longDesc: "Your laugh is incredibly infectious, and your ability to summon comedy out of the absolute bleakest situations is a true superpower. You make ordinary moments feel like memories I want to keep forever.",
    icon: Smile,
    color: "from-amber-500/20 to-yellow-500/20",
    borderGlow: "group-hover:border-yellow-500/30 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]",
  },
  {
    id: 3,
    title: "Your Determination",
    desc: "A relentless force of nature.",
    longDesc: "Watching you pursue your ambitions is inspiring. When you decide to conquer a goal, you march through obstacles with absolute grace and grit. Your focus teaches me that anything is possible.",
    icon: Flame,
    color: "from-orange-500/20 to-red-500/20",
    borderGlow: "group-hover:border-orange-500/30 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
  },
  {
    id: 4,
    title: "Your Loyalty",
    desc: "Fierce, steady, and true.",
    longDesc: "Through thin, thick, and total chaos, you have stood by my side as an unwavering anchor. You guard your people fiercely and never let them go. Finding a friend this loyal is like discovering gold.",
    icon: ShieldAlert,
    color: "from-blue-500/20 to-indigo-500/20",
    borderGlow: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
  },
  {
    id: 5,
    title: "Your Creativity",
    desc: "Seeing in high-definition.",
    longDesc: "You look at ordinary things and see art, possibilities, and worlds. Your mind is an open playground of wild concepts and glowing ideas. Your perspective constantly inspires me to think bigger.",
    icon: Sparkles,
    color: "from-purple-500/20 to-violet-500/20",
    borderGlow: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
  },
  {
    id: 6,
    title: "Your Empathy",
    desc: "Hearing what is left unsaid.",
    longDesc: "You do not just listen to words—you actually feel them. You have this rare capacity to step into another person's shoes and make them feel completely heard. You validate people in a beautiful way.",
    icon: Compass,
    color: "from-teal-500/20 to-emerald-500/20",
    borderGlow: "group-hover:border-teal-500/30 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]",
  },
  {
    id: 7,
    title: "Your Resilience",
    desc: "Rising stronger every single time.",
    longDesc: "Life has thrown some heavy storms your way, but you do not break. You stand up, dust yourself off, and keep moving forward with your head held high. Your strength is a constant lesson in courage.",
    icon: Zap,
    color: "from-red-500/20 to-pink-500/20",
    borderGlow: "group-hover:border-red-500/30 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
  },
  {
    id: 8,
    title: "Your Spontaneity",
    desc: "Always ready for the adventure.",
    longDesc: "You are the master of the sudden 2 AM drive, the unplanned diner stop, and the last-minute road trip. Your adventurous spirit keeps life exciting and reminds me to live in the present moment.",
    icon: Star,
    color: "from-yellow-500/20 to-amber-500/20",
    borderGlow: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
  },
  {
    id: 9,
    title: "Your Integrity",
    desc: "Doing right when no one watches.",
    longDesc: "Your moral compass is quiet, firm, and admirable. You stand up for what you believe in, and you treat others with genuine honesty. You are a person of real character and high standards.",
    icon: Award,
    color: "from-sky-500/20 to-blue-500/20",
    borderGlow: "group-hover:border-sky-500/30 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]",
  },
  {
    id: 10,
    title: "Your Patience",
    desc: "A grounding, calming light.",
    longDesc: "I know I can be chaotic and difficult, but you are always a listening ear, a quiet sanctuary, and a voice of absolute reason. Your calm energy keeps me grounded in the wildest storms.",
    icon: Eye,
    color: "from-indigo-500/20 to-purple-500/20",
    borderGlow: "group-hover:border-indigo-500/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
  },
  {
    id: 11,
    title: "Your Generosity",
    desc: "Giving without keeping score.",
    longDesc: "You share your time, your energy, and your heart without demanding anything in return. Your natural instinct is to lift others up and support their joy. You are incredibly generous with your spirit.",
    icon: CheckCircle2,
    color: "from-emerald-500/20 to-green-500/20",
    borderGlow: "group-hover:border-green-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  },
  {
    id: 12,
    title: "Your Wisdom",
    desc: "A lighthouse in the fog.",
    longDesc: "Whenever I get lost in my own thoughts, your insights cut through the confusion like a beacon. You have this natural, mature understanding of life that helps clarify even the messiest situations.",
    icon: HelpCircle,
    color: "from-cyan-500/20 to-teal-500/20",
    borderGlow: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]",
  },
  {
    id: 13,
    title: "Your Authenticity",
    desc: "100% unapologetically you.",
    longDesc: "In a world full of artificial filters, you never pretend. You are authentic, real, and true to your soul. Your honesty is refreshing and inspires me to embrace exactly who I am.",
    icon: Users,
    color: "from-violet-500/20 to-fuchsia-500/20",
    borderGlow: "group-hover:border-violet-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]",
  },
  {
    id: 14,
    title: "Your Curiosity",
    desc: "Never ending questions.",
    longDesc: "Your mind is a beautiful place that never stops questioning, learning, and seeking. You find wonder in things others ignore, and your love for exploration keeps your spirit incredibly young.",
    icon: MessageSquare,
    color: "from-fuchsia-500/20 to-pink-500/20",
    borderGlow: "group-hover:border-fuchsia-500/30 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.2)]",
  },
  {
    id: 15,
    title: "Your Support",
    desc: "My absolute loudest cheerleader.",
    longDesc: "You celebrate my achievements louder than I do, and you pull me through failure with double the faith. Knowing you believe in me gives me the strength to conquer anything. Thank you.",
    icon: Star,
    color: "from-rose-500/20 to-orange-500/20",
    borderGlow: "group-hover:border-rose-500/30 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  },
];

export default function Section4AwesomeCards() {
  const { playAwesomeChime } = useMusic();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardHover = (id: number) => {
    if (hoveredCard !== id) {
      setHoveredCard(id);
      playAwesomeChime();
    }
  };

  return (
    <section
      id="awesome"
      className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-slate-950 via-[#06030c] to-slate-950 text-white overflow-hidden space-grid-bg"
    >
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 fill-gold text-gold" /> Tribute Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            15 Things That Make You Awesome
          </h2>
          <p className="text-sm text-white/50 font-light max-w-md mx-auto">
            Hover or tap each floating card to hear a sparkling chime and reveal a personal story about what makes you a legendary friend.
          </p>
        </motion.div>
      </div>

      {/* Responsive Flipping Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 px-4">
        {CARDS.map((card) => {
          const CardIcon = card.icon;
          return (
            <div
              key={card.id}
              className="group h-64 perspective-1000 cursor-pointer"
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardHover(card.id)}
            >
              <div
                className={`w-full h-full relative preserve-3d duration-700 ease-out transition-transform ${
                  hoveredCard === card.id ? "rotate-y-180" : ""
                }`}
              >
                {/* CARD FRONT */}
                <div
                  className={`absolute inset-0 backface-hidden p-6 rounded-2xl border border-white/5 glass-panel bg-gradient-to-br ${card.color} flex flex-col justify-between transition-all duration-300 ${card.borderGlow}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono opacity-30 text-white group-hover:opacity-60 transition-opacity">
                      #{String(card.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/50 font-light">{card.desc}</p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gold/60 group-hover:text-gold transition-colors pt-2 border-t border-white/5">
                    <span>Flip card</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* CARD BACK */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 p-6 rounded-2xl border border-gold/20 bg-slate-950/95 flex flex-col justify-between shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <CardIcon className="w-4 h-4 text-gold" />
                    <h4 className="text-sm font-bold text-gold uppercase tracking-wider">
                      {card.title}
                    </h4>
                  </div>

                  <p className="text-xs font-light text-white/80 leading-relaxed py-2 flex-grow overflow-y-auto">
                    {card.longDesc}
                  </p>

                  <div className="text-[9px] font-mono text-white/40 text-center border-t border-white/5 pt-2">
                    Handcrafted with love ❤️
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
