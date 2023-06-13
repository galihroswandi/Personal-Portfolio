import React from "react";
import TextProfesi from "./TextProfesi";

export default function TextDesc() {
  return (
    <p className="mt-5 font-fraunces-supersoft-light text-3xl">
      I{`’`}m{" "}
      {
        <TextProfesi>
          <TextProfesi.IconProfesi />
          <TextProfesi.Text text="Frontend Web Developer" classname="ml-2" />
        </TextProfesi>
      }{" "}
      with expertise in creating attractive and responsive user interfaces using
      HTML, CSS and JavaScript.
    </p>
  );
}
