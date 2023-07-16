import Image from "next/image";
import Link from "next/link";
import React, { ReactNode} from "react";
import "lazysizes";

export default function AboutFoto({ children }: { children: ReactNode }) {
  return (
    <section className="w-full sm:w-[300%] md:w-[200%] lg:max-w-sm xl:max-w-md flex flex-col justify-between">
      {children}
    </section>
  );
}

const ImageAbout = () => {
  return (
    <figure>
      <div className="overflow-hidden border border-slate-800 rounded-3xl flex flex-col justify-between group hover:rounded-none transition-all duration-500">
        <Image
          src="/img/-foto.webp"
          alt="Pas Foto Galih Roswandi"
          width={300}
          height={300}
          loading="lazy"
          className="w-full hover:scale-110 group-hover:rounded-none transition-all duration-500 md:rounded-3xl"
        />
      </div>
      <figcaption className="mt-2 text-base md:text-lg lg:text-xl tracking-wider text-slate-600">
        21 March 2023
      </figcaption>
    </figure>
  );
};

const AboutButton = () => {
  return (
    <Link
      href="#"
      className="flex justify-between items-center gap-x-3 bg-white py-3 px-6 rounded-full shadow-lg mt-10 text-slate-800 group md:max-w-fit text-base md:text-lg tracking-wide font-medium"
    >
      Download My CV{" "}
      <Image
        src="/icons/Arrow Small.svg"
        alt="Link Icon"
        width={50}
        height={50}
        className="w-5 group-hover:translate-x-3 transition duration-500"
      />
    </Link>
  );
};

AboutFoto.ImageAbout = ImageAbout;
AboutFoto.AboutButton = AboutButton;
