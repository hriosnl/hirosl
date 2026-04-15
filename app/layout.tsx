import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Nunito_Sans, Source_Code_Pro, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiro San Lorenzo",
  description: "My personal website as a design engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${nunitoSans.className} antialiased`}>
        {children}

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
