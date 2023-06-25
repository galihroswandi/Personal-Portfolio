import React from "react";
import AboutFoto from "../Elements/Sections/AboutFoto";
import AboutDescription from "../Elements/Sections/AboutDescription";
import NumberSection from "../Elements/Sections/NumberSection";

export default function About({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-7 md:px-2 lg:px-10 md:mx-auto md:w-[95%] pt-10 overflow-x-auto"
      id="About"
    >
      {children}
    </div>
  );
}

const NameTag = () => {
  return (
    <div>
      <section className="lg:mt-10 xl:mt-[10vh] text-end">
        <NumberSection number={1} />
      </section>
      <h1 className="font-fraunces-light text-left text-7xl min-[390px]:text-8xl md:text-9xl xl:text-[9.4rem] lg:text-left xl:text-center text-slate-800 -mt-2 font-medium">
        Hi{`,`} I{`’`}m <br className="lg:hidden" /> Galih Roswandi.
      </h1>
    </div>
  );
};

const AboutContent = () => {
  return (
    <section className="mt-8 xl:mt-28 sm:flex sm:justify-start sm:gap-x-5 lg:gap-x-12">
      <AboutFoto>
        <AboutFoto.ImageAbout />
        <div className="hidden sm:inline-block">
          <AboutFoto.AboutButton />
        </div>
      </AboutFoto>
      <AboutDescription />
      <div className="sm:hidden">
        <AboutFoto.AboutButton />
      </div>
    </section>
  );
};

About.NameTag = NameTag;
About.Content = AboutContent;
