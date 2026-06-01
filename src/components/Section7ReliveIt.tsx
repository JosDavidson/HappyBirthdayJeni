"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MessageCircle, AlertTriangle, Compass, MapPin } from "lucide-react";
import MediaLoader from "./MediaLoader";

interface ParallaxItem {
  id: number;
  category: string;
  title: string;
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  imageSrc: string;
  mediaType?: "image" | "video";
  unmuted?: boolean;
  controls?: boolean;
}

const ITEMS: ParallaxItem[] = [
  {
    id: 1,
    category: "from mad fellow",
    title: "Happy Birthday",
    desc: "Happy 22nd brooooooo you're now officially too old to be called an aunty so   you have been promotion to senior aunty so congratulations on that... Hopefully your brain cells get a promotion too...Kay in all seriousness we want to wish you a very happy and prosperous birthday this year. You've been such a great friend. Happy Birthday Jenipher aunty! Another year older, another year closer to yelling at your kids neeyelam yesapa pellaiya. Wishing you lots of cake, happiness, and the ability to get up from a chair without making weird noises and also to stay up after 9pm! P. S. You are the youngest senior citizen we know.",
    icon: Sparkles,
    color: "from-purple-950/45 to-slate-900/60",
    imageSrc: "photos/relive1.jpg",
  },
  {
    id: 2,
    category: "Happy Birthday",
    title: "Love from Jenii",
    icon: AlertTriangle,
    color: "from-rose-950/45 to-slate-900/60",
    imageSrc: "videos/Relive2.mp4",
    mediaType: "video",
    unmuted: true,
    controls: true,
  },
  {
    id: 3,
    category: "mental felloww",
    title: "Happpppyy Birthdayyy",
    desc: "Erumaa really you're an amzing friend, naraya sollanum nu plan pannae but itha edit pannum pothu time illa, unaku ellame therium!! Have a wonderful blessed year!!",
    icon: Compass,
    color: "from-teal-950/45 to-slate-900/60",
    imageSrc: "photos/relive3.jpg",
  },
];

function ParallaxCard({ item, index }: { item: ParallaxItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  // Track scroll position of this card container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offsets
  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const ItemIcon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="min-h-[75vh] sm:min-h-screen flex items-center justify-center relative py-12 md:py-24"
    >
      {/* Background Graphic Parallax Spot */}
      <motion.div
        style={{ y: yBg }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6">
        <div
          className={`flex flex-col items-center gap-10 md:gap-16 ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Parallax Image / Video Box */}
          <div className="w-full md:w-1/2 relative group">
            <motion.div
              style={{ y: yBg }}
              className="aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <MediaLoader
                type={item.mediaType || "image"}
                src={item.imageSrc}
                alt={item.title}
                fallbackText={item.title}
                fallbackGradient={index % 2 === 0 ? "from-purple-950 via-slate-900 to-indigo-950" : "from-slate-900 via-rose-950 to-amber-950"}
                className="w-full h-full object-cover"
                muted={item.unmuted ? false : true}
                controls={item.controls}
                playWhenVisible={item.mediaType === "video"}
              />
            </motion.div>
            
            {/* Absolute vector details floating */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-lg backdrop-blur-md animate-float">
              <ItemIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Text Description Box */}
          <motion.div
            style={{ y: yText }}
            className="w-full md:w-1/2 space-y-5"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold">
                {item.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {item.title}
              </h3>
            </div>
            
            {item.desc && (
              <p className="text-sm sm:text-base font-light text-white/70 leading-relaxed border-l-2 border-gold/20 pl-4">
                {item.desc}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Section7ReliveIt() {
  return (
    <section
      id="relive-it"
      className="relative min-h-screen py-24 bg-slate-950 text-white overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center mb-10 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 fill-gold text-gold" /> Relive the Adventure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            If We Could Relive It
          </h2>
          <p className="text-sm text-white/50 font-light max-w-sm mx-auto">
            Five milestone days that defy normal explanation. Scroll slowly to see the optical parallax dimensions open up.
          </p>
        </motion.div>
      </div>

      {/* Parallax cards container */}
      <div className="relative">
        {ITEMS.map((item, idx) => (
          <ParallaxCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
