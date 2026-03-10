"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { markers } from "@/app/lib/markerData";
import HeroMarker from "@/app/components/HeroMarker";
import HeroTitle from "@/app/components/HeroTitle";

// Parallax travel in px — small enough that overflow:hidden never reveals dark bg
const PARALLAX_RANGE = 6;

// Minimum scene width — keeps the desktop composition intact on narrow viewports
const MIN_SCENE_WIDTH = 1200;

export default function HeroScene() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // On mount, center the horizontal scroll position on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const centerX = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollLeft = centerX;
    }
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const bgX = useTransform(springX, [-1, 1], [-PARALLAX_RANGE, PARALLAX_RANGE]);
  const bgY = useTransform(springY, [-1, 1], [-PARALLAX_RANGE, PARALLAX_RANGE]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const markerBaseDelay = 1.2;
  const markerStagger = 0.1;

  return (
    // Outer scroll shell — exactly viewport-sized, scrolls content horizontally on mobile
    <div
      ref={scrollRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "auto",
        overflowY: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Inner scene frame — never shrinks below MIN_SCENE_WIDTH so composition stays intact */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          width: `max(100vw, ${MIN_SCENE_WIDTH}px)`,
          height: "100vh",
          background: "#0a0a0a",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image layer — slightly oversized so parallax shift is hidden by overflow:hidden */}
        <motion.div
          className="absolute z-0"
          style={{
            x: bgX,
            y: bgY,
            width: `calc(100% + ${PARALLAX_RANGE * 2}px)`,
            height: `calc(100% + ${PARALLAX_RANGE * 2}px)`,
            top: -PARALLAX_RANGE,
            left: -PARALLAX_RANGE,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/portside-hero.png"
            alt="Portside Interiors — penthouse living room at dusk"
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Very subtle dark veil for text legibility */}
        <div className="absolute inset-0 z-10 bg-black/18 pointer-events-none" />

        {/* Title — absolutely positioned inside the scene frame, scrolls with content */}
        <HeroTitle />

        {/* Markers — percentages map to the scene frame, never drift */}
        {markers.map((marker, i) => (
          <HeroMarker
            key={marker.id}
            marker={marker}
            enterDelay={markerBaseDelay + i * markerStagger}
          />
        ))}
      </div>
    </div>
  );
}
