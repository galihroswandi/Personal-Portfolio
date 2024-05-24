import Image from "next/image";
import React from "react";

export default function NotBlog() {
  return (
    <section className="flex flex-col justify-center items-center gap-10 h-[60vh] md:h-[70vh]">
      <Image
        src="/img/notblog.png"
        alt="not blog"
        width={1000}
        height={1000}
        className="w-64 md:w-80 mx-auto"
      />
      <h2 className="text-xl md:text-2xl text-slate-300 dark:text-slate-800">
        There is no writing yet
      </h2>
    </section>
  );
}
