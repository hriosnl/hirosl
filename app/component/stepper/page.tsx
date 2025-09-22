"use client";

import { useState } from "react";
import { AnimatePresence, motion, Transition } from "motion/react";
import { cn } from "@/lib/utils";
import BackHome from "@/components/ui/BackHome";

export default function Page() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <BackHome />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const springTransition: Transition = {
    type: "spring",
    bounce: 0.4,
    duration: 0.4,
  };

  return (
    <div className="flex flex-col items-center gap-y-12 w-[22rem] sm:w-96">
      <div className="relative w-fit">
        <motion.div
          className="bg-[#5EC55E] absolute rounded-full size-9"
          animate={{
            width: step * 36,
          }}
          transition={springTransition}
        />
        <div className="flex relative">
          <span className="size-3 m-3 bg-white rounded-full" />
          <span
            className={cn(
              "size-3 m-3 bg-[#DDD] rounded-full",
              step >= 2 && "bg-white"
            )}
          />
          <span
            className={cn(
              "size-3 m-3 bg-[#DDD] rounded-full",
              step == 3 && "bg-white"
            )}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <AnimatePresence mode="popLayout">
          {step > 1 && (
            <motion.button
              onClick={() => setStep(step - 1)}
              className="bg-[#F7F7F7] font-medium rounded-full px-7 py-4 mr-2"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -150, opacity: 0 }}
              transition={springTransition}
            >
              Back
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => {
            if (step < 3) setStep(step + 1);
          }}
          className="bg-[#0C75FA] text-white font-semibold rounded-full px-6 py-4 w-full flex justify-center items-center gap-x-2"
          animate={{
            width: step > 1 ? "72%" : "100%",
          }}
          transition={{
            type: "spring",
            bounce: 0.4,
            duration: 0.3,
          }}
        >
          {step !== 3 ? (
            <span>Continue</span>
          ) : (
            <>
              <motion.span
                className="inline-block bg-white rounded-full size-5 p-1"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C75FA"
                  strokeWidth="3"
                >
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </motion.span>
              <span>Finish</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
