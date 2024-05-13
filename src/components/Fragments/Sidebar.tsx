import React from "react";
import Profile from "../Elements/Sections/Profile";
import DarkLight from "../Elements/Sections/DarkLight";
import Navigation from "../Elements/Sections/Navigation";
import SidebarSocialMedia from "../Elements/Sections/SidebarSocialMedia";

export default function Sidebar() {
  return (
    <section className="absolute hidden md:flex md:flex-col md:gap-5 h-full w-14 py-2">
      <section className="flex flex-col items-center gap-3 border-b border-slate-600 border-dashed h-fit py-3">
        <section className="flex flex-col items-center gap-2">
          <Profile borderRight={false} />
          <h2 className="text-lg font-medium text-slate-600">GR</h2>
        </section>
        <DarkLight borderLeft={false} customParentClass="text-slate-600" />
      </section>
      <section>
        <Navigation iconColor="slate-600" useMobile={false} />
      </section>
      <SidebarSocialMedia />
    </section>
  );
}
