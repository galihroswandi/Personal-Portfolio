import TechStack from "@/components/Elements/Sections/TechStack";
import AboutDesc from "@/components/Fragments/AboutDesc";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";
import React from "react";

export default function page() {
  return (
    <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto">
      <Navbar />
      <Sidebar />
      <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
        <HeaderMain title="About Me" desc="A short story about me" />
        <AboutDesc />
        <TechStack />
      </main>
    </section>
  );
}
