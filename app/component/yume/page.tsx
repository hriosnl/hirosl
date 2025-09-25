"use client";

import { cn } from "@/lib/utils";
import { Iphone } from "@zuude-ui/ios-mockups";
import { motion, useAnimate, PanInfo, Transition, Easing } from "motion/react";
import { useEffect, useState } from "react";
import { CircleDot, ChevronRight } from "lucide-react";
import { IBM_Plex_Serif, Noto_Serif, Bodoni_Moda } from "next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const notoSerif = Noto_Serif({ subsets: ["latin"] });
const bodoniModa = Bodoni_Moda({ subsets: ["latin"] });

export default function Page() {
  const [isFolded, setIsFolded] = useState(false);

  return (
    <>
      <Iphone size="md" color="black-titanium" className="hidden sm:block">
        <div className="h-full flex flex-col relative overflow-hidden">
          <div className="h-14 py-5 px-8 flex justify-between backdrop-blur-sm bg-white/10 z-10 rounded-t-full" />

          <div className="flex-1 z-0 relative">
            <Title isFolded={isFolded} />
            <Book handleSetIsFolded={setIsFolded} />
            <Calendar isFolded={isFolded} />
          </div>
        </div>
      </Iphone>

      <div className="sm:hidden h-full flex max-w-[400px] max-h-[800px] flex-col relative overflow-hidden">
        <div className="flex-1 z-0 relative bg-black">
          <Title isFolded={isFolded} />
          <div className="h-full py-2 px-2">
            <Book handleSetIsFolded={setIsFolded} />
          </div>
          <Calendar isFolded={isFolded} />
        </div>
      </div>
    </>
  );
}

function Title({ isFolded }: { isFolded: boolean }) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full flex flex-col items-center pt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: isFolded ? 1 : 0, y: isFolded ? 0 : -150 }}
      transition={slightBounce}
    >
      <h5 className={cn("text-white text-lg", ibmPlexSerif.className)}>
        Thursday, September 4
      </h5>
      <h1 className={cn("text-white text-[2.3rem]", bodoniModa.className)}>
        Browse your dreams
      </h1>
    </motion.div>
  );
}

