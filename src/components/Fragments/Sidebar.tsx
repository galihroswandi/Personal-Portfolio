import React from "react";
import Profile from "../Elements/Sections/Profile";
import DarkLight from "../Elements/Sections/DarkLight";
import Navigation from "../Elements/Sections/Navigation";
import SidebarSocialMedia from "../Elements/Sections/SidebarSocialMedia";
import ProfileAvatar from "../Elements/Sections/Profile.avatar";
import TextName from "../Elements/Sections/TextName";

export default function Sidebar() {
  return (
    <section className="fixed overflow-y-auto hidden md:flex md:flex-col md:gap-5 h-fit w-14 lg:w-64 py-2 lg:py-6">
      <section className="flex flex-col items-center gap-3 border-b border-slate-600 border-dashed h-fit py-3">
        <ProfileAvatar />
        <section className="flex flex-col items-center gap-2 lg:gap-0 lg:-mt-16">
          <Profile borderRight={false} />
          <TextName />
        </section>
        <DarkLight
          borderLeft={false}
          customParentClass="text-slate-600"
          sectionClass="lg:hidden"
        />
      </section>
      <section>
        <Navigation iconColor="slate-600" useMobile={false} />
      </section>
      <SidebarSocialMedia />
    </section>
  );
}
