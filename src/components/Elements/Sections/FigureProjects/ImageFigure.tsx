import Image from "next/image";
import React from "react";

export default function ImageFigure() {
  return (
    <Image
      src="/img/Projects/project 1.png"
      alt="Project 1"
      width={1000}
      height={1000}
      className="border border-slate-800 rounded-2xl w-full"
    />
  );
}
