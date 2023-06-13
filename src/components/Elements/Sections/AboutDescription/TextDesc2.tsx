import React from "react";
import TextProfesi from "./TextProfesi";
import Link from "next/link";

export default function TextDesc2() {
  return (
    <p className="mt-10 font-future-mono text-xl">
      The technology stack I used to create web developer frontend interfaces{" "}
      {
        <TextProfesi>
          {<TextProfesi.Text text="ReactJS" classname="text-sm px-3" />}
        </TextProfesi>
      }
      ,{" "}
      {
        <TextProfesi>
          {<TextProfesi.Text text="Tailwindcss" classname="text-sm px-3" />}
        </TextProfesi>
      }
      {"and "}
      {
        <TextProfesi>
          {<TextProfesi.Text text="PHP" classname="text-sm px-3" />}
        </TextProfesi>
      }{" "}
      {
        <Link href="#" className="underline">
          (see all the technology used)
        </Link>
      }
    </p>
  );
}
