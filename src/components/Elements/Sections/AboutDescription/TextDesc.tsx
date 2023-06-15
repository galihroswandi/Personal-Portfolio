import React from "react";
import TextProfesi from "./TextProfesi";

export default function TextDesc() {
  return (
    <p className="mt-5 font-fraunces-supersoft-light text-4xl md:text-5xl xl:text-7xl tracking-wider text-slate-800">
      I{`’`}m{" "}
      {
        <TextProfesi>
          <TextProfesi.IconProfesi />
          <TextProfesi.Text
            text="Frontend Web Developer"
            classname="ml-2 text-lg md:text-2xl lg:text-3xl tracking-wider font-roboto-slab"
          />
        </TextProfesi>
      }{" "}
      with expertise in creating attractive and responsive user interfaces using
      HTML, CSS and JavaScript.
    </p>
  );
}
