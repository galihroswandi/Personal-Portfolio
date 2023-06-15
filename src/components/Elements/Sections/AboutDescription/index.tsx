import React from "react";
import TextDesc from "./TextDesc";
import TextDesc2 from "./TextDesc2";

export default function AboutDescription() {
  return (
    <section className="sm:-mt-5 flex flex-col justify-between">
      <TextDesc />
      <TextDesc2 />
    </section>
  );
}
