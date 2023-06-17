import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Figcaption({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <figcaption className="border-y border-slate-800 mt-5 py-3">
      {children}
    </figcaption>
  );
}

const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
      {title}
    </h1>
  );
};

const Description = ({ desc }: { desc: string }) => {
  return <p className="text-slate-800 text-base mb-4 md:text-lg">{desc}</p>;
};

const LinkDemo = ({ linkDemo }: { linkDemo: string }) => {
  return (
    <Link
      href={linkDemo}
      target="_blank"
      className="bg-slate-800 text-white py-3 px-4 flex items-center gap-x-2 max-w-fit rounded-full hover:bg-slate-900 transition duration-500"
    >
      <Image
        src="/icons/Eye.svg"
        alt="Eye Icon"
        width={50}
        height={50}
        className="w-6"
      />{" "}
      Demo Project
    </Link>
  );
};

Figcaption.Title = Title;
Figcaption.Description = Description;
Figcaption.LinkDemo = LinkDemo;
