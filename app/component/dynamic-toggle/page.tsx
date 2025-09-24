"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

export default function DynamicToggle() {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");
  const [activeSubTab, setActiveSubTab] = useState<"monthly" | "annual">(
    "monthly"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const clipPath =
      activeTab === "left"
        ? "inset(0 50% 0 0% round 32px)"
        : "inset(0 0% 0 50% round 32px)";

    if (container) {
      container.style.clipPath = clipPath;
    }
  }, [activeTab]);

  return (
    <div
      className={`w-[22rem] sm:w-96 h-14 shadow-2xl rounded-4xl border border-gray-100 p-0.5 relative ${roboto.className}`}
    >
      <div className="relative h-full">
        <div className="flex text-[#DDDAD0] font-medium rounded-4xl h-full">
          <button
            className="flex-1 flex justify-center items-center cursor-pointer"
            onClick={() => setActiveTab("left")}
          >
            Free
          </button>
          <button
            className="flex-1 flex flex-col justify-center items-center pt-1 cursor-pointer"
            onClick={() => setActiveTab("right")}
          >
            {activeTab === "left" ? (
              <>
                <div className="leading-4">Premium</div>
                <div className="flex text-xs gap-2">
                  <motion.span
                    layoutId="monthly"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    Monthly
                  </motion.span>
                  <motion.span
                    layoutId="annual"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    Annual
                  </motion.span>
                </div>
              </>
            ) : null}
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex text-white bg-black font-medium h-full w-full rounded-4xl absolute top-0 left-0 transition-[clip-path] duration-300 ease-out [clip-path:inset(0px_50%_0px_0%_round_32px)]"
        >
          <button className="flex-1 flex justify-center items-center cursor-pointer">
            Free
          </button>

          <div className="flex-1 flex relative p-0.5">
            <motion.div
              className="absolute bg-white rounded-3xl inset-0.5"
              animate={{
                x: activeSubTab === "monthly" ? "2%" : "96%",
                width: "50%",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />

            {activeTab === "right" && (
              <div className="flex w-full">
                <motion.button
                  layoutId="monthly"
                  onClick={() => setActiveSubTab("monthly")}
                  className="flex-1 h-full cursor-pointer relative z-10"
                >
                  <motion.span
                    animate={{
                      color: activeSubTab === "monthly" ? "#000000" : "#DDDAD0",
                    }}
                  >
                    Monthly
                  </motion.span>
                </motion.button>

                <motion.button
                  layoutId="annual"
                  onClick={() => setActiveSubTab("annual")}
                  className="flex-1 h-full cursor-pointer relative z-10"
                >
                  <motion.span
                    animate={{
                      color: activeSubTab === "annual" ? "#000000" : "#DDDAD0",
                    }}
                  >
                    Annual
                  </motion.span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
