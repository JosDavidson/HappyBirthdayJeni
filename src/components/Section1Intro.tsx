"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "./MusicManager";
import { Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Section1Intro() {
  const { startExperience, isExperienceStarted, setVolume, startAudio } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [earphonesChoice, setEarphonesChoice] = useState<"none" | "yes" | "no">("none");

  const playConfirmationChime = (isOkay: boolean) => {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(isOkay ? 523.25 : 392.00, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
    } catch {
      // Ignore audio context block
    }
  };

  const handleEarphonesChoice = (choice: "yes" | "no") => {
    setEarphonesChoice(choice);
    playConfirmationChime(choice === "yes");
    if (choice === "no") {
      setVolume(0.65); // Boost volume for speakers
    }
    // Start background intro music immediately on this gesture click!
    startAudio();
  };

  // Starfield particle animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number; angle: number }> = [];
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        opacity: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space space texture
      const spaceGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      spaceGradient.addColorStop(0, "#080210");
      spaceGradient.addColorStop(0.5, "#030008");
      spaceGradient.addColorStop(1, "#000000");
      ctx.fillStyle = spaceGradient;
      ctx.fillRect(0, 0, width, height);

      // Drifting stars
      stars.forEach((star) => {
        star.y -= star.speed * Math.cos(star.angle);
        star.x += star.speed * Math.sin(star.angle);

        // Bound resetting
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleLaunch = () => {
    setIsFading(true);
    // Smooth cinematic wait before showing main page
    setTimeout(() => {
      startExperience();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isExperienceStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Drifting Starfield Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Ambient space glow */}
          <div className="absolute w-[45vw] h-[45vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none animate-cosmic-pulse" />
          <div className="absolute w-[30vw] h-[30vw] rounded-full bg-gold/5 blur-[100px] pointer-events-none animate-float-delayed" />

          {/* Cinematic Curtain */}
          {isFading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-black z-40 pointer-events-none"
            />
          )}

          {/* Interactive Floating Interface */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl">
            <AnimatePresence mode="wait">
              {earphonesChoice === "none" ? (
                /* EARPHONES CHECK DIALOGUE SCREEN */
                <motion.div
                  key="earphones-question"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="space-y-8 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-violet-500/30 bg-slate-950/80 flex items-center justify-center text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.25)] animate-float">
                    <Gift className="w-8 h-8" />
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                      Hey <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold text-glow-gold font-extrabold">Mental</span>!!
                    </h1>
                    <p className="text-lg sm:text-xl text-white/80 font-light tracking-wide">
                      continue with earphones?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    {/* Okay Button */}
                    <button
                      onClick={() => handleEarphonesChoice("yes")}
                      className="relative px-8 py-3.5 rounded-full border border-violet-500/40 bg-slate-950/90 text-sm font-semibold tracking-wider uppercase text-violet-300 hover:text-white hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer"
                    >
                      okay
                    </button>

                    {/* No Button */}
                    <button
                      onClick={() => handleEarphonesChoice("no")}
                      className="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-semibold tracking-wider uppercase text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      Illa vendam
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* MAIN SURPRISE INTRO CARD SCREEN */
                <motion.div
                  key="main-intro-card"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-gold/30 bg-slate-950/80 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(212,175,55,0.25)] animate-float">
                    <Gift className="w-8 h-8" />
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-semibold tracking-[0.25em] text-violet-400  text-glow-violet">
                      Heyyy Erumaa
                    </span>
                    
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Readyy ahh??  <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-violet-400 to-cyber-blue text-glow-gold">
                        surprise waiting
                      </span>{" "}
                      for you...
                    </h1>
                    
                    <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm mx-auto">
                      Adjust your volume and prepare for a stroll down memory lane.
                    </p>
                  </div>

                  <button
                    onClick={handleLaunch}
                    disabled={isFading}
                    className="group relative px-8 py-4 rounded-full border border-gold/40 bg-slate-950/90 text-sm font-semibold tracking-wider uppercase text-gold hover:text-white hover:border-white transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] disabled:opacity-50 cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/10 via-violet-600/10 to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      Surprise Me!
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
