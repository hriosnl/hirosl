import BackHome from "@/components/ui/BackHome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="writing flex justify-center">
      <BackHome fragment="writing" />
      {children}
    </div>
  );
}
