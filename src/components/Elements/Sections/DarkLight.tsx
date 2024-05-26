"use client";
import React, { useEffect, useState } from "react";
import ButtonWithImage from "../Buttons/ButtonWithImage";

interface DarkLightProps {
  customParentClass: string;
  borderLeft?: boolean;
  sectionClass?: string;
}
export default function DarkLight(props: DarkLightProps) {
  const { customParentClass, borderLeft = true, sectionClass } = props;

  useEffect(() => {
    const theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      const target = document.getElementById("html-root");
      target?.classList.remove("light");
      target?.classList.add("dark");
      setDark(true);
    } else {
      const target = document.getElementById("html-root");
      target?.classList.remove("dark");
      target?.classList.add("light");
      setDark(false);
    }
  }, []);

  const [dark, setDark] = useState(false);

  const handleDarkLight = () => {
    const target = document.getElementById("html-root");

    if (target?.classList.contains("dark")) {
      target?.classList.remove("dark");
      target?.classList.add("light");
      setDark(false);
      sessionStorage.setItem("theme", "light");
    } else {
      target?.classList.remove("light");
      target?.classList.add("dark");
      setDark(true);
      sessionStorage.setItem("theme", "dark");
    }
  };

  return (
    <section
      className={`${sectionClass ? sectionClass : "flex"} items-center ${
        borderLeft ? "border-l border-[#67B5D2] dark:border-slate-600" : ""
      } p-2`}
    >
      <ButtonWithImage
        useButton={true}
        onclick={handleDarkLight}
        ariaLabel="Dark/Light Mode"
        customParentClass={`dark-light-button overflow-hidden ${customParentClass}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          width={25}
          height={25}
          className={`size-6 ${dark ? "" : "hidden"}`}
          id="sun"
        >
          <path
            d="M6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407l-1.79 1.79l-1.407-1.408zm-1.8 15.115l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41l1.79-1.8l-1.41-1.41z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={25}
          height={25}
          className={`size-6 ${dark ? "hidden" : ""}`}
          id="month"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
            clipRule="evenodd"
          />
        </svg>
      </ButtonWithImage>
    </section>
  );
}
