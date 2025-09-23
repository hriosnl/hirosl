import Link from "next/link";
import { CornerUpLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackHome({
  fragment,
  onBlack,
}: {
  fragment?: string;
  onBlack?: boolean;
}) {
  return (
    <div className={cn("absolute top-5 left-10 z-50", onBlack && "text-white")}>
      <Link href={fragment ? `/#${fragment}` : "/"}>
        <CornerUpLeft />
      </Link>
    </div>
  );
}
