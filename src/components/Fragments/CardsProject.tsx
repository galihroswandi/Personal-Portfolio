"use client";

import { useState } from "react";
import CardProject from "../Elements/Cards/CardProject";
import ProjectDetailModal from "../Elements/ProjectDetailModal";
import { motion } from "framer-motion";
import { boxVariant } from "../utils/landingAnimation.config";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function CardsProject() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <motion.section
        variants={boxVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid sm:grid-cols-2 gap-7 items-center pb-16"
      >
        {projects.map((project) => (
          <CardProject
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </motion.section>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
