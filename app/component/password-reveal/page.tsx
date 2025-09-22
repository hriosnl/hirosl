"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { Geist } from "next/font/google";
import BackHome from "@/components/ui/BackHome";

const geist = Geist({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className={`h-screen flex flex-col ${geist.className}`}>
      <BackHome />

      <div className="flex items-center justify-center h-screen">
        <ShowHidePassword />
      </div>
    </div>
  );
}

function ShowHidePassword() {
  const [password, setPassword] = useState("Pupin123");
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flex items-center justify-center w-[800px] h-[400px] rounded-3xl bg-[#58A0C8]">
      <div className="flex flex-col w-96 relative">
        <motion.div className="relative left-0 flex items-center w-full">
          <Lock className="absolute left-6 text-white" size={20} />
          <input
            type="password"
            value={password}
            minLength={6}
            maxLength={12}
            className="bg-[#113F67] text-[#5EABD6] rounded-lg px-16 py-6 text-xl focus:outline-2 focus:outline-white focus:outline-offset-2 tracking-[0.32em] placeholder:tracking-normal"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-8 text-[#5EABD6] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => setIsRevealed(true)}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scaleY: !isRevealed ? [1, 1.3, 1] : 1 }}
              transition={{
                ease: [0.18, 0.89, 0.32, 1.27],
                duration: 0.3,
                delay: 0.3,
              }}
            >
              <EyeClosed size={20} className="pt-0.5" />
            </motion.div>
          </button>
        </motion.div>

        <motion.div
          className="absolute flex items-center w-full"
          initial={{ clipPath: "ellipse(0px 0px at calc(100% - 46px) 50%)" }}
          animate={{
            clipPath: isRevealed
              ? "ellipse(400px 200px at calc(100% - 46px) 50%)"
              : "ellipse(0px 0px at calc(100% - 46px) 50%)",
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Lock className="absolute left-6 text-[#113F67]" size={20} />
          <input
            type="text"
            value={password}
            minLength={6}
            maxLength={12}
            className="bg-white text-[#4682A9] rounded-lg px-16  py-6 text-xl focus:outline-2 focus:outline-white focus:outline-offset-2 tracking-widest placeholder:tracking-normal"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-8 text-[#5EABD6] bg-white rounded-full p-1 cursor-pointer"
            onClick={() => setIsRevealed(false)}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scaleY: isRevealed ? [1, 1.3, 1] : 1 }}
              transition={{
                ease: [0.18, 0.89, 0.32, 1.27],
                duration: 0.3,
                delay: 0.2,
              }}
            >
              <Eye size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
