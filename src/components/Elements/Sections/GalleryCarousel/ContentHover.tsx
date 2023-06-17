"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ContentHover({
  slide,
  children,
}: {
  slide: any;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const mainGallery = document.querySelectorAll("#main-gallery");
    mainGallery.forEach((el) => {
      el.addEventListener("mouseover", () => {
        const credentialDisplay = el.querySelector("#target-credential");
        credentialDisplay?.classList.replace("scale-0", "scale-200");
        credentialDisplay?.classList.replace("rounded-full", "rounded-none");
      });

      el.addEventListener("mouseleave", () => {
        const credentialDisplay = el.querySelector("#target-credential");
        credentialDisplay?.classList.replace("scale-200", "scale-0");
        credentialDisplay?.classList.replace("rounded-none", "rounded-full");
      });
    });
  }, []);
  return (
    <Link
      href={slide.credential}
      target="_blank"
      className="flex absolute top-0 bottom-0 w-full bg-slate-800 bg-opacity-70 justify-center items-center gap-x-4 text-white font-medium text-2xl tracking-wider font-roboto-slab scale-0 rounded-full transition-all duration-500 ease-in-out"
      id="target-credential"
    >
      {children}
    </Link>
  );
}

const Text = () => {
  return <span>Display Credential</span>;
};

const ImageCredential = () => {
  return (
    <Image
      src="/icons/showDetail.svg"
      alt="Icons Credential"
      width={100}
      height={100}
      className="w-7"
    />
  );
};

ContentHover.Text = Text;
ContentHover.ImageCredential = ImageCredential;
