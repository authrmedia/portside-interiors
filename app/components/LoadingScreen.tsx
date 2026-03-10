"use client";

import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["700", "800"] });

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center"
      style={{ background: "#000000" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className={`${dmSans.className} flex flex-col items-center text-center`}
        style={{ gap: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p
          style={{
            fontSize: 15,
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Made By
        </p>
        <p
          style={{
            fontSize: 22,
            letterSpacing: "0.1em",
            color: "rgba(255, 255, 255, 0.95)",
            fontWeight: 800,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          @authrrr
        </p>
      </motion.div>
    </motion.div>
  );
}
