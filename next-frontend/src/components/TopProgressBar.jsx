"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  // When pathname changes, complete and reset bar
  useEffect(() => {
    setActive(false);
  }, [pathname]);

  // Listen for internal navigation clicks to provide instant 0ms tactile feedback
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only trigger for internal route changes (not external, hash, or target="_blank")
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        !href.includes("#") &&
        anchor.target !== "_blank";

      if (isInternal && href !== window.location.pathname) {
        setActive(true);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="top-loader-bar"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.75, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.25, ease: "easeOut" } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "0%" }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2081D3] via-[#00B4A6] to-[#2081D3] shadow-[0_0_12px_#2081D3] z-[10001] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}

