"use client";

import { Funnel_Display } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { motion, useMotionValue, animate, Transition } from "motion/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Iphone } from "@zuude-ui/ios-mockups";

const funnelDisplay = Funnel_Display({ subsets: ["latin"] });

interface CarouselItem {
  id: number;
  image: string;
  width: number;
  height: number;
  title: string;
  content: string;
  color: string;
}

export default function Page() {
  return (
    <>
      <Iphone size="md" color="natural-titanium" className="hidden sm:block">
        <Carousel />
      </Iphone>
      <div className="sm:hidden size-full max-w-[400px] max-h-[800px]">
        <Carousel />
      </div>
    </>
  );
}

function Carousel() {
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 250;

  const SPRING: Transition = {
    type: "spring",
    bounce: 0,
    duration: 0.5,
  };

  // Handle snapping when drag ends
  const handleDragEnd = () => {
    const offset = x.get();
    const newIndex = Math.round(-offset / cardWidth);
    const clampedIndex = Math.max(
      0,
      Math.min(CAROUSEL_ITEMS.length - 1, newIndex)
    );
    setCurrentIndex(clampedIndex);

    animate(x, -clampedIndex * cardWidth, SPRING);
  };

  // Sync x when currentIndex changes (e.g. if we add buttons later)
  useEffect(() => {
    animate(x, -currentIndex * cardWidth, SPRING);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          Math.min(CAROUSEL_ITEMS.length - 1, prev + 1)
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bgColors = ["#EEE3CB", "#D7C0AE", "#B7C4CF", "#659287"][currentIndex];

  return (
    <motion.div
      className={`overflow-hidden w-full h-full self-center flex flex-col space-y-20 pt-20 relative ${funnelDisplay.className}`}
      animate={{ backgroundColor: bgColors }}
    >
      <motion.h1
        className="text-2xl font-medium self-center"
        initial={{
          color: "#ffffff",
        }}
        animate={{
          color: currentIndex === 0 ? "#000000" : "#ffffff",
        }}
        transition={{ delay: 0.1, ease: "easeOut" }}
      >
        Statistics
      </motion.h1>

      <motion.div
        className="flex w-fit cursor-grab px-[4.5rem]"
        drag="x"
        whileDrag={{ cursor: "grabbing" }}
        style={{ x }}
        dragConstraints={{
          left: -(CAROUSEL_ITEMS.length - 1) * cardWidth,
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        dragElastic={0.5}
      >
        {CAROUSEL_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            animate={{ scale: index === currentIndex ? 1.2 : 1 }}
            transition={{ type: "spring", bounce: 0 }}
            className="flex flex-col items-center h-72 space-y-2"
            style={{ width: cardWidth }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={item.width}
              height={item.height}
              draggable={false}
            />
            <motion.h2
              className="text-xs font-medium"
              initial={{
                color: "#ffffff",
              }}
              animate={{
                color: currentIndex === 0 ? "#000000" : "#ffffff",
              }}
              transition={{ delay: 0.1, ease: "easeOut" }}
            >
              {item.title}
            </motion.h2>
            <motion.h3
              className="font-bold text-3xl"
              initial={{
                color: "#ffffff",
              }}
              animate={{
                color: currentIndex === 0 ? "#000000" : "#ffffff",
              }}
              transition={{ delay: 0.1, ease: "easeOut" }}
            >
              {item.content}
            </motion.h3>
            <button className="bg-white px-4 py-2 rounded-full text-sm mt-2">
              Share
            </button>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-56 bg-white shadow-2xl p-6 space-y-7 hidden sm:block">
        <ArrowLeft className="size-6" />
        <h1 className="text-2xl font-medium">Settings</h1>
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-200 rounded-md h-6 w-56 animate-pulse"></div>
          <div className="bg-gray-300 rounded-md h-6 w-64 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    image: "/images/doodles/doodle-1.png",
    width: 160,
    height: 160,
    title: "Transcription",
    content: "4h 13m",
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: 2,
    image: "/images/doodles/doodle-2.png",
    width: 216,
    height: 216,
    title: "Chat Duration",
    content: "10h 12m",
    color: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    id: 3,
    image: "/images/doodles/doodle-3.png",
    width: 180,
    height: 180,
    title: "Battery Life",
    content: "5h 41m",
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: 4,
    image: "/images/doodles/doodle-4.png",
    width: 300,
    height: 300,
    title: "Music Listened",
    content: "10h 3m",
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
];
