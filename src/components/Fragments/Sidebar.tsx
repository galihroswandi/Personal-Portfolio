import React from "react";
import Profile from "../Elements/Sections/Profile";
import DarkLight from "../Elements/Sections/DarkLight";
import Navigation from "../Elements/Sections/Navigation";
import SidebarSocialMedia from "../Elements/Sections/SidebarSocialMedia";
import ProfileAvatar from "../Elements/Sections/Profile.avatar";
import TextName from "../Elements/Sections/TextName";

export default function Sidebar() {
  return (
    <section className="sidebar fixed overflow-y-auto hidden md:flex md:flex-col md:gap-5 h-full w-14 lg:w-64 py-2 lg:py-6 left-7 lg:left-14 xl:left-[10.2rem]">
      <section className="flex flex-col items-center gap-3 border-b border-slate-600 dark:border-slate-200 border-dashed h-fit py-3">
        <ProfileAvatar />
        <section className="flex flex-col items-center gap-2 lg:gap-0 lg:-mt-20 z-10">
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
        <Navigation
          iconColor="slate-600 dark:text-slate-200"
          useMobile={false}
        />
      </section>
      <SidebarSocialMedia />
    </section>
  );
}
