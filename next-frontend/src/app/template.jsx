"use client";

import React from "react";
import { motion } from "framer-motion";
import StaggeredStairs from "@/components/StaggeredStairs";

export default function Template({ children }) {
  return (
    <div className="relative">
      {/* 5-Column Staggered Diagonal Stairs Wipe replicating the Globussoft style */}
      <StaggeredStairs />

      {/* Smooth Content Micro-Fade so the incoming page stabilizes smoothly without layout jerks */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

