"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import useTimePeriod from "@/hooks/useTimePeriod";
import LowPolyPortrait from "@/components/LowPolyPortrait";
import ImageStack from "@/components/ImageStack";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

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
\n
For the SVG portrait idea: http://www.artist-developer.com/
\n
Hello W🌏RLD!
\n
`;

    console.log(credits);
  }, []);

  return (
    <div className="flex flex-col items-center py-10 mx-auto text-lg">
      <main className="sm:w-[564px] p-6 sm:p-10 sm:shadow-[inset_0_1px_2px_#00000040] rounded-3xl flex flex-col">
        <div className="relative">
          {/* <div className="size-80 bg-[hsl(0,0%,70%)] rounded-full absolute hidden sm:block sm:left-[80px] -top-4" /> */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-80 bg-[hsl(0,0%,70%)] rounded-full relative -top-[27px]" />
          </div>
          <LowPolyPortrait className="relative mx-auto" />
        </div>
        <p className={cn("self-center text-2xl mt-2", sourceCodePro.className)}>
          Hi, I'm Hiro
        </p>
        <p className="mt-7">
          I'm a design engineer. I help founders turn ideas into polished
          experiences without sacrificing speed or quality.
        </p>
        <div className="flex flex-col gap-y-7 sm:flex-row justify-between mt-7 opacity-80">
          <div>
            <p>
              <a
                href="https://x.com/messages/compose?recipient_id=1482692177340035075"
                target="_blank"
                className="link"
              >
                x.com/@hriosnl
              </a>
            </p>
            <p>
              <a href="mailto:hriosnl@gmail.com" className="link">
                hriosnl@gmail.com
              </a>
            </p>
          </div>
          <div>
            <p>UTC+8</p>
            <p>{timePeriod}</p>
          </div>
        </div>
      </main>

      <div className="h-10 sm:h-20" />

      {/* Components */}
      <section
        id="components"
        className="max-w-[1146px] flex flex-col sm:w-[564px] lg:w-full lg:grid lg:grid-cols-3 gap-10 px-4 sm:px-0"
      >
        {/* 1st Grid */}
        <div className="flex flex-col gap-y-10">
          <ComponentContainer href="/notion" className="bg-[#fef9f2]">
            <ScreenRecord name="pupinmail.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/dynamic-toggle">
            <ScreenRecord name="dynamic-toggle.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/cred">
            <ScreenRecord name="cred.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/dog-avatar">
            <ScreenRecord name="dog-avatar.mp4" />
          </ComponentContainer>
        </div>

        {/* 2nd Grid */}
        <div className="flex flex-col gap-y-10 mt-10">
          <ComponentContainer href="/yume">
            <ScreenRecord name="yume-long.mp4" />
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

          <ComponentContainer href="/joi">
            <ScreenRecord name="draggable-calendar.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/password-reveal" className="bg-[#58A0C8]">
            <ScreenRecord name="password-reveal.mp4" />
          </ComponentContainer>

          <ComponentContainer href="/popup-card">
            <ScreenRecord name="popup-card.mp4" />
          </ComponentContainer>

          {/* <ComponentContainer href="/nutrition-calculator">
            <ScreenRecord name="nutrition-calculator.mp4" />
          </ComponentContainer> */}
        </div>
      </section>

      <div className="h-14 sm:h-32" />

      {/* Writing */}
      <section className="sm:w-[564px] px-4 sm:px-0">
        <h1 className="font-semibold p-3">Writing</h1>
        <WritingItem
          href="/writing/the-easiest-way-to-copy-animation-timing"
          title="The Easiest Way To Copy Animation Timing"
          subtitle="It isn’t math—it’s music"
        />
        <WritingItem
          href="#"
          title="Lorem Ipsum"
          subtitle="Dolor sit amet consectetur adipiscing elit"
        />
      </section>

      <div className="h-14 sm:h-32" />

      {/* Footer */}
      <div className="w-full border-t border-t-[#E9E9E9] sm:px-0" />
      <footer className="w-full max-w-[1146px] flex flex-col sm:flex-row justify-between text-base pt-10 px-6">
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
        <p className="flex items-end mt-5 sm:mt-0">{timePeriod}</p>
      </footer>
    </div>
  );
}

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
    // <Link href={href}>
    <div
      className={cn(
        // "p-10 border border-[#E9E9E9] bg-white rounded-3xl sm:mx-0 transition-shadow duration-300 ease-in-out hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]",
        "p-10 border border-[#E9E9E9] bg-white rounded-3xl sm:mx-0",
        className
      )}
    >
      {children}
    </div>
    // </Link>
  );
};

const WritingItem = ({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <Link href={href}>
      <div className="p-3 rounded-lg hover:bg-[#f9f9f9] cursor-pointer">
        <p>{title}</p>
        <p className="opacity-70">{subtitle}</p>
      </div>
    </Link>
  );
};
