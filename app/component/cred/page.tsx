"use client";

import { cn } from "@/lib/utils";
import { Domine, Jost, Familjen_Grotesk } from "next/font/google";
import { motion, useMotionValue, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Iphone } from "@zuude-ui/ios-mockups";
import NumberFlow from "@number-flow/react";
import BackHome from "@/components/ui/BackHome";
import Image from "next/image";

const domine = Domine({ subsets: ["latin"] });
const jost = Jost({ subsets: ["latin"] });
const familjenGrotesk = Familjen_Grotesk({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <BackHome />

      <Iphone size="md" color="black-titanium" className="hidden sm:block">
        <CredSlider />
      </Iphone>

      <div className="w-[500px] h-[800px] bg-black sm:hidden">
        <CredSlider />
      </div>
    </div>
  );
}

function CredSlider() {
  const [amount, setAmount] = useState(2000);
  const [projectedValue, setProjectedValue] = useState(2398);

  useEffect(() => {
    const projectedValue = (amount * (1 + 0.1991)).toFixed(0);
    setProjectedValue(Number(projectedValue));
  }, [amount]);

  return (
    <div
      className={cn(
        familjenGrotesk.className,
        "flex flex-col h-full text-white py-16 space-y-10"
      )}
    >
      <div className="flex-1 flex flex-col items-center gap-y-3">
        <p className="uppercase text-xs font-bold text-white/40">
          Total projected value
        </p>
        <NumberFlow
          value={projectedValue}
          format={{
            style: "currency",
            currency: "USD",
            trailingZeroDisplay: "stripIfInteger",
          }}
          className={cn(jost.className, "text-4xl font-semibold")}
          // animated={false}
        />
        <p
          className={cn(
            jost.className,
            "text-xs font-bold text-white/40 underline underline-offset-4"
          )}
        >
          9.5% prime
        </p>
      </div>

      <div className="h-[240px] relative">
        <div className="w-full h-[3px] bg-white/5 absolute top-0" />
        <div className="w-full h-[3px] bg-white/5 absolute bottom-0" />
        <div className="w-full h-[3px] bg-white/5 absolute top-1/3" />
        <div className="w-full h-[3px] bg-white/5 absolute bottom-1/3" />

        <BarGraph amount={amount} />
      </div>

      <div className="flex-1 flex flex-col justify-end items-center gap-y-2">
        <p className="text-[0.8rem] font-bold text-white/30">
          choose investment amount
        </p>
        <NumberFlow
          value={amount}
          format={{
            style: "currency",
            currency: "USD",
            trailingZeroDisplay: "stripIfInteger",
          }}
          className={cn(jost.className, "text-2xl font-semibold")}
          animated={false}
        />
        <LinearGauge handleSetAmount={setAmount} />
        <motion.button
          className="w-[340px] h-12 bg-white text-black text-sm font-semibold"
          whileTap={{ scale: 0.99 }}
        >
          Continue
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-2"
          >
            <path
              d="M1 6H19M19 6L14 1M19 6L14 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

const BarGraph = ({ amount }: { amount: number }) => {
  const [primaryRectHeight, setPrimaryRectHeight] = useState(0);
  const [secondaryRectHeight, setSecondaryRectHeight] = useState(0);
  const [earnings, setEarnings] = useState(398);
  const primaryRectBaseHeight = 60;
  const secondaryRectBaseHeight = 25;

  useEffect(() => {
    const primaryRectAdditionalHeight = (amount - 2000) * (125 / 58000);
    setPrimaryRectHeight(primaryRectAdditionalHeight + primaryRectBaseHeight);

    const secondaryRectAdditionalHeight = (amount - 2000) * (20 / 58000);
    setSecondaryRectHeight(
      secondaryRectAdditionalHeight + secondaryRectBaseHeight
    );

    const earnings = (amount * 0.1991).toFixed(0);
    setEarnings(Number(earnings));
  }, [amount]);

  return (
    <div className="absolute bottom-0 right-0 w-full flex justify-center">
      <div className="flex flex-col relative">
        <div style={{ marginLeft: 150 }}>
          <h1
            className={cn(
              jost.className,
              "text-2xl font-semibold relative left-2 bottom-5 text-[#DCFFB7]"
            )}
          >
            9.5%
          </h1>
        </div>

        {/* Colored cube */}
        <div className="flex">
          <motion.div
            className="flex justify-between"
            style={{
              width: 145,
            }}
            initial={{ height: secondaryRectBaseHeight }}
            animate={{ height: secondaryRectHeight }}
          >
            <div className="flex flex-col relative bottom-2">
              <p
                className={cn(
                  domine.className,
                  "text-[0.65rem] font-semibold text-[#DCFFB7]"
                )}
              >
                earnings
              </p>
              <NumberFlow
                value={earnings}
                format={{
                  style: "currency",
                  currency: "USD",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                className={cn(
                  jost.className,
                  "text-base font-semibold text-[#DCFFB7]"
                )}
                animated={false}
              />
            </div>
            <div className="w-[67px] h-[1px] bg-[#DCFFB7]/50 self-center" />
          </motion.div>
          <div className="flex">
            <motion.div
              style={{
                width: 70,
                // border: "1px solid rgba(255, 255, 255, 0.3)",
                background:
                  "linear-gradient(50deg, #c3ff93, #ffeb91, #ffe2bf, #ffe7e9, #ffdce9, #ffbad4, #ff97c0, #ff70ab)",
                backgroundSize: "400% 400%",
              }}
              initial={{
                height: secondaryRectBaseHeight,
                backgroundPosition: "5% 100%",
              }}
              animate={{
                height: secondaryRectHeight,
                backgroundPosition: ["5% 100%", "100% 0%", "5% 100%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            <motion.div
              style={{
                width: 6,
                position: "relative",
                top: 6,
                // border: "1px solid rgba(255, 255, 255, 0.4)",
                // borderLeft: "0px",
                transform: "skewY(60deg)",

                background:
                  "linear-gradient(50deg, #c3ff93, #ffeb91, #ffe2bf, #ffe7e9, #ffdce9, #ffbad4, #ff97c0, #ff70ab)",
                backgroundSize: "400% 400%",
              }}
              initial={{
                height: secondaryRectBaseHeight,
                backgroundPosition: "5% 100%",
              }}
              animate={{
                height: secondaryRectHeight,
                backgroundPosition: ["5% 100%", "100% 0%", "5% 100%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </div>
        </div>

        {/* Bordered cube front */}
        <div className="flex">
          <motion.div
            className="flex justify-between items-center"
            style={{
              width: 145,
            }}
            initial={{ height: primaryRectBaseHeight }}
            animate={{ height: primaryRectHeight }}
          >
            <div className="flex flex-col relative top-4">
              <p
                className={cn(
                  domine.className,
                  "text-[0.65rem] font-semibold text-white"
                )}
              >
                investment
              </p>
              <NumberFlow
                value={amount}
                format={{
                  style: "currency",
                  currency: "USD",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                className={cn(
                  jost.className,
                  "text-base font-semibold text-white"
                )}
                animated={false}
              />
            </div>
            <div className="w-[67px] h-[1px] bg-white/30 relative top-5" />
          </motion.div>
          <div className="flex">
            <motion.div
              style={{
                width: 70,
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
              initial={{ height: primaryRectBaseHeight }}
              animate={{ height: primaryRectHeight }}
            />
            <motion.div
              className="w-2 h-20 relative top-1.5"
              style={{
                width: 6,
                position: "relative",
                top: 6,
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderLeft: "0px",
                transform: "skewY(60deg)",
              }}
              initial={{ height: primaryRectBaseHeight }}
              animate={{ height: primaryRectHeight }}
            />
          </div>
        </div>

        {/* Bordered cube bottom */}
        <div
          style={{
            width: 70,
            height: 10,
            position: "relative",
            left: 3,
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderTop: "0px",
            transform: "skewX(30deg)",
            marginLeft: 145,
          }}
        />
      </div>
    </div>
  );
};

const LinearGauge = ({
  handleSetAmount,
}: {
  handleSetAmount: (amount: number) => void;
}) => {
  const values = Array.from(
    { length: (60000 - 2000) / 500 + 1 },
    (_, i) => 2000 + i * 500
  );
  const containerWidth = 400;
  const containerCenter = containerWidth / 2;
  const tickCount = values.length;
  const tickWidth = 1;
  const tickSpacing = 13;
  // Start with tick index 0 at center (rightmost position)
  const x = useMotionValue(containerCenter);

  // Function to get current tick index at pin indicator
  const getCurrentTickIndex = (currentX: number) => {
    const currentCenterPos = containerCenter - currentX;
    return Math.round(currentCenterPos / tickSpacing);
  };

  // Listen to x changes and update amount continuously
  useEffect(() => {
    const unsubscribe = x.on("change", (currentX) => {
      const currentTickIndex = getCurrentTickIndex(currentX);

      // Ensure index is within bounds
      if (currentTickIndex >= 0 && currentTickIndex < values.length) {
        handleSetAmount(values[currentTickIndex]);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize gauge position on mount
  useEffect(() => {
    // Animate from tick index 0 to tick index 12
    const targetX = containerCenter - 9 * tickSpacing;

    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      animate(x, targetX, {
        type: "spring",
        duration: 2,
        bounce: 0.4,
      });
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const position = i % 4;
    const isLong = position === 0 || position === 4;
    return {
      index: i,
      isLong,
    };
  });

  // Calculate constraints to allow first and last ticks to reach center pin
  const lastTickPosition = (tickCount - 1) * tickSpacing;
  const dragConstraints = {
    left: containerCenter - lastTickPosition,
    right: containerCenter,
  };

  const snapToNearestTick = () => {
    const currentX = x.get();

    // Calculate which tick should be at the center
    // Current center position relative to first tick
    const currentCenterPos = containerCenter - currentX;
    const nearestTickIndex = Math.round(currentCenterPos / tickSpacing);

    // Calculate the x position that puts this tick at the center
    const targetX = containerCenter - nearestTickIndex * tickSpacing;
    handleSetAmount(values[nearestTickIndex]);

    animate(x, targetX, {
      // type: "spring",
      // duration: 0.2,
      // bounce: 0.8,
      ease: "linear",
      duration: 0.2,
    });
  };

  return (
    <div
      className="h-16 my-3 relative overflow-hidden"
      style={{ width: `${containerWidth}px` }}
    >
      <motion.div
        drag="x"
        dragConstraints={dragConstraints}
        dragTransition={{ timeConstant: 250, power: 0.2 }}
        dragElastic={0.1}
        onDragTransitionEnd={snapToNearestTick}
        whileDrag={{ cursor: "grabbing" }}
        className="flex items-center h-8 absolute cursor-grab"
        style={{ x }}
      >
        {ticks.map((tick) => (
          <div
            key={tick.index}
            className="relative"
            style={{
              marginRight:
                tick.index === ticks.length - 1
                  ? 0
                  : `${tickSpacing - tickWidth}px`,
            }}
          >
            <div
              className={`bg-white/30 ${tick.isLong ? "h-8" : "h-2"}`}
              style={{
                width: `${tickWidth}px`,
              }}
            />
            {tick.isLong && (
              <div
                className={cn(
                  jost.className,
                  "absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/30 text-xs"
                )}
              >
                {(values[tick.index] / 1000).toFixed(0)}k
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Pin Indicator */}
      <div
        className="w-[2px] h-8 bg-white absolute top-0"
        style={{
          left: `${containerCenter}px`,
          transform: "translateX(-0.5px)",
        }}
      />

      {/* Left fade overlay */}
      <div
        className="absolute top-0 left-0 h-full w-40 pointer-events-none border-0 border-white"
        style={{
          background: "linear-gradient(to right, black, transparent)",
        }}
      />

      {/* Right fade overlay */}
      <div
        className="absolute top-0 right-0 h-full w-40 pointer-events-none border-0 border-white"
        style={{
          background: "linear-gradient(to left, black, transparent)",
        }}
      />
    </div>
  );
};
