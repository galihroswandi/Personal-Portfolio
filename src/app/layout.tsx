import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galih Roswandi - Personal Website",
  description: "Personal Website of Galih Roswandi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" id="html-root">
      <body
        className={`${inter.className} bg-white dark:bg-primary-dark dark:text-slate-200 transition-colors duration-500`}
      >
        {children}
      </body>
    </html>
  );
}
