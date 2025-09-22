import Link from "next/link";
import { CornerUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackHome({ onBlack }: { onBlack?: boolean }) {
  return (
    <div className={cn("fixed top-0 left-8 z-50", onBlack && "text-white")}>
      <Link href="/">
        <CornerUpLeft />
      </Link>
    </div>
  );
}
