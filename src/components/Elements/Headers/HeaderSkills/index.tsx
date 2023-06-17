"use client";
import { progresBar } from "@/utils/progresBar";
import React, { useEffect } from "react";
import NumberSection from "../../Sections/NumberSection";

export default function HeaderSkills({
  text,
  numberSection,
}: {
  text: string;
  numberSection: number;
}) {
  // useEffect(() => {
  //   window.onscroll = () => {
  //     progresBar();
  //   };
  // }, []);
  return (
    <header className="heading flex justify-between items-center lg:mb-10 border-b border-slate-800">
      <h1 className="text-xl relative py-3 font-medium">{text}</h1>
      <NumberSection number={numberSection} />
    </header>
  );
}
