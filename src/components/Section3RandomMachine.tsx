"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import MediaLoader from "./MediaLoader";
import { Sparkles } from "lucide-react";

interface RandomMemory {
  id: number;
  text: string;
  mediaSrc: string;
  mediaType: "image" | "video";
  emoji: string;
}

const MEMORY_BANK: RandomMemory[] = [
  {
    id: 1,
    text: "jeniksha nalla illa, nee eeee nu irukaa...",
    mediaSrc: "photos/random1.jpg",
    mediaType: "image",
    emoji: "🥣",
  },
  {
    id: 2,
    text: "I scream you scream we all scream for ice cream",
    mediaSrc: "photos/random2.jpg",
    mediaType: "image",
    emoji: "⛄",
  },
  {
    id: 3,
    text: "Our chaotic 4 AM grocery store run when we bought absolutely nothing of nutritional value: just three tubs of cookie dough, pancake mix, and a single giant lime.",
    mediaSrc: "videos/Random3.mp4",
    mediaType: "video",
    emoji: "🛒",
  },
  {
    id: 4,
    text: "The exact second we met up at the train station and realized we were both wearing the exact same green corduroy jacket by complete accident. We walked around looking like a duo.",
    mediaSrc: "photos/random4.jpg",
    mediaType: "image",
    emoji: "🧥",
  },
  {
    id: 5,
    text: "When you fell asleep during the critical climax of that movie, and snored so loud that a guy three rows down turned around and shushed the empty air.",
    mediaSrc: "photos/random5.jpg",
    mediaType: "image",
    emoji: "😴",
  },
  {
    id: 6,
    text: "Getting caught in that absolute torrential downpour. Instead of running, we walked the final mile home soaking wet, singing 'Singin' in the Rain' at the top of our lungs.",
    mediaSrc: "videos/Random6.mp4",
    mediaType: "video",
    emoji: "🌧️",
  },
  {
    id: 7,
    text: "The theme park trip where you peer-pressured me into riding the largest coaster. I screamed so hard my throat was sore, and the ride photo showed you laughing while I looked terrified.",
    mediaSrc: "photos/random7.jpg",
    mediaType: "image",
    emoji: "🎢",
  },
  {
    id: 8,
    text: "When we tried to learn that viral dance, spent two hours practicing in front of the mirror, and realized we both have the coordination of a wet cardboard box.",
    mediaSrc: "photos/random8.jpg",
    mediaType: "image",
    emoji: "💃",
  },
  {
    id: 9,
    text: "The afternoon we locked ourselves in the library for 'cramming study session' and ended up spending 8 hours whispering, giggling, and getting precisely zero words written.",
    mediaSrc: "photos/random9.jpg",
    mediaType: "image",
    emoji: "📚",
  },
  {
    id: 10,
    text: "That random highway exit stop where we stumbled upon a tiny dusty arcade and spent $20 in quarters competing on the Pac-Man high score list.",
    mediaSrc: "videos/Random10.mp4",
    mediaType: "video",
    emoji: "🕹️",
  },
  {
    id: 11,
    text: "Making that solemn pact in the car to purchase a private tropical island and name it 'Friendship Atoll' the very second either of us wins the lottery.",
    mediaSrc: "photos/random11.jpg",
    mediaType: "image",
    emoji: "🏝️",
  },
  {
    id: 12,
    text: "The day we tried to declutter your closet and ended up sitting cross-legged on the floor reading your highly embarrassing middle school diaries out loud.",
    mediaSrc: "photos/random12.jpg",
    mediaType: "image",
    emoji: "📔",
  },
  {
    id: 13,
    text: "The freezing winter afternoon we drank three rounds of hot cocoa and ended up in a massive, heated debate about who had the superior mug-to-marshmallow ratio.",
    mediaSrc: "photos/random13.jpg",
    mediaType: "image",
    emoji: "☕",
  },
  {
    id: 14,
    text: "When you sent me a 12-minute long voice note detailing a highly elaborate, conspiracy theory about the neighborhood squirrels planning a coup.",
    mediaSrc: "photos/random14.jpg",
    mediaType: "image",
    emoji: "🐿️",
  },
  {
    id: 15,
    text: "The beach trip where we spent three hours engineering a massive sandcastle fortress, only for a tiny dog to run through the middle of it and flatten it instantly.",
    mediaSrc: "videos/Random15.mp4",
    mediaType: "video",
    emoji: "🏖️",
  },
  {
    id: 16,
    text: "The lecture hall day when you successfully saved me a seat by placing your jacket over it and pretending to speak a highly convincing fake foreign language to anyone who asked.",
    mediaSrc: "photos/random16.jpg",
    mediaType: "image",
    emoji: "🎓",
  },
  {
    id: 17,
    text: "That board game night when you quietly forged secret alliances with everyone at the table, only to brutally betray us all in one single, legendary sweep.",
    mediaSrc: "photos/random17.jpg",
    mediaType: "image",
    emoji: "🎲",
  },
  {
    id: 18,
    text: "Sitting in the car in your driveway for an hour and a half after we arrived, because the music was too good and the conversation was too deep to cut short.",
    mediaSrc: "videos/Random18.mp4",
    mediaType: "video",
    emoji: "🚗",
  },
  {
    id: 19,
    text: "When we attempted to dye your hair tips, panicked when it looked lime green, and spent three hours in the bathroom scrubbing the splotches off the tile rug.",
    mediaSrc: "photos/random19.jpg",
    mediaType: "image",
    emoji: "💈",
  },
  {
    id: 20,
    text: "That rainy Sunday when we did absolutely nothing: just lay on the living room rugs, ordered Chinese food, and dreamed up floor plans for our future mansions.",
    mediaSrc: "photos/random20.jpg",
    mediaType: "image",
    emoji: "🏠",
  },
];

