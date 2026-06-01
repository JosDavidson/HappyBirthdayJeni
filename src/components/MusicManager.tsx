"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

type TrackType = "intro" | "memories" | "funny" | "future" | "finale";

interface MusicContextType {
  currentTrack: TrackType;
  setTrack: (track: TrackType) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isExperienceStarted: boolean;
  startExperience: () => void;
  isAudioStarted: boolean;
  startAudio: () => void;
  registerVideoPlaying: (isVideoPlaying: boolean) => void;
  playAwesomeChime: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const TRACKS: Record<TrackType, string> = {
  intro: "/music/intro.mp3",
  memories: "/music/memories.mp3",
  funny: "/music/funny.mp3",
  future: "/music/future.mp3",
  finale: "/music/finale.mp3",
};

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrackState] = useState<TrackType>("intro");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isExperienceStarted, setIsExperienceStarted] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // References for standard Audio elements
  const audiosRef = useRef<Record<TrackType, HTMLAudioElement | null>>({
    intro: null,
    memories: null,
    funny: null,
    future: null,
    finale: null,
  });

  const fadeIntervalsRef = useRef<Record<TrackType, NodeJS.Timeout | null>>({
    intro: null,
    memories: null,
    funny: null,
    future: null,
    finale: null,
  });

  // Web Audio Synth Engine Reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    droneOscs: OscillatorNode[];
    droneGain: GainNode | null;
    intervalId: NodeJS.Timeout | null;
    currentSynthType: TrackType | null;
  }>({
    droneOscs: [],
    droneGain: null,
    intervalId: null,
    currentSynthType: null,
  });

  // Flag to know if we are using the synthesizer fallback
  const [isSynthFallbackActive, setIsSynthFallbackActive] = useState(false);

  // Initialize Standard HTML Audio objects
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.keys(TRACKS).forEach((key) => {
        const trackKey = key as TrackType;
        const audio = new Audio(TRACKS[trackKey]);
        audio.loop = true;
        audio.volume = 0; // Handled by crossfade
        audiosRef.current[trackKey] = audio;

        // Catch load error and note it without triggering global fallback immediately
        audio.addEventListener("error", () => {
          console.warn(`Failed to load ${TRACKS[trackKey]}. Will use synth fallback when this track is played.`);
        });
      });
    }

    return () => {
      // Clean up standard audio
      Object.values(audiosRef.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });

      // Clean up fade intervals
      Object.values(fadeIntervalsRef.current).forEach((interval) => {
        if (interval) clearInterval(interval);
      });

      // Clean up synth interval
      if (synthNodesRef.current.intervalId) {
        clearInterval(synthNodesRef.current.intervalId);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const startAudio = () => {
    if (isAudioStarted) return;
    setIsAudioStarted(true);

    // Create audio context
    if (typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }

    // Unlock all audio elements synchronously on this first user interaction!
    Object.keys(TRACKS).forEach((key) => {
      const trackKey = key as TrackType;
      const audio = audiosRef.current[trackKey];
      if (audio && trackKey !== "intro") {
        // We play and immediately pause to satisfy browser autoplay policies for future tracks
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audio.pause();
          }).catch(() => {
            // It's okay if this fails quietly, it just might mean synth fallback later
          });
        }
      }
    });

    // Play standard HTML audio
    const currentAudio = audiosRef.current["intro"];
    if (currentAudio) {
      currentAudio.play().then(() => {
        crossfadeTracks("intro");
      }).catch(() => {
        setIsSynthFallbackActive(true);
        startSynthEngine();
      });
    } else {
      setIsSynthFallbackActive(true);
      startSynthEngine();
    }
  };

  // Initialize Web Audio Context on first interactive button click
  const startExperience = () => {
    setIsExperienceStarted(true);
    // Ensure audio starts playing
    startAudio();
    // Transition immediately to the memories soundtrack as we enter the timeline!
    setTrack("memories");
  };

  // Crossfade between standard HTML audio files
  const crossfadeTracks = (newTrack: TrackType) => {
    const fadeDuration = 1500; // ms
    const steps = 15;
    const stepTime = fadeDuration / steps;

    Object.keys(TRACKS).forEach((key) => {
      const trackKey = key as TrackType;
      const audio = audiosRef.current[trackKey];
      if (!audio) return;

      // Clear any existing fade interval for this track
      if (fadeIntervalsRef.current[trackKey]) {
        clearInterval(fadeIntervalsRef.current[trackKey]!);
        fadeIntervalsRef.current[trackKey] = null;
      }

      if (trackKey === newTrack) {
        // Fade in
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsSynthFallbackActive(false);
          }).catch(() => {
            setIsSynthFallbackActive(true);
          });
        }
        
        let currentVol = audio.volume;
        const targetVol = isMuted || isVideoPlaying ? 0 : volume;
        const increment = (targetVol - currentVol) / steps;

        let step = 0;
        const fadeInterval = setInterval(() => {
          step++;
          currentVol = Math.min(targetVol, Math.max(0, currentVol + increment));
          audio.volume = currentVol;
          if (step >= steps || isVideoPlaying || isMuted) {
            clearInterval(fadeInterval);
            fadeIntervalsRef.current[trackKey] = null;
            if (!isMuted && !isVideoPlaying) audio.volume = targetVol;
          }
        }, stepTime);
        fadeIntervalsRef.current[trackKey] = fadeInterval;
      } else {
        // Fade out
        let currentVol = audio.volume;
        if (currentVol > 0 || !audio.paused) {
          const decrement = Math.max(0.01, currentVol / steps);
          let step = 0;
          const fadeInterval = setInterval(() => {
            step++;
            currentVol = Math.max(0, currentVol - decrement);
            audio.volume = currentVol;
            if (step >= steps || currentVol <= 0) {
              clearInterval(fadeInterval);
              fadeIntervalsRef.current[trackKey] = null;
              audio.volume = 0;
              if (trackKey !== newTrack) {
                audio.pause();
              }
            }
          }, stepTime);
          fadeIntervalsRef.current[trackKey] = fadeInterval;
        }
      }
    });
  };

  // Handle Synths Evolving according to Section
  const stopSynthEngine = () => {
    if (synthNodesRef.current.intervalId) {
      clearInterval(synthNodesRef.current.intervalId);
      synthNodesRef.current.intervalId = null;
    }
    synthNodesRef.current.droneOscs.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Ignore
      }
    });
    synthNodesRef.current.droneOscs = [];

    if (synthNodesRef.current.droneGain) {
      synthNodesRef.current.droneGain.disconnect();
      synthNodesRef.current.droneGain = null;
    }
  };

  const startSynthEngine = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const currentMood = currentTrack;
    
    // Stop previous synth intervals and clear nodes
    stopSynthEngine();

    if (isMuted || isVideoPlaying) return;

    // Create a master volume control for synth
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);
    synthNodesRef.current.droneGain = masterGain;

    // Trigger synthesizers based on current active track mood
    if (currentMood === "intro") {
      // Deep Ambient drone: Curiosity
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(165, ctx.currentTime); // E3
      osc2.detune.setValueAtTime(10, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      synthNodesRef.current.droneOscs = [osc1, osc2];
    } else if (currentMood === "memories") {
      // Warm chime chords repeating calmly: Nostalgia
      const chimeTones = [261.63, 329.63, 392.00, 440.00]; // C4, E4, G4, A4 (C Major 6)
      let index = 0;

      const playChime = () => {
        if (isMuted || isVideoPlaying) return;
        const note = chimeTones[index % chimeTones.length];
        index++;

        const osc = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        chimeGain.gain.setValueAtTime(0, ctx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

        osc.connect(chimeGain);
        chimeGain.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 3.2);
      };

      playChime();
      synthNodesRef.current.intervalId = setInterval(playChime, 2500);
    } else if (currentMood === "funny") {
      // Upbeat staccato bubbling tones: Laughter
      const bubblyNotes = [349.23, 392.00, 466.16, 523.25]; // F4, G4, Bb4, C5
      let bubbleCount = 0;

      const playBubble = () => {
        if (isMuted || isVideoPlaying) return;
        const note = bubblyNotes[bubbleCount % bubblyNotes.length];
        bubbleCount++;

        const osc = ctx.createOscillator();
        const bubbleGain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        // Fun frequency modulation
        osc.frequency.exponentialRampToValueAtTime(note * 1.5, ctx.currentTime + 0.15);

        bubbleGain.gain.setValueAtTime(0, ctx.currentTime);
        bubbleGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
        bubbleGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

        osc.connect(bubbleGain);
        bubbleGain.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      };

      playBubble();
      synthNodesRef.current.intervalId = setInterval(playBubble, 600);
    } else if (currentMood === "future") {
      // Evolving lush chords that swell: Dreams & Adventures
      const baseFreqs = [196.00, 293.66, 392.00, 493.88]; // G3, D4, G4, B4 (G major)
      
      const oscs = baseFreqs.map((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Dynamic swelling LFO simulator
        osc.frequency.linearRampToValueAtTime(freq + (idx % 2 === 0 ? 2 : -2), ctx.currentTime + 5);
        
        osc.connect(masterGain);
        osc.start();
        return osc;
      });

      synthNodesRef.current.droneOscs = oscs;
    } else if (currentMood === "finale") {
      // Grand Orchestral swell: Emotional peak
      const finaleChords = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25]; // C2, G3, C4, E4, G4, C5
      
      const oscs = finaleChords.map((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = index < 2 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime(index * 3, ctx.currentTime);
        
        osc.connect(masterGain);
        osc.start();
        return osc;
      });

      // Slowly swell volume
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume * 0.2, ctx.currentTime + 3.0);

      synthNodesRef.current.droneOscs = oscs;
    }
  };

  // Play card flip chime trigger (Web Audio API)
  const playAwesomeChime = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || isMuted || ctx.state === "suspended") return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (sparkling arpeggio)
    const now = ctx.currentTime;

    notes.forEach((note, index) => {
      const playTime = now + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note, playTime);

      gain.gain.setValueAtTime(0, playTime);
      gain.gain.linearRampToValueAtTime(0.12, playTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, playTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(playTime);
      osc.stop(playTime + 0.85);
    });
  };

  // Set the current narrative track and handle transitions
  const setTrack = (newTrack: TrackType) => {
    if (newTrack === currentTrack) return;
    setCurrentTrackState(newTrack);

    if (isAudioStarted) {
      // Always try standard crossfade first. If the track is missing or fails to play,
      // the .catch() inside crossfadeTracks will activate the synth fallback dynamically.
      crossfadeTracks(newTrack);
    }
  };

  // Handle Mute & Volume Changes
  useEffect(() => {
    // Standard Audio volume syncing
    Object.keys(TRACKS).forEach((key) => {
      const trackKey = key as TrackType;
      const audio = audiosRef.current[trackKey];
      if (audio) {
        if (isMuted || isVideoPlaying) {
          audio.volume = 0;
        } else if (trackKey === currentTrack && !isSynthFallbackActive) {
          audio.volume = volume;
        } else if (trackKey !== currentTrack) {
          audio.volume = 0;
        }
      }
    });

    // Synth Engine volume syncing
    if (isSynthFallbackActive && isAudioStarted) {
      startSynthEngine();
    } else {
      stopSynthEngine();
    }
  }, [volume, isMuted, isVideoPlaying, isSynthFallbackActive, isAudioStarted]);

  // Pause and resume ambient soundtrack when standard cinema video overlays are launched
  const registerVideoPlaying = (videoPlaying: boolean) => {
    setIsVideoPlaying(videoPlaying);
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        setTrack,
        isMuted,
        setIsMuted,
        volume,
        setVolume,
        isExperienceStarted,
        startExperience,
        isAudioStarted,
        startAudio,
        registerVideoPlaying,
        playAwesomeChime,
      }}
    >
      {children}

      {/* Floating Music HUD Controls */}
      {isExperienceStarted && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3 rounded-full border border-white/10 glass-panel bg-slate-950/80 shadow-2xl transition-all duration-300 hover:scale-105">
          {/* Active Synth / Music Icon Indicator */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-400">
            <Music className={`w-4 h-4 ${!isMuted && !isVideoPlaying ? "animate-pulse" : "opacity-50"}`} />
            {!isMuted && !isVideoPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
            )}
          </div>

          {/* Current Vibe indicator */}
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 hidden sm:inline px-1">
            vibe: <span className="text-gold text-glow-gold">{currentTrack}</span>
          </span>

          {/* Volume Control HUD */}
          <div className="flex items-center gap-2 pr-2 border-l border-white/10 pl-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/60 hover:text-gold transition-colors p-1 rounded-full hover:bg-white/5"
              aria-label={isMuted ? "Unmute Ambient Music" : "Mute Ambient Music"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 rounded-lg appearance-none cursor-pointer bg-white/10 accent-gold"
              aria-label="Volume Slider"
            />
          </div>

          {/* Fallback Warning Flag */}
          {isSynthFallbackActive && (
            <span className="absolute -top-7 right-2 text-[9px] px-2 py-0.5 rounded border border-yellow-500/20 bg-yellow-950/80 text-yellow-400 font-mono scale-90 whitespace-nowrap">
              Web Audio Synthesizer Active
            </span>
          )}
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
