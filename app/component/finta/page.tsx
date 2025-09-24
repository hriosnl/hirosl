"use client";

import Image from "next/image";
import { AnimatePresence, Easing, motion } from "motion/react";
import { useState } from "react";

const TXS = [
  {
    buyer: {
      id: 1,
      name: "Aurevia",
      amount: "100,000",
      time: "9:24AM",
    },
    seller: {
      id: 2,
      name: "Velora",
      amount: "100,000",
      time: "9:24AM",
    },
  },
  {
    buyer: {
      id: 3,
      name: "Trivane",
      amount: "2,400",
      time: "4:41PM",
    },
    seller: {
      id: 4,
      name: "Credora",
      amount: "2,400",
      time: "4:41PM",
    },
  },
  {
    buyer: {
      id: 5,
      name: "Solvantis",
      amount: "480,400",
      time: "12:07AM",
    },
    seller: {
      id: 6,
      name: "Lunaris",
      amount: "480,400",
      time: "12:07AM",
    },
  },
];

export default function Transactions() {
  const [isTransacting, setIsTransacting] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

  const createTransaction = () => {
    setIsTransacting(true);
    setTransactionCount((n) => (n + 1) % TXS.length);
  };

  return (
    <div className="w-[22rem] flex flex-col relative min-h-[11.5rem]">
      <AnimatePresence mode="popLayout">
        {isTransacting ? (
          <motion.div
            key={transactionCount}
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
            }}
          >
            <Buyer
              id={TXS[transactionCount].buyer.id}
              name={TXS[transactionCount].buyer.name}
              amount={TXS[transactionCount].buyer.amount}
              time={TXS[transactionCount].buyer.time}
            />
            <div className="w-full px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-[1px] bg-[rgba(15,12,12,0.06)] mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 2.5 }}
              />
            </div>
            <Seller
              id={TXS[transactionCount].seller.id}
              name={TXS[transactionCount].seller.name}
              amount={TXS[transactionCount].seller.amount}
              time={TXS[transactionCount].seller.time}
            />
            <TransactionLoader handleTransacting={setIsTransacting} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        className="w-full h-12 rounded-[9px] bg-[#404040] text-white font-medium absolute -bottom-36 disabled:opacity-50"
        onClick={() => createTransaction()}
        disabled={isTransacting}
        whileTap={{ scale: 0.98 }}
      >
        Transfer Funds
      </motion.button>
    </div>
  );
}

const TransactionLoader = ({
  handleTransacting,
}: {
  handleTransacting: (value: boolean) => void;
}) => {
  const customEase: Easing = [0.33, 1, 0.68, 1];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, filter: "blur(4px)", scale: 0.5 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{
        duration: 0.6,
        ease: customEase,
        delay: 0.5,
      }}
    >
      {/* Outside spinner */}
      <motion.svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        initial={{ opacity: 1, rotate: "0deg" }}
        animate={{ rotate: "360deg", opacity: 0 }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: 1,
          delay: 0.5,
          opacity: {
            delay: 1.8,
            duration: 0.5,
          },
        }}
        // onAnimationComplete={() => handleTransacting(false)}
      >
        <path
          d="M26 51C39.598 51 51 39.598 51 26C51 12.402 39.598 1 26 1"
          stroke="url(#blueGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          // transform="rotate(-180 26 26)"
        />
        <defs>
          <linearGradient
            id="blueGradient"
            x1="26"
            y1="1"
            x2="26"
            y2="51"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity={0.2} />
            <stop offset="1" stopColor="#2679F3" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Arrows */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[3px] shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_0px_2px_0px_rgba(15,12,12,0.10),0px_1px_2px_0px_rgba(15,12,12,0.10)] rounded-full bg-white"
        animate={{ rotate: "270deg" }}
        transition={{ duration: 1, ease: customEase, delay: 2 }}
      >
        <motion.div
          className="size-[40px] rounded-full flex items-center justify-center border-[3px] overflow-hidden"
          initial={{ backgroundColor: "#404040", borderColor: "#0f0c0c" }}
          animate={{ backgroundColor: "#4789f5", borderColor: "#2679F3" }}
          transition={{ duration: 0.6, ease: customEase, delay: 2.8 }}
        >
          <motion.svg
            viewBox="0 0 16 16"
            fill="none"
            className="size-3 mb-1"
            animate={{ y: -100 }}
            transition={{ duration: 1, ease: "easeIn", delay: 2.6 }}
            onAnimationComplete={() => handleTransacting(false)}
          >
            <path
              d="M8 15V1M8 1L2 7M8 1L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <motion.svg
            viewBox="0 0 16 16"
            fill="none"
            className="size-3 mt-1"
            animate={{ y: 100 }}
            transition={{
              y: { duration: 1, ease: "easeIn", delay: 2.6 },
            }}
          >
            <path
              d="M8 1V15M8 15L2 9M8 15L14 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Checkmark */}
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 26 26"
        fill="none"
        className="relative"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: customEase, delay: 2.9 }}
        // onAnimationComplete={() => handleTransacting(false)}
      >
        <circle cx="13" cy="13" r="8" fill="white"></circle>
        <path
          d="M9.75 14.0833L11.9167 16.25L16.25 9.75"
          stroke="#2679F3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </motion.svg>
    </motion.div>
  );
};

const Buyer = ({
  id,
  name,
  amount,
  time,
}: {
  id: number;
  name: string;
  amount: string;
  time: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-50%" }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="overflow-hidden p-2 flex"
    >
      <motion.div
        className="flex-1 flex justify-between items-center px-5 py-4"
        style={{
          boxShadow:
            "0px 8px 12px -4px rgba(15, 12, 12, 0.08), 0px 0px 2px 0px rgba(15, 12, 12, 0.10), 0px 1px 2px 0px rgba(15, 12, 12, 0.10)",
        }}
        initial={{ y: 0, borderRadius: 9 }}
        animate={{
          y: 9,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        transition={{ duration: 0.4, ease: "linear", delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <Image
            src={`/images/logoipsum/logo${id}.svg`}
            alt="logo"
            width={40}
            height={40}
            className="border border-[rgba(15,12,12,0.08)] rounded-full p-1 aspect-square"
          />

          <div className="flex flex-col">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-[rgba(15,12,12,0.50)]">{time}</p>
          </div>
        </div>
        <div className="font-semibold">-${amount}</div>
      </motion.div>
    </motion.div>
  );
};

const Seller = ({
  id,
  name,
  amount,
  time,
}: {
  id: number;
  name: string;
  amount: string;
  time: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "40%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="overflow-hidden p-2 flex"
    >
      <motion.div
        className="flex-1 flex justify-between items-center px-5 py-4"
        style={{
          boxShadow:
            "0px 8px 12px -4px rgba(15, 12, 12, 0.08), 0px 0px 2px 0px rgba(15, 12, 12, 0.10), 0px 1px 2px 0px rgba(15, 12, 12, 0.10)",
        }}
        initial={{ y: 0, borderRadius: 9 }}
        animate={{
          y: -9,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        transition={{ duration: 0.4, ease: "linear", delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <Image
            src={`/images/logoipsum/logo${id}.svg`}
            alt="logo"
            width={40}
            height={40}
            className="border border-[rgba(15,12,12,0.08)] rounded-full p-1 aspect-square"
          />

          <div className="flex flex-col">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-[rgba(15,12,12,0.50)]">{time}</p>
          </div>
        </div>
        <div className="font-semibold text-[#388d80]">${amount}</div>
      </motion.div>
    </motion.div>
  );
};
