"use client";

import React from "react";
import { motion } from "framer-motion";

// Staggered Stairs transition variant replicating the Globussoft staircase cubes wipe
const stairsAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
};

export default function StaggeredStairs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] flex w-screen h-screen">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          variants={stairsAnimation}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.55,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.06 * index, // Diagonal staircase cascade from left to right
          }}
          className="relative h-full w-full bg-gradient-to-b from-[#050B14] via-[#091529] to-[#040810] border-r border-white/[0.04] shadow-[0_10px_50px_rgba(32,129,211,0.25)]"
        >
          {/* Frosted Cyan/Blue glow highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#2081D3]/15 via-transparent to-[#00B4A6]/10 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}

