"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none whitespace-nowrap"
      style={{ bottom: "2.3%", right: "2.0%" }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
    >
      {/* Frosted glass capsule */}
      <div
        className="flex flex-col items-end text-right"
        style={{
          padding: "10px 28px",
          borderRadius: 9999,
          background: "rgba(255, 245, 235, 0.08)",
          backdropFilter: "blur(6px) saturate(140%)",
          WebkitBackdropFilter: "blur(6px) saturate(140%)",
          border: "1px solid rgba(255, 245, 235, 0.18)",
          boxShadow:
            "0 2px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Line 1 — italic credit */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            letterSpacing: "0.25em",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#f5ede0",
            lineHeight: 1,
          }}
        >
          Made by authr
        </p>

        {/* Line 2 — upright, slightly more presence */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12,
            letterSpacing: "0.2em",
            fontWeight: 400,
            color: "#f5ede0",
            lineHeight: 1,
            marginTop: 5,
          }}
        >
          Made for Portside Interiors, Vancouver
        </p>
      </div>
    </motion.div>
  );
}
