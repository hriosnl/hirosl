"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Source_Code_Pro } from "next/font/google";
import Link from "next/link";
import LowPolyPortrait from "@/components/LowPolyPortrait";
import useTimePeriod from "@/hooks/useTimePeriod";
import useBreakpoint from "@/hooks/useBreakpoint";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function Home() {
  const timePeriod = useTimePeriod();
  const isXS = useBreakpoint("xs");

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
          Hi, I&apos;m Hiro
        </p>
        <p className="mt-7">
          I&rsquo;m a design engineer. I help people turn ideas into polished
          experiences without sacrificing speed or quality.
        </p>
        <div className="flex flex-col gap-y-7 sm:flex-row justify-between mt-7 opacity-80">
          <div>
            <p>
              <a
                href="https://x.com/messages/compose?recipient_id=1482692177340035075"
                target="_blank"
                rel="noopener noreferrer"
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
            <ScreenRecord name="pupinmail" />
          </ComponentContainer>

          <ComponentContainer href="/dynamic-toggle">
            <ScreenRecord name="dynamic-toggle" />
          </ComponentContainer>

          <ComponentContainer href={!isXS ? "/cred" : null}>
            <ScreenRecord name="cred" />
          </ComponentContainer>

          <ComponentContainer href="/dog-avatar">
            <ScreenRecord name="dog-avatar" />
          </ComponentContainer>
        </div>

        {/* 2nd Grid */}
        <div className="flex flex-col gap-y-10 mt-10">
          <ComponentContainer href={!isXS ? "/yume" : null}>
            <ScreenRecord name="yume" />
          </ComponentContainer>

          <ComponentContainer href="/password-reveal" className="bg-[#589fc6]">
            <ScreenRecord name="password-reveal" />
          </ComponentContainer>

          <ComponentContainer href={!isXS ? "/alltrails" : null}>
            <ScreenRecord name="trails" />
          </ComponentContainer>
        </div>

        {/* 3rd Grid */}
        <div className="flex flex-col gap-y-10">
          <ComponentContainer href="/finta">
            <ScreenRecord name="transactions" />
          </ComponentContainer>

          <ComponentContainer href={!isXS ? "/joi" : null}>
            <ScreenRecord name="draggable-calendar" />
          </ComponentContainer>

          <ComponentContainer href="/stepper">
            <ScreenRecord name="steps" />
          </ComponentContainer>

          <ComponentContainer href="/popup-card">
            <ScreenRecord name="popup-card" />
          </ComponentContainer>

          {/* <ComponentContainer href="/nutrition-calculator">
            <ScreenRecord name="nutrition-calculator" />
          </ComponentContainer> */}
        </div>
      </section>

      <div className="h-14 sm:h-32" />

      {/* Writing */}
      <section id="writing" className="sm:w-[564px] px-4 sm:px-0">
        <h1 className="font-semibold p-3">Writing</h1>
        <WritingItem
          href="/writing/the-easiest-way-to-copy-animation-timing"
          title="The Easiest Way To Copy Animation Timing"
          subtitle="Hint: it isn’t math, it’s rhythm"
        />
      </section>

      <div className="h-14 sm:h-32" />

      {/* Footer */}
      <div className="w-full border-t border-t-[#E9E9E9] sm:px-0" />
      <footer className="w-full max-w-[1146px] flex flex-col sm:flex-row justify-between text-base pt-10 px-6">
        <div className="flex flex-col sm:flex-row gap-x-10">
          <p>
            <a
              href="https://x.com/hriosnl"
              target="_blank"
              rel="noopener noreferrer"
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
        <p className="flex items-end mt-5 sm:mt-0">{timePeriod}</p>
      </footer>
    </div>
  );
}

const ScreenRecord = ({ name }: { name: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      width="800"
      poster={`/images/thumbnails/${name}.png`}
      autoPlay
      muted
      playsInline
      loop
    >
      {isVisible && <source src={`/videos/${name}.mp4`} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

const ComponentContainer = ({
  href,
  className,
  children,
}: {
  href: string | null;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={!href ? "/component/not-available" : `/component/${href}`}>
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
