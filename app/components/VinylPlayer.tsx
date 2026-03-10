"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

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
          transition: {
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      }).catch(() => {
        // Autoplay blocked by browser — user must click to start
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
        transition: {
          duration: 8,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }

  return (
    <motion.div
      className="fixed z-40 cursor-pointer"
      style={{ bottom: 24, left: 24 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Circular vinyl container */}
      <motion.div
        animate={spinControls}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src="/vinyl.png"
          alt="Now playing"
          fill
          className="object-cover"
          sizes="80px"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
