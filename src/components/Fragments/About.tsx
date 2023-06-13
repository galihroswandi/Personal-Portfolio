import React from "react";
import AboutFoto from "../Elements/Sections/AboutFoto";
import AboutDescription from "../Elements/Sections/AboutDescription";

export default function About({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-7 md:px-0 md:mx-auto md:w-[95%] pt-10">{children}</div>
  );
}

const NameTag = () => {
  return (
    <>
      <section className="lg:mt-10 xl:mt-[10vh] text-end">
        <h1 className="text-2xl font-fraunces-light">01.</h1>
      </section>
      <h1 className="font-fraunces-light text-left text-7xl sm:text-8xl md:text-9xl lg:text-8xl xl:text-[10rem] lg:text-center text-slate-800 -mt-2">
        Hi{`,`} I{`’`}m <br className="lg:hidden" /> Galih Roswandi.
      </h1>
    </>
  );
};

const AboutContent = () => {
  return (
    <section className="mt-10 min-[550px]:flex min-[550px]:justify-start min-[550px]:gap-x-5">
      <AboutFoto />
      <AboutDescription />
    </section>
  );
};

About.NameTag = NameTag;
About.Content = AboutContent;
