"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export default function BackToTop() {
  const handleClick = () => {
    const target = document.getElementById("wrapper");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.pageYOffset < 500) {
        document.getElementById("back-to-top")?.classList.remove("fixed");
      } else {
        document.getElementById("back-to-top")?.classList.add("fixed");
      }
    });
  });

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-5"
      id="back-to-top"
    >
      <Image
        src="/icons/Back To Top.svg"
        alt="back to top icon"
        title="Back To Top"
        width={50}
        height={50}
        className="w-10"
      />
    </button>
  );
}
