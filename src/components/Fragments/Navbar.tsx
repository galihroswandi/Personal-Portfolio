import React from "react";
import Profile from "../Elements/Sections/Profile";
import Navigation from "../Elements/Sections/Navigation";
import DarkLight from "../Elements/Sections/DarkLight";

export default function Navbar() {
  return (
    <nav className="md:hidden fixed z-10 bottom-0 w-full h-16 bg-primary-blue dark:bg-slate-800 rounded-t-[27.5px] shadow-inner-shadow dark:shadow-inner-shadow dark:shadow-slate-900 px-1 flex items-center justify-between gap-3">
      <Profile borderRight={true} />
      <Navigation iconColor="white" useMobile={true} />
      <DarkLight customParentClass="text-white" />
    </nav>
  );
}
