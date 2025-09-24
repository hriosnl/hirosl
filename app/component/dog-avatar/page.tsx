"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Atma } from "next/font/google";
import useMeasure, { RectReadOnly } from "react-use-measure";
import Image from "next/image";

const atma = Atma({ subsets: ["latin"], weight: ["400", "500"] });

export default function DogAvatar() {
  const [chosenDogId, setChosenDogId] = useState(-1);
  const [prevDogId, setPrevDogId] = useState(-1);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [
    containerRef,
    {
      height: containerHeight,
      width: containerWidth,
      x: containerX,
      y: containerY,
    },
  ] = useMeasure();

  const getDestination = ({
    dogCircleBounds,
    dogId,
  }: {
    dogCircleBounds: RectReadOnly;
    dogId: number;
  }) => {
    if (chosenDogId !== dogId || !dogCircleBounds.width || !containerWidth) {
      return { x: 0, y: 0 };
    }

    const containerCenterX = containerWidth / 2;
    const containerCenterY = containerHeight / 2;

    const dogCircleCenterX = dogCircleBounds.x + dogCircleBounds.width / 2;
    // const dogCircleCenterY = dogCircleBounds.y + dogCircleBounds.height / 2;
    const dogCircleCenterY = dogCircleBounds.y;

    const containerAbsoluteCenterX = containerX + containerCenterX;
    const containerAbsoluteCenterY = containerY + containerCenterY;

    return {
      x: containerAbsoluteCenterX - dogCircleCenterX,
      y: containerAbsoluteCenterY - dogCircleCenterY,
    };
  };

  useEffect(() => {
    if (chosenDogId !== -1) {
      setShowTooltip(chosenDogId);

      const timer = setTimeout(() => {
        setShowTooltip(null);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [chosenDogId]);

  return (
    <div className="flex flex-col items-center gap-y-6">
      {/* <div className="fixed bottom-0 right-1 text-xs">
        The dog barks translations are from:{" "}
        <a
          className="underline"
          target="_blank"
          href="https://chapmangamo.tumblr.com/post/58440651720/worldwide-woofs-how-to-sound-like-a-dog-in-14"
        >
          James Chapman
        </a>
      </div> */}

      <div className="text-2xl font-medium">
        Choose Your{" "}
        <span
          className={`opacity-90 font-semibold ${atma.className}`}
          style={{
            color: chosenDogId !== -1 ? Dogs[chosenDogId].color : "#cbcbcb",
          }}
        >
          Dog
        </span>
        avatar
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="w-[250px] h-[329px] relative bg-[#cbcbcb] rounded-2xl flex justify-center items-center"
        >
          {prevDogId === -1 ? (
            <Image
              src="/images/dogs/placeholder.webp"
              alt="dog placeholder"
              fill
              sizes="100%"
              priority
              className="object-contain"
            />
          ) : (
            <Image
              src={Dogs[prevDogId].src}
              alt={Dogs[prevDogId].bark}
              fill
              sizes="100%"
              priority
              className="object-cover rounded-2xl"
            />
          )}
        </div>
        <motion.div
          key={chosenDogId < 0 ? "-1" : chosenDogId}
          className="w-[250px] h-[329px] rounded-2xl absolute top-0 left-0 overflow-hidden"
          initial={{ clipPath: "circle(0px at 50% 50%)" }}
          animate={{ clipPath: "circle(100% at 50% 50%)" }}
          transition={{
            duration: 0.6,
            delay: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {chosenDogId === -1 ? (
            <Image
              src="/images/dogs/placeholder.webp"
              alt="dog placeholder"
              fill
              sizes="100%"
              priority
              className="object-contain"
            />
          ) : (
            <Image
              src={Dogs[chosenDogId].src}
              alt={Dogs[chosenDogId].bark}
              fill
              sizes="100%"
              priority
              className="object-cover"
            />
          )}
        </motion.div>
      </div>

      <div className="flex gap-x-3">
        {Dogs.map((dog) => {
          const [dogCircleRef, dogCircleBounds] = useMeasure();

          const destination = getDestination({
            dogCircleBounds,
            dogId: dog.id,
          });

          return (
            <div key={dog.id} ref={dogCircleRef} className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: chosenDogId === dog.id ? 0 : 1,
                  y: destination.y,
                  x: destination.x,
                  scale: chosenDogId === dog.id ? [1, 2, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: {
                    delay: 0.4,
                    duration: 0.2,
                  },
                }}
              >
                <div
                  className="w-[250px] h-[329px] rounded-2xl overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ clipPath: "circle(14px at 50% 50%)" }}
                >
                  <Image
                    src={dog.src}
                    alt={dog.bark}
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
              </motion.div>

              <div className="relative">
                <motion.button
                  className={cn(
                    "rounded-full size-12 cursor-pointer flex overflow-hidden relative",
                    chosenDogId === dog.id && "outline-2 outline-[#cbcbcb]"
                  )}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setPrevDogId(chosenDogId);
                    setChosenDogId(dog.id);
                  }}
                >
                  <Image
                    src={dog.src}
                    alt={dog.bark}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </motion.button>

                <AnimatePresence>
                  {showTooltip === dog.id && (
                    <motion.div
                      key={dog.id}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.8,
                        transition: { ease: "easeOut", duration: 0.2 },
                      }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 600,
                        mass: 1.5,
                        opacity: {
                          ease: "easeOut",
                        },
                      }}
                      className={cn(
                        "absolute -top-9 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap z-10",
                        atma.className
                      )}
                      style={{
                        backgroundColor: dog.color,
                      }}
                    >
                      {dog.bark}!
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                        style={{
                          borderTopColor: dog.color,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Dogs = [
  {
    id: 0,
    src: "/images/dogs/dog-yellow.png",
    bark: "Woof",
    color: "#f0c84d",
  },
  {
    id: 1,
    src: "/images/dogs/dog-blue.png",
    bark: "Aw",
    color: "#003b76",
  },
  {
    id: 2,
    src: "/images/dogs/dog-pink.png",
    bark: "Waouh",
    color: "#e19da4",
  },
  {
    id: 3,
    src: "/images/dogs/dog-green.png",
    bark: "Ham",
    color: "#55aa62",
  },
  {
    id: 4,
    src: "/images/dogs/dog-orange.png",
    bark: "Guau",
    color: "#f36e1f",
  },
  {
    id: 5,
    src: "/images/dogs/dog-purple.png",
    bark: "Bau",
    color: "#664992",
  },
];
