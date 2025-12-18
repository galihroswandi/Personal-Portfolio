import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers/ProgressBarProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="./favicon.svg" sizes="any" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
