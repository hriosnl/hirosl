"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function FuturisticCounter() {
  const [count, setCount] = useState(5);
  const [isGlitching, setIsGlitching] = useState(false);
  const [utcTime, setUtcTime] = useState("");

  // Live UTC Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toISOString().slice(11, 19); // HH:MM:SS
      setUtcTime(timeString);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-increment with occasional glitch
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prev) => {
  //       const next = prev + (Math.random() > 0.7 ? 1 : -1);
  //       return Math.max(0, Math.min(999, next));
  //     });

  //     if (Math.random() > 0.82) {
  //       setIsGlitching(true);
  //       setTimeout(() => setIsGlitching(false), 220);
  //     }
  //   }, 1600);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const credits = `
 ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░      ░▒▓████████▓▒░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░                ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░                ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░           ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░                ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░                ░▒▓█▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░         ░▒▓█▓▒░   ░▒▓██████▓▒░  
                                                                         
                                                                         
       ░▒▓███████▓▒░▒▓█▓▒░      ░▒▓████████▓▒░▒▓████████▓▒░▒▓███████▓▒░  
      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
       ░▒▓██████▓▒░░▒▓█▓▒░      ░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓███████▓▒░  
             ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░        
             ░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░      ░▒▓█▓▒░        
      ░▒▓███████▓▒░░▒▓████████▓▒░▒▓████████▓▒░▒▓████████▓▒░▒▓█▓▒░        
                                                                         
                                                                        
`;

    console.log(credits);
  }, []);

  const handleClick = () => {
    setIsGlitching(true);
    setCount((prev) =>
      Math.min(999, prev + Math.floor(Math.random() * 11) + 5),
    );
    setTimeout(() => setIsGlitching(false), 280);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden relative flex items-center justify-center font-mono">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000008_1px,transparent_1px),linear-gradient(to_bottom,#ff000008_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Red vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.035)_50%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Label */}
        <div className="mb-12 tracking-[0.5em] text-red-500/70 text-lg font-light uppercase">
          007デ ALLOWABLE
        </div>

        {/* Huge Number */}
        <motion.div
          // animate={{
          //   scale: [1, 1.22, 1],
          // }}
          // transition={{
          //   duration: 5,
          //   repeat: Infinity,
          //   times: [0, 0.2, 1], // quick beat + slow return
          //   ease: "easeOut",
          // }}
          // onClick={handleClick}
          className={`
            text-[28vw] md:text-[22vw] lg:text-[280px] 
            font-black leading-none tracking-[-0.05em]
            text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-500 to-red-600
            drop-shadow-[0_0_220px_#ff0000] 
            transition-all duration-200 cursor-pointer select-none
            ${isGlitching ? "animate-[glitch_0.25s_linear_infinite]" : ""}
          `}
          style={{
            textShadow:
              "0 0 60px #ff0000, 0 0 120px #ff0000, 0 0 100px #990000",
          }}
        >
          {count.toString().padStart(2, "0")}
        </motion.div>

        {/* Subtitle */}
        <div className="mt-20 text-red-400/60 text-xs tracking-[0.25em] font-light">
          NON-CORE DEVICE AUTHORIZED FOR SCIENTIFIC AND INDUSTRIAL USE ONLY
        </div>
      </div>

      {/* HUD Elements */}
      <div className="absolute top-8 left-8 text-red-500/40 text-xs font-mono tracking-widest">
        SYSTEM v4.2.11 • ONLINE
      </div>

      {/* Working UTC Time */}
      <div className="absolute top-8 right-8 text-red-500/40 text-xs font-mono tracking-widest">
        UTC {utcTime}
      </div>

      {/* Bottom hint */}
      {/* <div className="absolute bottom-12 text-red-500/30 text-xs tracking-widest animate-pulse">
        TAP CORE TO RECALIBRATE
      </div> */}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap");

        .font-mono {
          font-family: "Orbitron", system-ui, monospace;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(3px, -3px);
          }
          60% {
            transform: translate(-2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes scan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 400px;
          }
        }
      `}</style>
    </div>
  );
}
