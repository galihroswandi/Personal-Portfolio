"use client";
import Image from "next/image";
import React from "react";

export default function NavbarCloseButton() {
  function handleClick() {
    const navbarSlide = document.getElementById("navbar-slide");
    navbarSlide?.classList.replace("top-0", "top-full");
    navbarSlide?.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      navbarSlide?.classList.add("hidden");
    }, 200);
  }

  return (
    <section className="mt-5 mx-5 w-full. flex justify-end">
      <button
        onClick={handleClick}
        className="p-2 border border-slate-800 text-3xl rounded-full"
      >
        <Image
          src="/Icons/x.svg"
          alt="Close"
          title="Close"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </button>
    </section>
  );
}
