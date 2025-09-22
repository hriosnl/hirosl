"use client";

import BackHome from "@/components/ui/BackHome";
import { motion, MotionConfig, Transition } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <BackHome />

      <div className="flex items-center justify-center h-full">
        <PopupCard />
      </div>
    </div>
  );
}

function PopupCard() {
  const transitionOptions: Transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  return (
    <MotionConfig>
      <div className="flex flex-col size-96 bg-black text-white tracking-tight rounded-[80px] pl-12 pt-12 relative overflow-hidden">
        <p className="text-3xl">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions }}
          >
            In
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.15 }}
          >
            the
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.3 }}
          >
            Galleries
          </motion.span>
        </p>
        <p className="text-3xl">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.45 }}
          >
            at
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.6 }}
          >
            Bouvre
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.75 }}
          >
            this
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions, delay: 0.9 }}
          >
            August
          </motion.span>
        </p>
        <p className="text-[1.7rem] mt-5">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ ...transitionOptions, delay: 1.05 }}
          >
            Tickets
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ ...transitionOptions, delay: 1.2 }}
          >
            at
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionOptions, delay: 1.35 }}
          >
            $50
          </motion.span>
        </p>

        <div className="relative flex-1 mt-5">
          <motion.div
            className="absolute"
            style={{
              top: "39%",
              left: "-2%",
              scale: 0.8,
            }}
            initial={{
              rotate: "0deg",
              y: 200,
            }}
            animate={{
              rotate: "-26deg",
              y: 0,
            }}
            transition={{
              y: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 2.5,
                delay: 2.4,
              },

              rotate: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 2.6,
              },
            }}
          >
            <Image
              src={POSTERS[0].src}
              alt={POSTERS[0].alt}
              width={200}
              height={283}
              className="rounded-4xl"
            />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              top: "13%",
              left: "17%",
              scale: 0.9,
            }}
            initial={{
              rotate: "5deg",
              y: 200,
            }}
            animate={{
              rotate: "-18deg",
              y: 0,
            }}
            transition={{
              y: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 2,
                delay: 2,
              },

              rotate: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 2.2,
              },
            }}
          >
            <Image
              src={POSTERS[1].src}
              alt={POSTERS[1].alt}
              width={200}
              height={200}
              className="rounded-4xl"
            />
          </motion.div>

          <motion.div
            className="absolute shadow-2xl"
            style={{
              right: "1%",
              top: "0%",
            }}
            initial={{
              rotate: "10deg",
              y: 200,
            }}
            animate={{
              rotate: "-8deg",
              y: 0,
            }}
            transition={{
              y: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 2,
                delay: 1.6,
              },

              rotate: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 1.8,
              },
            }}
          >
            <Image
              src={POSTERS[2].src}
              alt={POSTERS[2].alt}
              width={200}
              height={283}
              className="rounded-4xl"
            />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}

const POSTERS = [
  {
    src: "/images/posters/environmental-pollution.webp",
    alt: "Environmental Pollution",
  },
  {
    src: "/images/posters/the-letter-s.webp",
    alt: "The Letter S",
  },
  {
    src: "/images/posters/victory.webp",
    alt: "Victory",
  },
];

// https://i.pinimg.com/736x/a7/54/f2/a754f201be49c9f5755dda5fd91bee65.jpg
// https://i.pinimg.com/736x/52/1f/ed/521fedec70e3f21a08056f2e0063247f.jpg
// https://www.irancartoon.com/site/media/zartists/ed2456ab6b147e665b1ff71d3d3e6df2/shigeo-fukuda-japan-18.jpg
