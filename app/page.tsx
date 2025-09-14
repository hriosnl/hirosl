"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import useTimePeriod from "@/hooks/useTimePeriod";
import LowPolyPortrait from "@/components/LowPolyPortrait";
import ImageStack from "@/components/ImageStack";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function Home() {
  const timePeriod = useTimePeriod();

  useEffect(() => {
    let credits = `
▄▄▄▖▗▖ ▗▖ ▗▄▖ ▗▖  ▗▖▗▖ ▗▖ ▗▄▄▖
 █  ▐▌ ▐▌▐▌ ▐▌▐▛▚▖▐▌▐▌▗▞▘▐▌
 █  ▐▛▀▜▌▐▛▀▜▌▐▌ ▝▜▌▐▛▚▖  ▝▀▚▖
 █  ▐▌ ▐▌▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▗▄▄▞▘
`;

    credits += `
For my design inspirations:
- https://www.baked.design/
- http://www.artist-developer.com/


Hello 🌏!
\n
`;

    console.log(credits);
  }, []);

  return (
    <div className="flex flex-col items-center py-10 mx-auto text-lg">
      <main className=" sm:w-[564px] p-10 sm:shadow-[inset_0_1px_2px_#00000040] rounded-3xl flex flex-col gap-y-2">
        <div className="relative">
          <div className="size-80 bg-[#f5f5f5] rounded-full absolute sm:left-[80px] -top-4" />
          <LowPolyPortrait className="relative mx-auto" />
        </div>
        <p className={cn("self-center text-2xl", geistMono.className)}>
          Hi, I'm Hiro
        </p>
        <p className="mt-7">
          I am a design engineer. I build things that brings me joy, hoping that
          joy carries over to others.
        </p>
        <div className="flex justify-between mt-7">
          <div>
            <p>
              <a href="mailto:hriosnl@gmail.com" className="link">
                hriosnl@gmail.com
              </a>
            </p>
            <p>
              <a href="https://x.com/hriosnl" target="_blank" className="link">
                x.com/@hriosnl
              </a>
            </p>
          </div>
          <div>
            <p>UTC+8</p>
            <p>{timePeriod}</p>
          </div>
        </div>
      </main>

      <div className="h-20" />

      {/* Components */}
      <section
        id="components"
        className="max-w-[1146px] flex flex-col sm:w-[400px] lg:w-full lg:grid lg:grid-cols-3 gap-10 px-4"
      >
        {/* 1st Grid */}
        <div className="flex flex-col gap-y-10">
          <ComponentContainer href="/notion" className="bg-[#fef9f2]">
            <ScreenRecord name="pupinmail.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/dynamic-toggle">
            <ScreenRecord name="dynamic-toggle.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/yume">
            <ScreenRecord name="yume.mp4" />
          </ComponentContainer>
        </div>

        {/* 2nd Grid */}
        <div className="flex flex-col gap-y-10 mt-10">
          <ComponentContainer href="/cred">
            <ScreenRecord name="cred.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/stepper">
            <ScreenRecord name="steps.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/alltrails">
            <ScreenRecord name="trails.mp4" />
          </ComponentContainer>
        </div>

        {/* 3rd Grid */}
        <div className="flex flex-col gap-y-10">
          <ComponentContainer href="/finta">
            <ScreenRecord name="transactions.mp4" />
          </ComponentContainer>

          {/* <ComponentContainer className="bg-[#171717]">
            <ImageStack />
          </ComponentContainer> */}

          <ComponentContainer href="/joi">
            <ScreenRecord name="draggable-calendar.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/password-reveal" className="bg-[#58a0c8]">
            <ScreenRecord name="password-reveal.mp4" />
          </ComponentContainer>
        </div>
      </section>

      <div className="h-32" />

      {/* Writing */}
      <section className="sm:w-[564px] space-y-5 px-4 sm:px-0">
        <h1 className="font-semibold p-3">Writing</h1>
        <div className="p-3 rounded-lg hover:bg-[#f9f9f9] cursor-pointer">
          <p>Designing Motion the Mind Believes</p>
          <p className="opacity-70">
            Why some motion is trustworthy and some are not
          </p>
        </div>
        <div className="p-3 rounded-lg hover:bg-[#f9f9f9] cursor-pointer">
          <p>What's the deal with will-change</p>
          <p className="opacity-70">What is it and when to use it</p>
        </div>
      </section>

      <div className="h-32" />

      <footer className="w-full sm:w-[1146px] flex justify-between text-base border-t border-t-[#E9E9E9] pt-10 px-6 sm:px-0">
        <div className="flex flex-col sm:flex-row gap-x-10">
          <p>
            <a href="mailto:hriosnl@gmail.com" className="link">
              hriosnl@gmail.com
            </a>
          </p>
          <p>
            <a href="https://x.com/hriosnl" target="_blank" className="link">
              x.com/@hriosnl
            </a>
          </p>
        </div>
        <p className="flex items-end">{timePeriod}</p>
      </footer>
    </div>
  );
}

const Screenshot = ({ name }: { name: string }) => {
  return (
    <Image
      src={`/screenshots/${name}.png`}
      alt={name}
      width={320}
      height={240}
    />
  );
};

const ScreenRecord = ({ name }: { name: string }) => {
  return (
    <video width="800" preload="none" autoPlay muted playsInline loop>
      <source src={`/videos/${name}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const ComponentContainer = ({
  href = "#",
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "p-10 border border-[#E9E9E9] bg-white rounded-3xl sm:mx-0 transition-shadow duration-300 ease-in-out hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]",
          className
        )}
      >
        {children}
      </div>
    </Link>
  );
};
