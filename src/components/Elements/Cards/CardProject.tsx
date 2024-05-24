import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardProject({
  children,
  imgProject,
  title,
  desc,
  linkProject,
}: {
  children: React.ReactNode;
  imgProject: string;
  title: string;
  desc: string;
  linkProject: string;
}) {
  return (
    <Link
      href={linkProject}
      target="_blank"
      className="card rounded bg-slate-100 dark:bg-slate-900 inline-block group"
    >
      <Image
        src={imgProject}
        alt={title}
        width={500}
        height={300}
        className="w-full"
      />
      <section className="p-3">
        <h2 className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-200 mb-2">
          {title}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              fillRule="evenodd"
              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      </section>
      <section className="tech-stack flex flex-wrap items-center gap-3 px-3 pb-3">
        {children}
      </section>
    </Link>
  );
}

export const TechStackImage = ({
  logoUrl,
  alt,
}: {
  logoUrl: string;
  alt: string;
}) => {
  return (
    <Image src={logoUrl} alt={alt} width={50} height={50} className={"w-7"} />
  );
};
