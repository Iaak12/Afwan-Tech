"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicPreloader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per browser session for maximum usability
    const hasSeen = sessionStorage.getItem("afwan_preloader_v1");
    if (hasSeen) {
      return;
    }

    setLoading(true);
    document.body.style.overflow = "hidden";

    // Progress counter animation (0 to 100 over ~1.1 seconds)
    const startTime = Date.now();
    const duration = 1100; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem("afwan_preloader_v1", "true");
          } catch (_) {}
        }, 250);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            filter: "blur(8px)",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050B14] text-white select-none overflow-hidden"
        >
          {/* Ambient Radial Glow Behind Logo */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#2081D3]/20 via-[#00B4A6]/10 to-transparent blur-[120px] animate-pulse" />
          </div>

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Logo Emblem with Glow Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-3 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-[0_0_50px_rgba(32,129,211,0.35)] flex items-center justify-center">
                <Image
                  src="/afwan.png"
                  alt="Afwan Tech"
                  width={80}
                  height={80}
                  className="w-auto h-auto max-h-14 sm:max-h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>

              {/* Pulsing micro corner beacon */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4A6] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2081D3]" />
              </span>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sora text-white">
                AFWAN<span className="text-[#2081D3]">.TECH</span>
              </h1>
              <p className="mt-1 text-xs tracking-[0.25em] uppercase font-semibold text-gray-400">
                Next.js Web Engineering & Growth
              </p>
            </motion.div>

            {/* Progress Bar & Counter Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full mt-8 max-w-[280px]"
            >
              {/* Progress Track */}
              <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2081D3] via-[#00B4A6] to-[#2081D3] shadow-[0_0_15px_#2081D3]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.05 }}
                />
              </div>

              {/* Counter percentage & Telemetry */}
              <div className="flex justify-between items-center mt-3 text-[11px] font-mono tracking-wider text-gray-400">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  INITIALIZING
                </span>
                <span className="text-[#2081D3] font-bold">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom subtle copyright / craftmark */}
          <div className="absolute bottom-6 text-[11px] font-mono text-gray-500 tracking-wider">
            HIGH PERFORMANCE DIGITAL ARCHITECTURE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

