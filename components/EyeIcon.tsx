"use client";

import { motion } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface EyeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  animate?: boolean; // Set to false if you ever want to pause it
}

const EyeIcon = forwardRef<HTMLDivElement, EyeIconProps>(
  ({ className, size = 28, animate = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer eye path - blinking effect */}
          <motion.path
            d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
            style={{ originY: "50%" }}
            animate={
              animate
                ? {
                    scaleY: [1, 0.08, 1],
                    opacity: [1, 0.25, 1],
                  }
                : { scaleY: 1, opacity: 1 }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              times: [0, 0.15, 1], // Makes the "blink" feel natural
            }}
          />

          {/* Pupil - subtle pulsing */}
          <motion.circle
            cx="12"
            cy="12"
            r="3"
            animate={
              animate
                ? {
                    scale: [1, 0.75, 1],
                    opacity: [1, 0.6, 1],
                  }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    );
  },
);

EyeIcon.displayName = "EyeIcon";

export { EyeIcon };
