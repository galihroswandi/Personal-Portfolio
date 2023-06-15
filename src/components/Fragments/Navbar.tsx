import React, { ReactNode } from "react";
import NavbarLink from "../Elements/Link/NavbarLink";
import Image from "next/image";
import NavbarCloseButton from "../Elements/Button/ButtonCloseNavbar";
import ButtonTriggerNavbar from "../Elements/Button/ButtonTriggerNavbar";

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <nav className="px-5 md:px-2 lg:px-10 md:mx-auto pl-3 py-[.1rem] flex justify-between items-center fixed md:static bottom-0 w-full overflow-hidden md:min-w-0 md:w-[95%] max-w-full primary border-b. border-b-slate-800. shadow-[0_35px_45px_#1e293b] md:shadow-none z-50">
      {children}
      <ButtonTriggerNavbar />
    </nav>
  );
}

const Title = ({
  classname,
  classimg,
}: {
  classname: string;
  classimg: string;
}) => {
  return (
    <h1
      className={`text-slate-800 font-future-mono text-lg  rounded-full overflow-hidden ${classname}`}
    >
      <Image
        src="/img/Logo3.png "
        alt="Galih Roswandi"
        width={500}
        height={500}
        className={classimg}
      />
    </h1>
  );
};

const NavLink = () => {
  const classLink = {
    class: "font-future-mono text-base lg:text-lg",
  };
  return (
    <div className="hidden md:flex gap-x-5 lg:gap-x-8 xl:gap-x-10">
      <NavbarLink text="About" classLink={classLink.class} />
      <NavbarLink text="Skills" classLink={classLink.class} />
      <NavbarLink text="Sertificate" classLink={classLink.class} />
      <NavbarLink text="Projects" classLink={classLink.class} />
      <NavbarLink text="Contact" classLink={classLink.class} />
    </div>
  );
};

const NavbarSlide = () => {
  const classLink = {
    class:
      "text-center font-fraunces-light font-medium text-5xl border-b-2 border-slate-800 max-w-fit",
  };

  return (
    <div
      className="bg-[#F9ECCD] fixed z-50 top-full opacity-0 min-h-screen w-full transition-all duration-500 hidden"
      id="navbar-slide"
    >
      <NavbarCloseButton />
      <section className="flex flex-col items-center gap-y-[2rem] my-4">
        <Title
          classname="!font-fraunces-light !text-5xl !font-extralight flex flex-col shadow-md mb-5"
          classimg="w-32 h-32"
        />
        <NavbarLink text="About" classLink={classLink.class} />
        <NavbarLink text="Skills" classLink={classLink.class} />
        <NavbarLink text="Sertificate" classLink={classLink.class} />
        <NavbarLink text="Projects" classLink={classLink.class} />
        <NavbarLink text="Contact" classLink={classLink.class} />
      </section>
    </div>
  );
};

Navbar.Title = Title;
Navbar.NavLink = NavLink;
Navbar.NavbarSlide = NavbarSlide;
