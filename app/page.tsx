"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroScene from "@/app/components/HeroScene";
import LoadingScreen from "@/app/components/LoadingScreen";
import VinylPlayer from "@/app/components/VinylPlayer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hold for 2s, then AnimatePresence triggers the exit fade on LoadingScreen
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-hidden">
      <HeroScene />
      <VinylPlayer />
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
    </main>
  );
}
