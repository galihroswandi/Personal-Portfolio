"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export default function BackToTop() {
  const handleClick = () => {
    
  };

  useEffect(() => {
    
  }, [])

  return (
    <button onClick={handleClick} className="fixed bottom-24 right-5">
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
