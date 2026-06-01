"use client";

import React, { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { useInView } from "framer-motion";

interface MediaLoaderProps {
  type: "image" | "video";
  src: string;
  alt: string;
  className?: string;
  mediaClassName?: string;
  fallbackText?: string;
  fallbackGradient?: string;
  muted?: boolean;
  controls?: boolean;
  playWhenVisible?: boolean;
}

export default function MediaLoader({
  type,
  src,
  alt,
  className = "",
  mediaClassName = "w-full h-full object-cover",
  fallbackText = "Memory Slot",
  fallbackGradient = "from-purple-900/50 via-slate-900/70 to-indigo-900/50",
  muted = true,
  controls = false,
  playWhenVisible = false,
}: MediaLoaderProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.5 });

  useEffect(() => {
    if (type === "video" && playWhenVisible && videoRef.current) {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Autoplay failed:", err);
            // Fallback to muted autoplay if unmuted autoplay is blocked by browser
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(e => console.log("Muted autoplay failed:", e));
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, type, playWhenVisible]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-white/10 glass-panel bg-gradient-to-tr ${fallbackGradient} ${className}`}
      >
        {/* Glow Element */}
        <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 to-transparent pointer-events-none" />
        
        {/* Floating Accents */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold/5 blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-violet-500/5 blur-2xl animate-float-delayed" />

        {type === "image" ? (
          <ImageIcon className="w-10 h-10 text-violet-400 mb-3 animate-float opacity-80" />
        ) : (
          <VideoIcon className="w-10 h-10 text-cyber-blue mb-3 animate-float opacity-80" />
        )}
        
        <p className="text-xs font-semibold uppercase tracking-wider text-gold/80 mb-1">
          Placeholder {type === "image" ? "Photo" : "Video"}
        </p>
        <h4 className="text-sm font-medium text-white/90 px-4 line-clamp-2">
          {fallbackText}
        </h4>
        <span className="text-[10px] text-white/40 mt-3 font-mono border border-white/5 bg-black/20 px-2 py-0.5 rounded-full">
          {src.startsWith("/") ? src.substring(1) : src}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-950/40 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10 border border-white/5 rounded-2xl">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border-2 border-gold/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-t-gold rounded-full animate-spin" />
          </div>
        </div>
      )}

      {type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${mediaClassName} transition-transform duration-700 hover:scale-105 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          loop
          muted={muted}
          controls={controls}
          playsInline
          autoPlay={!playWhenVisible}
          onLoadedData={handleLoad}
          onError={handleError}
          className={`${mediaClassName} ${isLoading ? "opacity-0" : "opacity-100"}`}
        />
      )}
    </div>
  );
}
