"use client";

import { motion } from "motion/react";
import BackHome from "@/components/ui/BackHome";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <div className="h-screen flex flex-col">
      <BackHome />

      <div className="flex items-center justify-center h-screen bg-black">
        <Friends />
      </div>
    </div>
  );
}

function Friends() {
  const [chosenFriend, setChosenFriend] = useState<number | null>(null);

  return (
    <div className="flex gap-7 bg-white px-5 py-4 rounded-3xl relative -bottom-52">
      {FRIENDS.map((friend) => (
        <div key={friend.id} className="flex flex-col items-center">
          <motion.div
            className="size-12 relative rounded-full overflow-hidden"
            onClick={() => setChosenFriend(friend.id)}
            layoutId={`friend-${friend.id}`}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <Image
              src={friend.image}
              alt={friend.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </motion.div>
          <p className="text-xs">{friend.name}</p>
        </div>
      ))}

      {chosenFriend !== null && (
        <motion.div
          key={FRIENDS[chosenFriend].id}
          className="absolute w-full h-[30rem] bottom-0 left-0 overflow-hidden rounded-3xl"
          onClick={() => setChosenFriend(null)}
          layoutId={`friend-${FRIENDS[chosenFriend].id}`}
          transition={{
            ease: "easeInOut",
            duration: 2.8,
            delay: 0.2,
          }}
        >
          <Image
            src={FRIENDS[chosenFriend].image}
            alt={FRIENDS[chosenFriend].name}
            fill
            sizes="500px"
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}

const FRIENDS = [
  {
    id: 0,
    name: "Lana",
    image: "/images/portraits/lana.jpg",
  },
  {
    id: 1,
    name: "Manov",
    image: "/images/portraits/manov.jpg",
  },
  {
    id: 2,
    name: "Olena",
    image: "/images/portraits/olena.jpg",
  },
  {
    id: 3,
    name: "Pasha",
    image: "/images/portraits/pasha.jpg",
  },
  {
    id: 4,
    name: "Sasani",
    image: "/images/portraits/sasani.jpg",
  },
];
