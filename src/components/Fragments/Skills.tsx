import React, { ReactNode } from "react";
import SkillSection from "../Elements/Sections/SkilSection";
import { dataSkills } from "@/utils/JSON/dataSkills";
import HeaderSkills from "../Elements/Headers/HeaderSkills";

export default function Skills({ children }: { children: ReactNode }) {
  return (
    <section
      className="px-7 py-1.5 lg:py-5 pb-10 md:px-5 lg:px-10 mt-14 w-full secondary"
      id="Skills"
    >
      {children}
    </section>
  );
}

const Header = () => {
  return <HeaderSkills text="Skills" numberSection={2} />;
};

const MainSkill = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {dataSkills.map((skill, index) => (
        <section className="mt-7" key={index}>
          <h1 className="text-2xl mb-3 font-semibold text-slate-600">
            {skill.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {skill.data.map((skill, index) => (
              <div className="flex items-center" key={index}>
                <SkillSection text={skill.text} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

const Main = () => {
  return (
    <main className="xl:flex items-center gap-x-10 lg:mb-20">
      <h1 className="text-2xl lg:text-3xl text-center mt-5 font-medium tracking-wide text-slate-800">
        Tecnologies Skills
      </h1>
      <MainSkill />
    </main>
  );
};

Skills.Header = Header;
Skills.Main = Main;
