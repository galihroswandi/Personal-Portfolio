import Image from "next/image";
import React, { ReactNode } from "react";

export default function TextProfesi({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block align-middle border border-slate-800 rounded-full">
      <span className="flex justify-center items-center py-1 px-3">
        {children}
      </span>
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
          width={500}
          height={500}
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
        className={`max-[309px]:text-sm text-lg leading-[.5rem] ${classname}`}
      >
        {text}
      </span>{" "}
    </>
  );
};

TextProfesi.IconProfesi = IconProfesi;
TextProfesi.Text = Text;
