"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { ScanSearch } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "motion/react";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <NutritionCalculator />
    </div>
  );
}

function NutritionCalculator() {
  const [dropBoxRef, dropBoxBounds] = useMeasure();
  const [motionDivRef, motionDivBounds] = useMeasure();
  const [isNearTarget, setIsNearTarget] = useState(false);
  const [targetLocked, setTargetLocked] = useState(false);
  const [isInside, setIsInside] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const checkProximity = (x: number, y: number) => {
    if (!dropBoxBounds) return;

    const threshold = 150; // Distance threshold in pixels
    const targetCenterX = dropBoxBounds.x + dropBoxBounds.width / 2;
    const targetCenterY = dropBoxBounds.y + dropBoxBounds.height / 2;

    const distance = Math.sqrt(
      Math.pow(x - targetCenterX, 2) + Math.pow(y - targetCenterY, 2)
    );

    setIsNearTarget(distance <= threshold);
  };

  const onDragEnd = (_: any, info: any) => {
    if (isNearTarget) {
      setTargetLocked(true);
      // Calculate position to move to bottom left of dropBoxRef
      if (dropBoxBounds) {
        const bottomLeftX = dropBoxBounds.x - info.point.x;
        const bottomLeftY =
          dropBoxBounds.y + dropBoxBounds.height - info.point.y;

        // Animate motion values to move from current drag position to bottom left
        animate(x, x.get() + bottomLeftX, { duration: 2, delay: 0.2 });
        animate(y, y.get() + bottomLeftY + 100, { duration: 2, delay: 0.2 });

        console.log("bottomLeftY: ", bottomLeftY);
      }
    } else {
      setTargetLocked(false);
    }
  };

  useEffect(() => {
    console.log("Is near target: ", isNearTarget);
    console.log("Target locked: ", targetLocked);
  }, [isNearTarget, targetLocked]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      // console.log("x:", latest);

      // Check if motion.div is inside dropBoxRef
      if (dropBoxBounds && motionDivBounds) {
        const motionLeft = motionDivBounds.x;
        const motionRight = motionDivBounds.x + motionDivBounds.width;
        const motionTop = motionDivBounds.y;
        const motionBottom = motionDivBounds.y + motionDivBounds.height;

        const dropLeft = dropBoxBounds.x;
        const dropRight = dropBoxBounds.x + dropBoxBounds.width;
        const dropTop = dropBoxBounds.y;
        const dropBottom = dropBoxBounds.y + dropBoxBounds.height;

        const inside =
          motionLeft >= dropLeft &&
          motionRight <= dropRight &&
          motionTop >= dropTop &&
          motionBottom <= dropBottom;

        setIsInside(inside);
        console.log("Is inside:", inside);
      }
    });
    return () => unsubscribe();
  }, [x, dropBoxBounds, motionDivBounds]);

  return (
    <div className="rounded-3xl">
      <motion.div
        ref={dropBoxRef}
        className={`flex items-center justify-center size-40 bg-[#4682A9] rounded-3xl transition-all duration-300 ${
          isNearTarget ? "[box-shadow:inset_0_0_20px_rgba(255,255,255,1)]" : ""
        }`}
        initial={{
          scale: 1,
        }}
        animate={{
          scale: targetLocked ? [3, 1] : 1,
        }}
        transition={{
          type: "spring",
          duration: 0.2,
          bounce: 0.1,
          // stiffness: 700,
          // damping: 50,
        }}
      >
        <ScanSearch size={100} strokeWidth={1} stroke="#91C8E4" />
      </motion.div>
      <div className="absolute top-20 right-20 flex flex-col gap-4">
        <motion.div
          ref={motionDivRef}
          drag
          dragMomentum={false}
          whileDrag={{ cursor: "grabbing" }}
          onDrag={(event, info) => {
            checkProximity(info.point.x, info.point.y);
          }}
          onDragEnd={onDragEnd}
          animate={{
            scale: targetLocked ? 0.2 : 1,
            skewX: targetLocked ? "-20deg" : 0,
          }}
          transition={{
            scale: {
              duration: 2,
              delay: 0.2,
            },
            skewX: {
              duration: 2,
              delay: 0.1,
            },
            // x: {
            //   duration: 0.3,
            //   delay: 0.2,
            // },
            // y: {
            //   duration: 0.3,
            //   delay: 0.2,
            // },
          }}
          style={{
            x,
            y,
          }}
          className="cursor-grab"
        >
          <Image
            src="/images/foods/apple.png"
            alt="apple"
            width={160}
            height={160}
            className="rounded-3xl bg-white select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5058G2Y7ZCBDZ3CPCBJFAAR?page=01K5058G2YT0XGDDWRH33DG9HW&node=01K557BS1HGH3P55R9RSK24F8R
 * on Sep 15, 2025 at 7:16 AM.
 */
function AnimatedMesh() {
  return (
    <MeshGradient
      speed={1.2}
      colors={["#4682A9", "#749BC2", "#91C8E4", "#FFFBDE"]}
      distortion={0.17}
      swirl={0.64}
      style={{ height: "600px", width: "600px" }}
    />
  );
}
