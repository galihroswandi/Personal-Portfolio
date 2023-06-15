import React, { ReactNode, useEffect } from "react";
import NumberSection from "../Elements/Sections/NumberSection";
import SkillSection from "../Elements/Sections/SkilSection";
import { progresBar } from "@/utils/progresBar";
import { dataSkills } from "@/utils/dataSkills";

export default function Skills({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.onscroll = () => {
      progresBar();
    };
  });
  return (
    <section
      className="px-7 py-1.5 pb-10 md:px-5 lg:px-10 mt-14 w-full secondary"
      id="technologies-skill"
    >
      {children}
    </section>
  );
}

const Header = () => {
  return (
    <header className="heading flex justify-between items-center">
      <h1 className="text-xl relative py-3 font-medium">Skills</h1>
      <NumberSection number={2} />
    </header>
  );
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
    <main className="xl:flex items-center gap-x-10">
      <h1 className="text-2xl lg:text-3xl text-center mt-5 font-medium tracking-wide text-slate-800">
        Tecnologies Skills
      </h1>
      <MainSkill />
    </main>
  );
};

Skills.Header = Header;
Skills.Main = Main;
