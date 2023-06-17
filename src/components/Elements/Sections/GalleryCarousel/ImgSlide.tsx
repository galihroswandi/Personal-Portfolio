import Image from "next/image";
import React from "react";

export default function ImgSlide({ source }: { source: string }) {
  return (
    <Image
      src={source}
      alt="Gallery Image"
      width={1000}
      height={1000}
      className="max-w-full rounded-2xl group-hover:rounded-none group-hover:scale-110 transition-all duration-500"
    />
  );
}