function Calendar({ isFolded }: { isFolded: boolean }) {
  return (
    <motion.div
      className={cn(
        "h-48 w-[95%] bg-[#2a241e] text-[#EBE3D5] absolute bottom-0 left-0 mx-2 rounded-t-3xl flex flex-col px-5 gap-y-2",
        ibmPlexSerif.className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isFolded ? 1 : 0, y: isFolded ? 60 : 180 }}
      transition={slightBounce}
    >
      <svg
        width="56"
        height="24"
        viewBox="0 0 24 4"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto text-[#403a34]"
      >
        <line
          x1="2"
          y1="2"
          x2="22"
          y2="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between">
        <p className="font-semibold text-base">
          September 2025 <ChevronRight className="inline-block size-5 mb-1" />
        </p>
        <CircleDot />
      </div>
      <div className="flex justify-between text-xs">
        <span className="w-6 flex justify-center">Mon</span>
        <span className="w-6 flex justify-center">Tue</span>
        <span className="w-6 flex justify-center">Wed</span>
        <span className="w-6 flex justify-center">Thu</span>
        <span className="w-6 flex justify-center">Fri</span>
        <span className="w-6 flex justify-center">Sat</span>
        <span className="w-6 flex justify-center">Sun</span>
      </div>
      <div className="flex justify-between text-base">
        <span className="w-6 flex justify-center">1</span>
        <span className="w-6 flex justify-center">2</span>
        <span className="w-6 flex justify-center">3</span>
        <span className="w-6 flex justify-center bg-gray-300/20 rounded-[0.35rem]">
          4
        </span>
        <span className="w-6 flex justify-center">5</span>
        <span className="w-6 flex justify-center">6</span>
        <span className="w-6 flex justify-center">7</span>
      </div>
    </motion.div>
  );
}

function Book({
  handleSetIsFolded,
}: {
  handleSetIsFolded: (isFolded: boolean) => void;
}) {
  const [isLocked, setIsLocked] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [scope, animate] = useAnimate();
  const customEase: Easing = [0.215, 0.61, 0.355, 1];

  function onDragEnd(_event: PointerEvent, info: PanInfo) {
    if (info.offset.y > 80 && !isLocked) {
      setIsLocked(true);
    }
  }

  useEffect(() => {
    if (isLocked) {
      animate(
        scope.current,
        { scale: 0.8, y: 80, height: "70%" },
        { ease: customEase, duration: 0.3, delay: 0.2 }
      ).finished.then(() => {
        setIsFolded(true);
        handleSetIsFolded(true);
      });
    } else {
      animate(
        scope.current,
        { scale: 1, y: 0, height: "100%" },
        { ease: customEase, duration: 0.3, delay: 0.2 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocked]);

  return (
    <motion.div
      ref={scope}
      className={cn("h-full", notoSerif.className)}
      drag={isFolded ? false : "y"}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.8}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={onDragEnd}
      onClick={() => {
        if (isFolded) {
          handleSetIsFolded(false);
          setTimeout(() => {
            setIsFolded(false);
            setIsLocked(false);
          }, 150);
        }
      }}
    >
      {!isFolded ? (
        <div className="h-full bg-[#F3EEEA] rounded-3xl flex flex-col px-6 py-5 text-[#292013]">
          <DateHeader />
          <div className="space-y-5">
            <p>
              In my dream, I found myself walking through a lush forest, the
              leaves whispered secrets as I passed by.
            </p>
            <p>The air was thick with the scent of earth and adventure.</p>
            <p>
              Suddenly, I stumbled upon a hidden pathway, adorned with sparkling
              fairy lights that led me deeper into the woods than I had ever
              imagined.
            </p>
            <p>
              As I ventured further, I encountered friendly woodland creatures
              who shared their wisdom and joy with me.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full perspective-[1500] relative">
          <motion.div
            className="bg-[#2a2014] h-1/2 w-[98%] rounded-t-3xl absolute -top-6 left-1 z-0"
            style={{
              transformOrigin: "bottom",
              boxShadow: "0px 2px 10px 0px rgba(160,148,133,0.5) inset",
            }}
            initial={{ opacity: 0 }}
            animate={{
              rotateX: isFolded ? -20 : 0,
              opacity: isFolded ? 1 : 0,
            }}
            transition={foldingTransition}
          />
          <motion.div
            className="bg-[#B0A695] h-1/2 w-full rounded-t-3xl absolute -top-2 left-0 z-10"
            style={{
              transformOrigin: "bottom",
            }}
            initial={{ opacity: 0 }}
            animate={{
              rotateX: isFolded ? -20 : 0,
              opacity: isFolded ? 1 : 0,
            }}
            transition={foldingTransition}
          />

          <motion.div
            className="h-1/2 bg-[#F3EEEA] rounded-t-3xl flex flex-col px-6 py-5 text-[#292013] z-20 relative"
            style={{
              transformOrigin: "bottom",
              boxShadow: "0px -5px 10px 0px rgba(130,130,130,0.75) inset",
            }}
            animate={{
              rotateX: isFolded ? -20 : 0,
            }}
            transition={foldingTransition}
          >
            <DateHeader />
            <div className="space-y-5">
              <p>
                In my dream, I found myself walking through a lush forest, the
                leaves whispered secrets as I passed by.
              </p>
              <p>The air was thick with the scent of earth and adventure.</p>
              <p>
                Suddenly, I stumbled upon a hidden pathway, adorned with
                sparkling fairy lights
              </p>
            </div>
          </motion.div>
          <motion.div
            className="h-1/2 bg-[#F3EEEA] rounded-b-3xl flex flex-col px-6  text-[#292013] z-20 relative"
            style={{
              transformOrigin: "top",
              boxShadow: "0px 5px 10px 0px rgba(130,130,130,0.75) inset",
            }}
            animate={{
              rotateX: isFolded ? 20 : 0,
            }}
            transition={foldingTransition}
          >
            <div className="space-y-5">
              <p>that led me deeper into the woods than I had ever imagined.</p>
              <p>
                As I ventured further, I encountered friendly woodland creatures
                who shared their wisdom and joy with me.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#B0A695] h-1/2 w-full rounded-b-3xl absolute -bottom-2 left-0 z-10"
            style={{
              transformOrigin: "top",
            }}
            initial={{ opacity: 0 }}
            animate={{
              rotateX: isFolded ? 20 : 0,
              opacity: isFolded ? 1 : 0,
            }}
            transition={foldingTransition}
          />
          <motion.div
            className="bg-[#2a2014] h-1/2 w-[98%] rounded-b-3xl absolute -bottom-6 left-1 z-0"
            style={{
              transformOrigin: "top",
              boxShadow: "0px 2px 10px 0px rgba(160,148,133,0.5) inset",
            }}
            initial={{ opacity: 0 }}
            animate={{
              rotateX: isFolded ? 20 : 0,
              opacity: isFolded ? 1 : 0,
            }}
            transition={foldingTransition}
          />
        </div>
      )}
    </motion.div>
  );
}
const DateHeader = () => {
  return (
    <div className="flex items-center justify-between text-[#776B5D] mb-5">
      <h3 className={cn("text-sm font-semibold ", ibmPlexSerif.className)}>
        Sunday, 4 September 2025
      </h3>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#776B5D] size-5 cursor-pointer"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

const foldingTransition: Transition = {
  type: "spring",
  duration: 0.8,
  bounce: 0.6,
};

const slightBounce: Transition = {
  type: "spring",
  duration: 0.6,
  bounce: 0.4,
};
