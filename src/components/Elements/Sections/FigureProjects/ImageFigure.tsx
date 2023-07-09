import Image from "next/image";
import React from "react";

export default function ImageFigure({ image }: { image: string }) {
  return (
    <Image
      src={image}
      alt="Project 1"
      width={1000}
      height={1000}
      className="border border-slate-800 rounded-2xl w-full overflow-hidden"
    />
  );
}
