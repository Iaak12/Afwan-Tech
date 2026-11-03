"use client";

import React from "react";
import { motion } from "framer-motion";

const TOTAL_ROWS = 5;

// Horizontal Staircase Slide Animation (Left to Right)
// Top row starts moving first, cascading down to the bottom row,
// creating the exact diagonal staircase cube/strip wipe shown in Globussoft
const horizontalRowVariants = {
  initial: {
    x: "0%",
  },
  animate: (index) => ({
    x: "100%",
    transition: {
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.08, // Stagger delay per row
    },
  }),
};

export default function StaggeredStairs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {[...Array(TOTAL_ROWS)].map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={horizontalRowVariants}
          initial="initial"
          animate="animate"
          style={{
            top: `${index * 20}vh`,
            height: "20.5vh", // Slight overlap to prevent subpixel hairline gap
          }}
          className="absolute left-0 right-0 w-full bg-gradient-to-r from-[#050B14] via-[#0A1A33] to-[#071122] border-l-2 border-[#2081D3]/80 shadow-[-20px_0_40px_rgba(32,129,211,0.4)] backdrop-blur-md"
        >
          {/* Subtle frosted glass reflection texture inside each horizontal strip */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
