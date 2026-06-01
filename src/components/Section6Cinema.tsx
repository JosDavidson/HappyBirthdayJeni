"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X, Clapperboard } from "lucide-react";
import { useMusic } from "./MusicManager";
import MediaLoader from "./MediaLoader";

interface CinemaItem {
  id: number;
  title: string;
  duration: string;
  src: string;
  thumbnailSrc: string;
  summary: string;
}

const VIDEOS: CinemaItem[] = [
  {
    id: 1,
    title: "Mindkraft '26",
    duration: "2:45",
    src: "/videos/1.mp4",
    thumbnailSrc: "/photos/thumb1.jpg",
    summary: "Mental felloww, mass irunthuchii antha 2dayss.. ",
  },
  {
    id: 2,
    title: "Megaplay Practice",
    duration: "4:12",
    src: "/videos/2.mp4",
    thumbnailSrc: "/photos/thumb2.jpg",
    summary: "Practice la mental enna pannitu iruka",
  },
  {
    id: 3,
    title: "Aeee Paada poriyaa??",
    duration: "1:58",
    src: "/videos/3.mp4",
    thumbnailSrc: "/photos/thumb3.jpg",
    summary: "Again mental fellows, funny thing captured",
  },
  {
    id: 4,
    title: "Vlogger Jeni",
    duration: "3:20",
    src: "/videos/4.mp4",
    thumbnailSrc: "/photos/thumb4.jpg",
    summary: "Helllllllo Guys",
  },
];

export default function Section6Cinema() {
  const { registerVideoPlaying } = useMusic();
  const [activeVideo, setActiveVideo] = useState<CinemaItem>(VIDEOS[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync music pause state when lightbox is open
  useEffect(() => {
    registerVideoPlaying(isLightboxOpen);
    return () => registerVideoPlaying(false);
  }, [isLightboxOpen, registerVideoPlaying]);

  return (
    <section
      id="cinema"
      className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-slate-950 via-[#030107] to-slate-950 text-white overflow-hidden space-grid-bg"
    >
      {/* Cinematic space backgrounds */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyber-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-cyber-blue uppercase text-glow-cyber flex items-center justify-center gap-1.5">
            <Clapperboard className="w-3.5 h-3.5 fill-cyber-blue text-cyber-blue" /> Cinematic Lounge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Video Cinema
          </h2>
          <p className="text-sm text-white/50 font-light max-w-md mx-auto">
            Grab some popcorn. Click the play button to open the dark-room theater and watch our memories come alive on the big screen.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Widescreen Player Frame */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl relative">
          <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/5 bg-slate-950 shadow-inner group">
            <MediaLoader
              type="video" // Shows video in the featured tray, click plays video in lightbox!
              src={activeVideo.src}
              alt={activeVideo.title}
              fallbackText={activeVideo.title}
              fallbackGradient="from-slate-900 via-violet-950 to-slate-900"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/50">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(6,182,212,0.5)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLightboxOpen(true)}
                className="w-16 h-16 rounded-full border border-cyber-blue/40 bg-slate-950/90 flex items-center justify-center text-cyber-blue shadow-lg cursor-pointer transition-all duration-300"
                aria-label={`Play ${activeVideo.title}`}
              >
                <Play className="w-7 h-7 fill-cyber-blue translate-x-0.5" />
              </motion.button>
              
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 mt-4 bg-slate-950/80 px-3 py-1 rounded-full border border-white/5 font-mono">
                Duration: {activeVideo.duration}
              </span>
            </div>
          </div>

          {/* Description and metadata */}
          <div className="mt-6 px-2 space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors duration-300">
              {activeVideo.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              {activeVideo.summary}
            </p>
          </div>

          {/* Mini filmstrip thumbnails */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-gold/80">
              <Film className="w-4 h-4" />
              <span>Select Reel</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {VIDEOS.map((video) => {
                const isSelected = video.id === activeVideo.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`aspect-video rounded-xl overflow-hidden relative cursor-pointer border transition-all duration-300 bg-slate-900 ${
                      isSelected 
                        ? "border-cyber-blue shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]" 
                        : "border-white/5 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <MediaLoader
                      type="video"
                      src={video.src}
                      alt={video.title}
                      fallbackText={`Reel #${video.id}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Select indicator */}
                    <div className="absolute inset-0 bg-slate-950/20 hover:bg-slate-950/0 flex items-end p-2 transition-colors">
                      <p className="text-[9px] font-bold text-white truncate w-full bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/5">
                        {video.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* THEATER FULLSCREEN MODAL LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Modal Close Anchor */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-slate-950/80 text-white hover:text-rose-400 hover:border-rose-500/30 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              aria-label="Close Theater"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative"
            >
              <MediaLoader
                type="video"
                src={activeVideo.src}
                alt={activeVideo.title}
                fallbackText={activeVideo.title}
                className="w-full h-full"
                muted={false}
                controls={true}
              />
              
              {/* Overlay visual status */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-gold uppercase tracking-wider">Now Showing</p>
                <p className="text-[10px] text-white/80">{activeVideo.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
