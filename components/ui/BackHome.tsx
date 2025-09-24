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
    <div
      className={cn(
        "fixed top-5 left-5 sm:left-10 z-50 bg-white p-1 rounded-xl",
        onBlack && "text-white bg-black"
      )}
    >
      <Link href={fragment ? `/#${fragment}` : "/"}>
        <CornerUpLeft />
      </Link>
    </div>
  );
}