export default function Section3RandomMachine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const direction = useRef(-1); // -1 for left, 1 for right

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setConstraints({
          left: -trackWidth + containerWidth - 48, // 48 is for padding-right
          right: 0,
        });
      }
    };

    updateConstraints();
    // A small delay ensures images are loaded and widths are correct
    setTimeout(updateConstraints, 500); 
    
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  useAnimationFrame((t, delta) => {
    if (isDragging) return;

    let currentX = x.get();
    
    // Only apply auto-scroll if within bounds. 
    // If out of bounds, framer-motion is springing it back to the constraints.
    if (currentX > constraints.right || currentX < constraints.left) {
      return; 
    }
    
    // Speed of scroll
    const moveBy = 60 * (delta / 1000) * direction.current;
    currentX += moveBy;

    if (currentX <= constraints.left) {
      direction.current = 1; // Reverse to right
    } else if (currentX >= constraints.right) {
      direction.current = -1; // Reverse to left
    }

    x.set(currentX);
  });

  return (
    <section
      id="random-machine"
      className="relative min-h-screen py-24 bg-slate-950 text-white flex flex-col justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-violet-950/15 blur-[120px] pointer-events-none animate-cosmic-pulse" />
      <div className="absolute top-12 right-12 w-48 h-48 rounded-full bg-cyber-blue/5 blur-[80px] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-cyber-blue uppercase text-glow-cyber flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-cyber-blue text-cyber-blue" /> Edpi Mass ahh?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The Memories Carousel
          </h2>
          <p className="text-sm text-white/50 font-light max-w-sm mx-auto">
            Swipe or drag to explore our chaotic moments..
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full overflow-hidden py-10 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-6 px-6 w-max"
        >
          {MEMORY_BANK.map((memory) => (
            <motion.div
              key={memory.id}
              className="relative w-72 sm:w-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl shrink-0 group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-96 sm:h-[450px]">
                <MediaLoader
                  type={memory.mediaType}
                  src={memory.mediaSrc}
                  alt={`Memory ${memory.id}`}
                  className="w-full h-full"
                  mediaClassName="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Emoji Badge */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-xl shadow-lg transform group-hover:scale-110 transition-transform">
                {memory.emoji}
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
