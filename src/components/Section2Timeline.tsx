"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MediaLoader from "./MediaLoader";
import { Calendar, Heart } from "lucide-react";

interface MemoryItem {
  id: number;
  date: string;
  title: string;
  desc: string;
  mediaSrc: string;
  mediaType: "image" | "video";
}

const MEMORIES: MemoryItem[] = [
  {
    id: 1,
    date: "Sept 14, 2024",
    title: "The Day We Met as Team",
    desc: "Mental Fellow, I still remeber that day, with that calm smile, and greetings from you made me feel comfortable to stay there...",
    mediaSrc: "/photos/1.jpg",
    mediaType: "image",
  },
  {
    id: 2,
    date: "Oct 26, 2024",
    title: "Buy me chocolate cake at CCD!!",
    desc: "Antha MoM ahh olunga submit panniya? Aprm IAESTE co-ordinator picture, heads celebration ella mass irunthuchi laa??",
    mediaSrc: "/photos/2.jpg",
    mediaType: "image",
  },
  {
    id: 3,
    date: "Oct 29, 2024",
    title: "Corporate Service",
    desc: "Epome aunty marii dress pannitu, anniki thaa konjam okayy ahh irunthuchii..",
    mediaSrc: "/photos/3.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    date: "Nov 09, 2024",
    title: "Late Night Stories..",
    desc: "Intha picture paakum pothu thaa niyabagam varudhu, intha pic edit pannitu irukum pothu nama katha pesittu irunthom... enna kathanu theriumaa???",
    mediaSrc: "/photos/4.jpeg",
    mediaType: "image",
  },
  {
    id: 5,
    date: "Dec 17, 2024",
    title: "Naa varala pa Megaplay la paada",
    desc: "Olunga smile pannite paaduna mental, anga ninnu aluthutu iruka..!!",
    mediaSrc: "/photos/5.jpg",
    mediaType: "image",
  },
  {
    id: 6,
    date: "Dec 20, 2024",
    title: "Alumunchii, alatha erumaa...",
    desc: "Shaunah Birthday celeb! Lab la irunthu poi sollitu vara vachitala..",
    mediaSrc: "/videos/6.mp4",
    mediaType: "video",
  },
  {
    id: 7,
    date: "Mar 17, 2025",
    title: "video call ahh.. illa gmeet uhh!!",
    desc: "Athukula nama avlo pesa start pannitoma?? Brooo sama comedy ahh iruka paaru..",
    mediaSrc: "/videos/7.mp4",
    mediaType: "video",
  },
  {
    id: 8,
    date: "Aug 02, 2025",
    title: "Concert kuu paada variyaa??",
    desc: "mass ahh irunthuchii, un anne thaa seeeenn ahh potutu irunthan",
    mediaSrc: "/photos/8.jpg",
    mediaType: "image",
  },
  {
    id: 9,
    date: "Sep 29, 2025",
    title: "Intha Pic nalla irukuu erumaa",
    desc: "chaa anniku lab uniform, but okayy neengala nalla thaa irukinga..",
    mediaSrc: "/photos/9.jpg",
    mediaType: "image",
  },
  {
    id: 10,
    date: "Oct 01, 2025",
    title: "Canteen la katha kudathuu lusuu",
    desc: "Unakum Quiton ku cake vangitu vanthaa, Jeni ahh cut panna sollitu irukaa erumaa fellow..",
    mediaSrc: "/photos/10.jpg",
    mediaType: "image",
  },
];

export default function Section2Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll inside timeline container to draw line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-slate-950 via-[#0a0614] to-slate-950 text-white overflow-hidden space-grid-bg"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase text-glow-gold flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-gold text-gold" /> Memory Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Chapters So Far
          </h2>
          <p className="text-sm text-white/50 max-w-md mx-auto font-light">
            Olunga ellathaum read pannu, summa skip panna avlo thaa..!!
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Glowing Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px] bg-white/10 pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#d4af37"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
              className="drop-shadow-[0_0_8px_#d4af37]"
            />
          </svg>
        </div>

        {/* Timeline Memory Cards */}
        <div className="space-y-16 relative z-10">
          {MEMORIES.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-stretch ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 w-6 h-6 -translate-x-3 rounded-full border-2 border-gold bg-slate-950 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring" }}
                    className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"
                  />
                </div>

                {/* Left/Right Card Columns */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/40 relative group hover:border-gold/30 transition-all duration-300"
                  >
                    {/* Floating Glow Spot */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gold/5 blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Media Slot */}
                    <div className="mb-5 aspect-video overflow-hidden rounded-xl border border-white/5 bg-slate-900/50">
                      <MediaLoader
                        type={item.mediaType}
                        src={item.mediaSrc}
                        alt={item.title}
                        fallbackText={item.title}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-gold/80 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Empty column on opposite side of timeline for desk layouts */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
