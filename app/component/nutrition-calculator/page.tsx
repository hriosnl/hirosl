"use client";

import {
  motion,
  useMotionValue,
  animate,
  Easing,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";
import { ScanSearch } from "lucide-react";
import { SearchIcon } from "@/components/SearchIcon";
import { Inter } from "next/font/google";
import BackHome from "@/components/ui/BackHome";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return (
    <div
      className={cn(
        "h-screen flex flex-col justify-center items-center relative"
        // inter.className
      )}
    >
      <BackHome />

      <NutritionCalculator />
    </div>
  );
}

function NutritionCalculator() {
  const [dropBoxRef, dropBoxBounds] = useMeasure();
  const [appleRef, appleBounds] = useMeasure();

  const [animationStep, setAnimationStep] = useState(0);
  const [isNearTarget, setIsNearTarget] = useState(false);
  const [targetLocked, setTargetLocked] = useState(false);
  const [isInside, setIsInside] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const checkProximity = (x: number, y: number) => {
    if (!dropBoxBounds) return;

    const threshold = 100; // Distance threshold in pixels
    const targetCenterX = dropBoxBounds.x + dropBoxBounds.width / 2;
    const targetCenterY = dropBoxBounds.y + dropBoxBounds.height / 2;

    const distance = Math.sqrt(
      Math.pow(x - targetCenterX, 2) + Math.pow(y - targetCenterY, 2)
    );

    setIsNearTarget(distance <= threshold);
  };

  // const droppingEase: Easing = [0.55, 0.055, 0.675, 0.19];

  const onDragEnd = (_: any, info: any) => {
    if (isNearTarget) {
      setTargetLocked(true);

      if (dropBoxBounds) {
        const bottomLeftX = dropBoxBounds.x - info.point.x;
        const bottomLeftY =
          dropBoxBounds.y + dropBoxBounds.height - info.point.y;

        // Animate motion values to move from current drag position to bottom left
        animate(x, x.get() + bottomLeftX, {
          duration: 0.6,
          // delay: 0.2,
          ease: [0.55, 0.055, 0.675, 0.19],
        });
        animate(y, y.get() + bottomLeftY + 120, {
          duration: 0.6,
          // delay: 0.2,
          ease: [0.55, 0.055, 0.675, 0.19],
        })
          .finished.then(() => {
            setAnimationStep(1);
          })
          .then(() => {
            setTimeout(() => {
              setAnimationStep(2);
            }, 2000);
          });

        // console.log("bottomLeftY: ", bottomLeftY);
      }
    } else {
      setTargetLocked(false);
    }
  };

  useEffect(() => {
    const checkInside = () => {
      if (dropBoxBounds && appleBounds) {
        // Calculate current apple position by adding motion values to initial bounds
        const currentAppleX = appleBounds.x + x.get();
        const currentAppleY = appleBounds.y + y.get();

        const appleLeft = appleBounds.x;
        const appleRight = currentAppleX + appleBounds.width;
        const appleTop = currentAppleY;

        const dropLeft = dropBoxBounds.x;
        const dropRight = dropBoxBounds.x + dropBoxBounds.width;
        const dropTop = dropBoxBounds.y;

        const inside =
          appleLeft >= dropLeft &&
          appleRight <= dropRight &&
          appleTop >= dropTop;

        setIsInside(inside);
        // console.log("Is inside:", inside);
        // console.log("appleRight: ", appleRight, "appleTop: ", appleTop);
        // console.log("dropRight: ", dropRight, "dropTop: ", dropTop);
      }
    };

    const unsubscribeX = x.on("change", checkInside);
    const unsubscribeY = y.on("change", checkInside);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y, dropBoxBounds, appleBounds]);

  useEffect(() => {
    console.log("Animation step: ", animationStep);
  }, [animationStep]);

  return (
    <div
      id="container"
      className={cn(
        "relative",
        isInside && targetLocked && animationStep < 2 ? "overflow-hidden" : ""
      )}
    >
      <motion.div
        ref={dropBoxRef}
        className={cn(
          "flex items-center justify-center size-40 bg-[#4682A9] rounded-3xl transition-all duration-300 relative",
          isNearTarget ? "[box-shadow:inset_0_0_20px_rgba(255,255,255,1)]" : ""
        )}
        animate={{
          scale: targetLocked ? [13, 1] : 1,
        }}
        transition={{
          type: "spring",
          duration: 0.25,
          bounce: 0.1,
        }}
      >
        <AnimatePresence>
          {!targetLocked && (
            <motion.span
              layoutId="searchIcon"
              initial={{
                scale: 1,
                opacity: 1,
              }}
              // animate={{
              //   scale: targetLocked ? 0.3 : 1,
              //   opacity: targetLocked ? 0 : 1,
              // }}
              exit={{
                scale: 0.3,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                duration: 0.4,
                bounce: 0.1,
                delay: 0.2,
              }}
            >
              <ScanSearch size={100} strokeWidth={1} stroke="#91C8E4" />
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {animationStep === 1 && (
            <motion.div
              // layoutId="searchIcon"
              className="z-10 absolute top-2 right-2 size-8 bg-transparent flex items-center justify-center rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SearchIcon className="text-[#FFF]" size={15} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute rounded-3xl overflow-hidden"
          style={{
            height: "160px",
            width: "160px",
          }}
          animate={{
            opacity: animationStep >= 1 ? 1 : 0,
            width: animationStep >= 2 ? "300px" : "160px",
            height: animationStep >= 2 ? "500px" : "160px",
          }}
          transition={{
            ease: "easeIn",
            duration: 0.4,
            delay: 0.1,
          }}
        >
          <AnimatedMesh />

          <motion.div
            className="flex flex-col absolute inset-5 bg-white rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationStep >= 2 ? 1 : 0 }}
            transition={{
              ease: "easeIn",
              duration: 0.4,
              delay: 0.6,
            }}
          >
            <Image
              src="/images/foods/apple.png"
              alt="apple"
              width={150}
              height={150}
              className="absolute top-0 right-0"
              priority
            />

            <div className="flex flex-col mt-20 px-3">
              <h1 className="py-3 text-4xl font-bold">Apple</h1>
              <div>Serving Size 1 pc (200g)</div>
              <div className="w-full h-2 bg-black" />
              <div className="font-semibold">Amount Per Serving</div>
              <div className="w-full h-0.5 bg-black" />
              <div>
                <span className="font-semibold">Calories</span> 95
              </div>
              <div className="w-full h-1 bg-black" />

              <div className="font-semibold self-end">% Daily Value</div>
              <div className="w-full h-0.5 bg-black" />

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Total Fat</span> 0.3g
                </p>
                <span>{`<`}1%</span>
              </div>
              <div className="w-full h-0.5 bg-black" />

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Vitamin C</span>
                </p>
                <span>14%</span>
              </div>
              <div className="w-full h-0.5 bg-black" />

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Sodium</span> 2mg
                </p>
                <span>0%</span>
              </div>
              <div className="w-full h-0.5 bg-black" />

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Total Carbohydrates</span>
                </p>
                <span>9%</span>
              </div>
              <div className="flex flex-col w-[93%] self-end">
                <div className="w-full h-0.5 bg-black" />

                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold">Dietary Fiber</span> 4g
                  </div>
                  <div>16%</div>
                </div>
                <div className="w-full h-0.5 bg-black" />

                <div>
                  <span className="font-semibold">Sugars</span> 10g
                </div>
              </div>
              <div className="w-full h-0.5 bg-black" />

              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">Protein</span> 0.5mg
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -top-72 -right-52 size-fit cursor-grab shadow-2xl rounded-4xl"
        ref={appleRef}
        drag
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing" }}
        onDrag={(event, info) => {
          checkProximity(info.point.x, info.point.y);
        }}
        onDragEnd={onDragEnd}
        style={{
          x,
          y,
        }}
        initial={{
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          opacity: 1,
        }}
        animate={{
          scaleX: targetLocked ? 0.5 : 1,
          scaleY: targetLocked ? 0.6 : 1,
          skewX: targetLocked ? "-20deg" : 0,
          rotate: targetLocked ? "13deg" : 0,
          opacity: animationStep >= 1 ? 0 : 1,
          // rotate: "10deg",
        }}
        transition={{
          scaleX: {
            ease: "easeIn",
            duration: 0.5,
            // delay: 0.2,
          },
          scaleY: {
            ease: "easeIn",
            duration: 0.5,
            // delay: 0.2,
          },
          skewX: {
            ease: "easeIn",
            duration: 0.5,
            delay: 0.2,
          },
          rotate: {
            ease: "easeIn",
            duration: 0.5,
          },
        }}
        // onAnimationComplete={() => {
        //   if (targetLocked) {
        //     setAnimationStep(1);
        //   }
        // }}
      >
        <Image
          src="/images/foods/apple.png"
          alt="apple"
          width={150}
          height={150}
          // fill
          className="rounded-3xl bg-white select-none"
          draggable={false}
          priority
        />
      </motion.div>
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
      speed={1.6}
      colors={["#4682A9", "#749BC2", "#FFFBDE", "#FFFBDE"]}
      distortion={0.9}
      swirl={0.8}
      style={{ height: "500px", width: "500px" }}
    />
  );
}
