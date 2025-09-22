import type { Metadata } from "next";
import { Nunito_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiro San Lorenzo",
  description: "Design Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        {children}

        <a
          href="https://x.com/messages/compose?recipient_id=1482692177340035075"
          target="_blank"
          className="link"
        >
          <div
            className={`${sourceCodePro.className} fixed top-2 right-2 text-sm border border-[hsl(0,0%,70%)] bg-white font-medium px-2 py-1 flex items-center gap-x-2 tracking-tighter rounded-2xl`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="5" fill="#08CB00" />
            </svg>
            Let&apos;s Talk!
          </div>
        </a>
      </body>
    </html>
  );
}
