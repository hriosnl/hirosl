import BackHome from "@/components/ui/BackHome";
import ContactButton from "@/components/ui/ContactButton";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="writing flex justify-center">
      <BackHome />
      <ContactButton />
      {children}
    </div>
  );
}
