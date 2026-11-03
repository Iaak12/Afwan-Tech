"use client";

import React from "react";
import { motion } from "framer-motion";
import StaggeredStairs from "@/components/StaggeredStairs";

export default function Template({ children }) {
  return (
    <div className="relative overflow-x-hidden">
      {/* 5 Horizontal Rows Staircase Wipe (Left to Right) */}
      <StaggeredStairs />

      {/* Page Content Reveal: Smooth horizontal slide-in from the left matching the book page-turn feel */}
      <motion.div
        initial={{ opacity: 0.3, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
