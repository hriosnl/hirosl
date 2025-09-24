"use client";

import { motion, Transition } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="size-full flex flex-col justify-center items-center bg-[#FEF9F2]">
      <PaperPlaneWithTrails />
    </div>
  );
}

function PaperPlaneWithTrails() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="relative w-48 h-48">
        <Plane isHovered={isHovered} className="absolute right-0 top-0" />
        <Trail1 isHovered={isHovered} className="absolute bottom-2 left-12" />
        <Trail2 isHovered={isHovered} className="absolute bottom-2 left-5" />
        <Trail3 isHovered={isHovered} className="absolute bottom-7 left-6" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-normal mt-5">
        Welcome to Pupin Mail
      </h1>
      <h3 className="text-xl sm:text-3xl mt-2 text-black/80">
        Connnect with hello@pupinmail.com
      </h3>
      <motion.button
        className="px-8 py-4 mt-5 flex items-center bg-white hover:bg-[#FEF9F2] rounded-lg font-mono text-xl border border-gray-700/5 shadow-2xs"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src="/images/google-logo.png"
          alt="google logo"
          width={24}
          height={24}
          className="mr-2"
        />
        Connect to Google
      </motion.button>
    </div>
  );
}

const transition: Transition = {
  duration: 0.4,
  ease: "easeInOut",
};

const floatingTransition: Transition = {
  duration: 2.4,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Plane = ({
  isHovered,
  className,
}: {
  isHovered: boolean;
  className?: string;
}) => {
  return (
    <motion.svg
      className={className}
      width="158"
      height="148"
      viewBox="0 0 317 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isHovered ? { y: [0, -30, 0] } : { y: 0 }}
      transition={isHovered ? floatingTransition : transition}
    >
      <path
        d="M16.1447 112.848C5.6446 117.848 7.64465 121.848 16.1447 129.848C24.6447 137.848 167.645 268.348 178.645 277.348C189.645 286.348 196.645 290.348 204.145 272.848C211.645 255.348 303.145 35.3483 306.645 25.8482C310.145 16.3481 306.145 4.3482 285.645 10.8482C265.145 17.3482 26.6447 107.848 16.1447 112.848Z"
        stroke="black"
        strokeWidth="18"
      />
      <path
        d="M77.7305 172.659C75.2246 174.401 73.5556 177.048 73.1301 180.07C72.7022 183.088 73.5529 186.234 75.4553 188.762C77.3577 191.291 80.1447 192.98 83.1635 193.405C86.1847 193.833 89.1903 192.963 91.5588 191.037C94.0785 188.992 96.5981 186.946 99.1178 184.9C144.471 148.077 189.825 111.254 235.179 74.4313C237.698 72.3856 240.218 70.3399 242.737 68.2942C243.593 67.5984 244.143 66.5709 244.28 65.4566C244.416 64.3412 244.129 63.2303 243.466 62.3493C242.803 61.4684 241.815 60.884 240.706 60.7059C239.597 60.5288 238.457 60.7724 237.552 61.4021C234.888 63.2564 232.224 65.1107 229.561 66.965C181.614 100.342 133.668 133.719 85.7215 167.096C83.0579 168.95 80.3942 170.805 77.7305 172.659Z"
        fill="black"
      />
      <path
        d="M68.1447 180.348L83.1447 279.348C83.1447 279.348 87.6447 290.348 96.6447 279.348C105.645 268.348 127.645 240.848 127.645 240.848L68.1447 180.348Z"
        fill="#070707"
        stroke="black"
        strokeWidth="23"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

const Trail1 = ({
  isHovered,
  className,
}: {
  isHovered: boolean;
  className?: string;
}) => {
  return (
    <motion.svg
      className={className}
      width="37"
      height="26"
      viewBox="0 0 74 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isHovered ? { y: [0, -30, 0] } : { y: 0 }}
      transition={isHovered ? floatingTransition : transition}
    >
      <defs>
        <clipPath id="trail1-clip">
          <motion.rect
            y="0"
            height="52"
            width="74"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 0 : 74 }}
            transition={transition}
          />
        </clipPath>
      </defs>
      <path
        clipPath="url(#trail1-clip)"
        d="M65.7085 8.95288C63.562 10.7112 60.4277 12.6694 57.9754 13.8485C54.8062 15.3723 52.1948 16.7859 49.7426 18.259C47.1332 19.8264 44.1618 20.5142 41.6067 21.7873C39.129 23.0219 36.3171 24.0426 33.9619 25.4128C30.6261 27.3534 26.32 29.7233 23.9648 31.1963C21.4007 32.8001 18.0871 34.8159 15.732 36.5859C13.3768 38.1561 11.8066 39.5263 10.9275 40.6994C10.4365 41.2904 9.85427 41.8726 8.66638 43.0605"
        stroke="black"
        strokeLinecap="round"
        strokeWidth={16}
        fill="none"
      />
    </motion.svg>
  );
};

const Trail2 = ({
  isHovered,
  className,
}: {
  isHovered: boolean;
  className?: string;
}) => {
  return (
    <motion.svg
      className={className}
      width="42"
      height="31"
      viewBox="0 0 84 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isHovered ? { y: [0, -35, 0] } : { y: 0 }}
      transition={isHovered ? floatingTransition : transition}
    >
      <defs>
        <clipPath id="trail2-clip">
          <motion.rect
            y="0"
            height="62"
            width="84"
            initial={{ x: 84 }}
            animate={{ x: isHovered ? 0 : 84 }}
            transition={transition}
          />
        </clipPath>
      </defs>
      <path
        clipPath="url(#trail2-clip)"
        d="M75.0754 8.13477C70.3768 11.2691 67.6423 12.8275 63.0377 16.1589C59.4384 18.763 55.881 21.0604 53.2289 22.3424C49.8705 23.9657 46.8601 26.1648 44.505 27.4379C41.3866 29.1236 37.4511 31.4573 32.6555 33.7067C28.5683 35.6237 23.5376 38.9022 20.9825 40.8634C18.8198 42.5233 16.2809 44.1948 13.5346 46.8381C11.5705 49.2933 10.0004 51.0575 9.31529 52.2306C9.01832 52.8216 8.82426 53.4038 8.03625 54.0036"
        stroke="black"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
};

const Trail3 = ({
  isHovered,
  className,
}: {
  isHovered: boolean;
  className?: string;
}) => {
  return (
    <motion.svg
      className={className}
      width="36.5"
      height="25"
      viewBox="0 0 73 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isHovered ? { y: [0, -40, 0] } : { y: 0 }}
      transition={isHovered ? floatingTransition : transition}
    >
      <defs>
        <clipPath id="trail3-clip">
          <motion.rect
            y="0"
            height="50"
            width="73"
            initial={{ x: 73 }}
            animate={{ x: isHovered ? 0 : 73 }}
            transition={transition}
          />
        </clipPath>
      </defs>
      <path
        clipPath="url(#trail3-clip)"
        d="M64.4873 8.44214C62.729 9.81232 60.3827 10.9826 57.7364 12.6497C53.8347 15.1078 49.8093 17.2513 46.7572 19.1184C43.6239 21.0352 40.9766 22.7438 38.0363 24.2169C34.6198 25.9286 30.9795 27.6483 28.1392 29.2125C23.3692 31.8394 20.5943 33.3289 17.9422 34.8991C15.096 36.6633 12.7496 38.2334 10.3944 40.0917C9.80339 40.5856 9.22121 40.9738 8.03333 41.9617"
        stroke="black"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
};
