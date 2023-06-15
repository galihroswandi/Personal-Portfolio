import React from "react";
import TextProfesi from "./TextProfesi";
import Link from "next/link";

export default function TextDesc2() {
  return (
    <p className="mt-10 md:mt-32 font-cormoran-garamond font-medium text-xl md:text-2xl lg:text-4xl lg:leading-[3.5rem] tracking-wide text-slate-800">
      The technology stack I used to create web developer frontend interfaces{" "}
      {
        <TextProfesi>
          {
            <TextProfesi.Text
              text="ReactJS"
              classname="text-base py-0.5 md:py-0 md:text-lg lg:text-xl tracking-wider"
            />
          }
        </TextProfesi>
      }
      ,{" "}
      {
        <TextProfesi>
          {
            <TextProfesi.Text
              text="Tailwindcss"
              classname="text-base py-0.5 md:py-0 px-3 md:text-lg lg:text-xl tracking-wider"
            />
          }
        </TextProfesi>
      }
      {" and "}
      {
        <TextProfesi>
          {
            <TextProfesi.Text
              text="PHP"
              classname="text-base py-0.5 md:py-0 px-4 md:text-lg lg:text-xl tracking-wider"
            />
          }
        </TextProfesi>
      }
      {". "}
      {
        <a href="#technologies-skill" className="underline">
          (see all the technology used)
        </a>
      }
    </p>
  );
}
