"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ButtonWithImage from "../Buttons/ButtonWithImage";
import { MoonIcon, SunIcon } from "lucide-react";

interface DarkLightProps {
  customParentClass: string;
  borderLeft?: boolean;
  sectionClass?: string;
}

export default function DarkLight({
  customParentClass,
  borderLeft = true,
  sectionClass,
}: DarkLightProps) {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hindari hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <section
      className={`${sectionClass ?? "flex"} items-center ${
        borderLeft ? "border-l border-[#67B5D2] dark:border-slate-600" : ""
      } p-2`}
    >
      <ButtonWithImage
        useButton
        onclick={toggleTheme}
        ariaLabel="Dark/Light Mode"
        customParentClass={`dark-light-button overflow-hidden cursor-pointer ${customParentClass}`}
      >
        {/* SUN */}
        <SunIcon
          className={`size-6 ${isDark ? "" : "hidden"}`}
          width={25}
          height={25}
        />

        {/* MOON */}
        <MoonIcon
          className={`size-6 ${isDark ? "hidden" : ""}`}
          width={25}
          height={25}
        />
      </ButtonWithImage>
    </section>
  );
}
