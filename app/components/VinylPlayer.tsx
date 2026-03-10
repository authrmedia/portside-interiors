"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const spinControls = useAnimationControls();

  // Create audio element once on mount, autoplay at 55% volume after 2.5s
  useEffect(() => {
    const audio = new Audio("/track.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const timer = setTimeout(() => {
      audio.play().then(() => {
        setIsPlaying(true);
        spinControls.start({
          rotate: 360,
          transition: { duration: 8, ease: "linear", repeat: Infinity, repeatType: "loop" },
        });
      }).catch(() => {
        // Autoplay blocked — user must click to start
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
    };
  }, []);

  async function handleClick() {
    if (isPlaying) {
      spinControls.stop();
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
      spinControls.start({
        rotate: 360,
        transition: { duration: 8, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    }
  }

  return (
    <motion.div
      className="fixed z-40 cursor-pointer flex flex-col items-center"
      style={{ bottom: 24, left: 24, gap: 8 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Relative wrapper for disc + ring */}
      <div style={{ position: "relative", width: 80, height: 80 }}>

        {/* Pulsing ring — sits slightly outside the vinyl edge, z-index above disc */}
        <motion.span
          style={{
            position: "absolute",
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            zIndex: 2,
            pointerEvents: "none",
          }}
          animate={
            isPlaying
              ? { scale: 1, opacity: 0 }
              : { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }
          }
          transition={
            isPlaying
              ? { duration: 0.3, ease: "easeOut" }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Spinning vinyl disc */}
        <motion.img
          src="/vinyl.png"
          alt="Now playing"
          animate={spinControls}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            zIndex: 1,
            position: "relative",
          }}
          draggable={false}
        />
      </div>

      {/* play / pause label — always rendered */}
      <p
        style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.55)",
          userSelect: "none",
          lineHeight: 1,
          margin: 0,
        }}
      >
        {isPlaying ? "pause" : "play"}
      </p>
    </motion.div>
  );
}
