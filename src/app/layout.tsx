import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Portfolio | Galih Roswandi",
  description: "galihroswandi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="shortcut icon"
        href="./icons/favicon.ico"
        type="image/x-icon"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
