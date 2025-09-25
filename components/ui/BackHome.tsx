"use client";

import { useRouter } from "next/navigation";
import { CornerUpLeft } from "lucide-react";

export default function BackHome() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-5 left-5 sm:left-10 z-50 p-1 rounded-xl bg-white"
    >
      <CornerUpLeft />
    </button>
  );
}
