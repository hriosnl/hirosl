"use client";

import { cn } from "@/lib/utils";
import { Iphone } from "@zuude-ui/ios-mockups";
import { Check, SquareCheck, CalendarDays } from "lucide-react";
import { motion, PanInfo } from "motion/react";
import { useState } from "react";

export default function Page() {
  return (
    <>
      <Iphone size="md" color="natural-titanium" className="hidden sm:block">
        <DraggableCalendar />
      </Iphone>
      <div className="size-full max-w-[400px] max-h-[800px] sm:hidden">
        <DraggableCalendar />
      </div>
    </>
  );
}

function DraggableCalendar() {
  const [collapsed, setCollapsed] = useState(false);

  function onDragEnd(_event: PointerEvent, info: PanInfo) {
    if (info.offset.y > 50) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }

  return (
    <div className="pt-20 sm:pt-32 overflow-hidden relative h-full">
      <Header isCollapsed={collapsed} />

      <div className="bg-black size-full absolute top-0 left-0 z-10 pt-40 sm:pt-52">
        <div className="flex flex-col">
          <Summary isCollapsed={collapsed} />
        </div>
      </div>

      <motion.div
        drag={collapsed ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={onDragEnd}
        whileDrag={{ cursor: "grabbing" }}
        animate={{
          y: collapsed ? "83%" : "0%",
          paddingTop: collapsed ? "2rem" : "13rem",
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 700,
          damping: 50,
        }}
        onClick={() => setCollapsed(false)}
        className="bg-white size-full sm:rounded-4xl absolute top-0 left-0 z-10"
      >
        <div className="flex flex-col gap-8">
          <Week />
          <List />
        </div>
      </motion.div>
    </div>
  );
}

const Header = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div className="z-50 absolute w-full">
      <div className="flex justify-between items-start px-6">
        <div className="flex items-center gap-3">
          <motion.h1
            className={cn("text-5xl sm:text-6xl font-semibold")}
            animate={{
              color: isCollapsed ? "#ffffff" : "#0b0e0a",
            }}
          >
            Fri
          </motion.h1>
          <svg
            className="size-4 sm:size-6 text-[#B87C4C]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="text-right flex flex-col text-xl sm:text-2xl font-semibold text-[#606c5d]">
          <motion.h4
            className=""
            animate={{
              opacity: isCollapsed ? 1 : 0.6,
            }}
          >
            August 5
          </motion.h4>
          <motion.h4
            className="leading-4 sm:leading-6"
            animate={{
              opacity: isCollapsed ? 0.8 : 0.4,
            }}
          >
            2025
          </motion.h4>
        </div>
      </div>
    </div>
  );
};

const Week = () => {
  return (
    <div className="flex justify-between items-center px-6">
      <Date date={3} day="Sun" />
      <Date date={4} day="Mon" />
      <Date date={5} day="Tue" isToday />
      <Date date={6} day="Wed" />
      <Date date={7} day="Thu" />
      <Date date={8} day="Fri" />
      <Date date={9} day="Sat" />
    </div>
  );
};
const Date = ({
  date,
  day,
  isToday,
}: {
  date: number;
  day: string;
  isToday?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-2 sm:p-3",
        isToday && "border border-[#f8e4d6] rounded-lg sm:rounded-xl"
      )}
    >
      <h3
        className={cn(
          "text-xl sm:text-2xl font-semibold text-[#4e5c4a]/30",
          isToday && "text-[#0b0e0a]"
        )}
      >
        {date}
      </h3>
      <p
        className={cn(
          "uppercase text-[0.5rem] sm:text-[0.65rem] font-semibold text-gray-400/85",
          isToday && "text-[#B87C4C]"
        )}
      >
        {day}
      </p>
    </div>
  );
};

const List = () => {
  return (
    <div>
      <div className="h-[1px] border-t border-[#ede7e2] border-dashed" />
      <div className="flex flex-col px-6">
        <EventItem title="Meeting with Edmond" time="10:00 AM" isDone />
        <EventItem title="Dinner with Hachi" time="6:30 PM" />
        <TodoItem title="Breakfast" isDone />
        <TodoItem title="Exercise" />
        <TodoItem title="Buy dog food" />
        <TodoItem title="Read a book" />
      </div>
    </div>
  );
};
const TodoItem = ({ title, isDone }: { title: string; isDone?: boolean }) => {
  return (
    <>
      <div className="flex items-center gap-3 my-4 sm:my-5">
        <div className="flex items-center justify-center border border-dashed rounded-md text-[#4e5c4a]/60 size-4 sm:size-6">
          {isDone ? <Check className="size-3 sm:size-4 text-[#4e5c4a]" /> : " "}
        </div>
        <p
          className={cn(
            "font-semibold sm:text-lg",
            isDone ? "line-through text-[#4e5c4a]/60" : "text-black"
          )}
        >
          {title}
        </p>
      </div>
      <div className="h-[1px] border-t border-[#ede7e2] border-dashed" />
    </>
  );
};

const EventItem = ({
  title,
  time,
  isDone,
}: {
  title: string;
  time: string;
  isDone?: boolean;
}) => {
  return (
    <>
      <div className="flex items-center gap-3 my-4 sm:my-5">
        <CalendarDays className="size-4 sm:size-6 text-[#4e5c4a]/50" />
        <div className="flex justify-between items-baseline w-full">
          <span
            className={cn(
              "font-semibold sm:text-lg",
              isDone ? "line-through text-[#4e5c4a]/60" : "text-black"
            )}
          >
            {title}
          </span>
          <span className="text-[#4e5c4a]/50 font-normal text-sm sm:text-base">
            {time}
          </span>
        </div>
      </div>
      <div className="h-[1px] border-t border-[#ede7e2] border-dashed" />
    </>
  );
};

const Summary = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <motion.div
      className="text-white px-6 text-3xl sm:text-4xl font-normal"
      animate={{
        y: isCollapsed ? "20%" : "0%",
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 50,
        delay: 0.05,
      }}
    >
      <p>Good morning, Hiro</p>
      <p>
        <span className="text-[#606c5d]/70">You have </span>
        <CalendarDays className="inline-block size-8 mb-1" /> 1 event,{" "}
        <span className="text-[#606c5d]/70"> and </span>
        <SquareCheck className="inline-block size-8 mb-0.5" /> 3 tasks
        <span className="text-[#606c5d]/70"> left today</span>
      </p>
    </motion.div>
  );
};
