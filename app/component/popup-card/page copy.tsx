"use client";

import BackHome from "@/components/ui/BackHome";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <div className="h-screen flex flex-col bg-[#FEF9F2]">
      <BackHome />

      <div className="flex items-center justify-center h-screen">
        <PopupCard />
      </div>
    </div>
  );
}

function PopupCard() {
  const [isHovering, setIsHovering] = useState<null | number>(null);

  return (
    <div className="flex flex-col size-96 bg-black text-white tracking-tight rounded-[80px] pl-12 pt-12 relative overflow-hidden">
      <p className="text-3xl">In the Galleries</p>
      <p className="text-3xl">
        <span className="opacity-50">at</span> Lyren{" "}
        <span className="opacity-50">this</span> August
      </p>
      <p className="text-3xl mt-5">
        <span className="opacity-50">Tickets at</span> $50
      </p>
      <div className="relative flex-1 mt-5">
        <motion.div
          className="absolute shadow-lg"
          style={{
            top: "39%",
            left: "-2%",
            scale: 0.8,
            // top: "42%",
            // left: "6%",
          }}
          onMouseEnter={() => setIsHovering(1)}
          onMouseLeave={() => setIsHovering(null)}
          whileHover={{
            rotate: "0deg",
          }}
          animate={{
            rotate: "-26deg",
            // y: isHovering !== 1 && isHovering !== null ? 20 : 0,
          }}
        >
          <Image
            src="/images/posters/environmental-pollution.webp"
            width={200}
            height={283}
            alt="Environmental Pollution"
            className="rounded-4xl"
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "13%",
            left: "17%",
            scale: 0.9,
            // top: "18%",
            // left: "19%",
          }}
          onMouseEnter={() => setIsHovering(2)}
          onMouseLeave={() => setIsHovering(null)}
          whileHover={{
            rotate: "0deg",
          }}
          animate={{
            rotate: "-18deg",
            x: isHovering !== 2 && isHovering !== null ? 100 : 0,
          }}
        >
          <Image
            src="/images/posters/the-letter-s.webp"
            width={200}
            height={200}
            alt="The Letter S"
            className="rounded-4xl"
          />
        </motion.div>

        <motion.div
          className="absolute shadow-2xl"
          style={{
            right: "1%",
            top: "0%",
          }}
          // onMouseEnter={() => setIsHovering(3)}
          // onMouseLeave={() => setIsHovering(null)}
          whileHover={{
            rotate: "0deg",
          }}
          animate={{
            rotate: "-8deg",
            // opacity: isHovering !== 3 && isHovering !== null ? 0.25 : 1,
            x: isHovering !== 3 && isHovering !== null ? 100 : 0,
          }}
        >
          <Image
            src="/images/posters/victory.webp"
            width={200}
            height={283}
            alt="Victory"
            className="rounded-4xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
