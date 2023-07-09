import React from "react";
import HeaderSkills from "../Elements/Headers/HeaderSkills";
import FigureProjects from "../Elements/Sections/FigureProjects";
import { projectsData } from "@/utils/JSON/projectsData";

export default function Projects({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="px-7 min-h-screen py-1.5 lg:py-5 pb-16 md:px-5 lg:px-10 w-full secondary section -mt-4"
      id="Projects"
    >
      {children}
    </section>
  );
}

const Header = () => {
  return <HeaderSkills text="Projects" numberSection={4} />;
};

const MainProjects = () => {
  return (
    <section className="mt-5 mb-20">
      {projectsData.map((el) => (
        <div key={el.id} className="mb-10">
          <FigureProjects
            image={el.image}
            title={el.title}
            desc={el.description}
            linkDemo={el.linkDemo}
            typeWebsite={el.typeWebsite}
          />
        </div>
      ))}
    </section>
  );
};

Projects.Header = Header;
Projects.MainProjects = MainProjects;
