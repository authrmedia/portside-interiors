"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Marker } from "@/app/lib/markerData";

type Props = {
  marker: Marker;
  enterDelay: number;
};

const spring = { type: "spring" as const, stiffness: 300, damping: 25 };

export default function HeroMarker({ marker, enterDelay }: Props) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const open = hovered || tapped;

  // Measure the label's natural text width so the capsule always fits it exactly.
  // The ref sits on the primary label span; we add 32px (16px padding × 2 sides).
  const labelRef = useRef<HTMLSpanElement>(null);
  const [expandedWidth, setExpandedWidth] = useState(180);

  useEffect(() => {
    if (labelRef.current) {
      setExpandedWidth(labelRef.current.offsetWidth + 32);
    }
  }, [marker.label]);

  return (
    <motion.div
      className="absolute z-30"
      style={{ left: marker.x, top: marker.y, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: enterDelay, duration: 0.6, ease: "easeOut" }}
    >
      {/* Capsule / marker */}
      <motion.a
        href={marker.href}
        aria-label={marker.label}
        className="relative flex items-center justify-center overflow-hidden cursor-pointer select-none"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          height: 28,
          borderRadius: 9999,
          border: "1px solid rgba(245, 240, 235, 0.6)",
          backgroundColor: "transparent",
          textDecoration: "none",
          whiteSpace: "nowrap",
          display: "flex",
        }}
        animate={{
          width: open ? expandedWidth : 28,
          borderColor: open
            ? "rgba(255, 245, 235, 0.2)"
            : "rgba(245, 240, 235, 0.6)",
          boxShadow: open
            ? "0 2px 20px rgba(0,0,0,0.2)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={spring}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          // On touch devices, first tap opens the label; second tap follows the link
          if (window.matchMedia("(hover: none)").matches) {
            if (!tapped) {
              e.preventDefault();
              setTapped(true);
            } else {
              setTapped(false);
              // allow default navigation on second tap
            }
          }
        }}
      >
        {/* Frosted glass fill — fades in when open, invisible at idle */}
        <motion.span
          className="absolute inset-0"
          style={{
            borderRadius: 9999,
            background: "rgba(255, 245, 235, 0.1)",
            backdropFilter: "blur(8px) saturate(140%)",
            WebkitBackdropFilter: "blur(8px) saturate(140%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        />

        {/* Breathing pulse ring — idle only */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#f5f0eb]"
          animate={
            open
              ? { scale: 1, opacity: 0 }
              : { scale: [1, 1.08, 1], opacity: [0.55, 0.25, 0.55] }
          }
          transition={
            open
              ? { duration: 0.15, ease: "easeOut" }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Icon — fades out as capsule opens */}
        <motion.span
          className="absolute text-[#f5f0eb] text-xs leading-none select-none"
          style={{ fontWeight: 200 }}
          animate={{ opacity: open ? 0 : 0.75 }}
          transition={{ duration: 0.12 }}
        >
          +
        </motion.span>

        {/* Label text — fades in after capsule starts expanding */}
        <motion.span
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingLeft: 16, paddingRight: 16, pointerEvents: "none" }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
        >
          <span
            ref={labelRef}
            className="text-[10px] tracking-[0.22em] uppercase leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#f5ede0",
              whiteSpace: "nowrap",
            }}
          >
            {marker.label}
          </span>
          <span
            className="text-[8px] tracking-[0.15em] leading-none mt-[3px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(245, 237, 224, 0.7)",
              whiteSpace: "nowrap",
            }}
          >
            View piece →
          </span>
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
