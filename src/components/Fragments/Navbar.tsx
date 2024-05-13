import React from "react";
import Profile from "../Elements/Sections/Profile";
import Navigation from "../Elements/Sections/Navigation";
import DarkLight from "../Elements/Sections/DarkLight";

export default function Navbar() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full h-16 bg-primary-blue rounded-t-[27.5px] shadow-inner-shadow px-1 flex items-center justify-between gap-3">
      <Profile borderRight={true} />
      <Navigation iconColor="white" useMobile={true} />
      <DarkLight customParentClass="text-white" />
    </nav>
  );
}
