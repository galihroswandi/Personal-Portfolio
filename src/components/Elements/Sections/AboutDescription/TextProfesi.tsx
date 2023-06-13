import Image from "next/image";
import React, { ReactNode } from "react";

export default function TextProfesi({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block align-middle pb-1.5 px-[.55rem] border border-slate-800 rounded-full mt-1">
      {children}
    </span>
  );
}

const IconProfesi = () => {
  return (
    <span className="inline-block align-middle">
      {
        <Image
          src="/icons/programming.svg"
          alt="Programming"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      }
    </span>
  );
};

const Text = ({ text, classname }: { text: string; classname: string }) => {
  return (
    <>
      <span
        className={`font-future-mono max-[309px]:text-sm text-lg leading-[.5rem] ${classname}`}
      >
        {text}
      </span>{" "}
    </>
  );
};

TextProfesi.IconProfesi = IconProfesi;
TextProfesi.Text = Text;
