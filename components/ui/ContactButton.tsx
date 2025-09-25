import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function ContactButton() {
  return (
    <a
      href="https://x.com/messages/compose?recipient_id=1482692177340035075"
      target="_blank"
      rel="noopener noreferrer"
      className="link"
    >
      <div
        className={`${sourceCodePro.className} fixed top-5 right-5 text-sm border border-[hsl(0,0%,70%)] bg-white font-medium px-2 py-1 flex items-center gap-x-2 tracking-tighter rounded-2xl`}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="5" fill="#08CB00" />
        </svg>
        Let&apos;s Talk!
      </div>
    </a>
  );
}
