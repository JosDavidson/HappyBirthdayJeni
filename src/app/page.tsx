"use client";

import React, { useEffect } from "react";
import { MusicProvider, useMusic } from "../components/MusicManager";
import Section1Intro from "../components/Section1Intro";
import Section2Timeline from "../components/Section2Timeline";
import Section3RandomMachine from "../components/Section3RandomMachine";
import Section6Cinema from "../components/Section6Cinema";
import Section9Constellation from "../components/Section9Constellation";
import Section7ReliveIt from "../components/Section7ReliveIt";
import Section10Finale from "../components/Section10Finale";
import { motion, AnimatePresence } from "framer-motion";

function ExperienceContent() {
  const { isExperienceStarted, setTrack } = useMusic();

  // Scroll tracking observer to manage music crossfades dynamically based on visible sections
  useEffect(() => {
    if (!isExperienceStarted) return;

    const sectionMusicMap: Record<string, "memories" | "funny" | "future"> = {
      timeline: "memories",
      "random-machine": "memories",
      cinema: "future",
      constellation: "future",
      "relive-it": "future",
    };

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Strict center focus to avoid overlapping triggers
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const targetTrack = sectionMusicMap[sectionId];
          if (targetTrack) {
            setTrack(targetTrack);
          }
        }
      });
    }, observerOptions);

    // Observe each narrative section
    Object.keys(sectionMusicMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isExperienceStarted, setTrack]);

  return (
    <div className="relative min-h-screen bg-[#030008] text-white">
      {/* Intro Modal Overlay */}
      <Section1Intro />

      {/* Main Flow: Loaded only once unlocked */}
      <AnimatePresence>
        {isExperienceStarted && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full"
          >
            {/* Scroll Anchors */}
            <Section2Timeline />
            <Section3RandomMachine />
            <Section6Cinema />
            <Section9Constellation />
            <Section7ReliveIt />
            <Section10Finale />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <MusicProvider>
      <ExperienceContent />
    </MusicProvider>
  );
}
