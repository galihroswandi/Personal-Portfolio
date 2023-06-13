import Image from "next/image";
import React from "react";

export default function AboutFoto() {
  return (
    <section className="overflow-hidden min-[550px]:border-none w-fit border border-slate-800 rounded-2xl min-[550px]:rounded-none hover:rounded-2xl transition-all duration-500 min-[550px]:w-[800px]">
      <Image
        src="/img/-foto.png"
        alt="Pas Foto Galih Roswandi"
        width={500}
        height={500}
        className="min-[550px]:w-full hover:scale-110 transition-all duration-500 min-[550px]:border border-slate-800 min-[550px]:rounded-2xl"
      />
    </section>
  );
}
