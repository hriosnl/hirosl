import Link from "next/link";
import { CornerUpLeft } from "lucide-react";

export default function BackHome() {
  return (
    <div className="fixed top-5 left-8 z-50">
      <Link href="/#components">
        <CornerUpLeft />
      </Link>
    </div>
  );
}
