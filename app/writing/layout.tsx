import BackHome from "@/components/ui/BackHome";
import "./styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <BackHome />
      {children}
    </div>
  );
}
