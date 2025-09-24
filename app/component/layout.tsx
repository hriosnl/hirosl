import BackHome from "@/components/ui/BackHome";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <BackHome />

      {children}
    </div>
  );
}
