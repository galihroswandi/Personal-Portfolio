"use client";
import React from "react";
import CardProject, { TechStackImage } from "../Elements/Cards/CardProject";
import { motion } from "framer-motion";
import { boxVariant } from "@/utils/landingAnimation.config";

export default function CardsProject() {
  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid sm:grid-cols-2 gap-7 items-center pb-16"
    >
      <CardProject
        title="E-Comerce Garuda Store"
        desc="This simple e-commerce project uses ReactJS, Firebase, and Redux technologies. In this project, e-commerce applications are built using the ReactJS framework for a responsive user interface."
        imgProject="/img/project-1.png"
        linkProject="https://github.com/galihroswandi/E-comerce"
      >
        <TechStackImage logoUrl="/icons/react.svg" alt="react logo" />
        <TechStackImage
          logoUrl="/icons/tailwindcss.svg"
          alt="tailwindcss logo"
        />
        <TechStackImage
          logoUrl="/icons/reactrouter.svg"
          alt="react-router logo"
        />
        <TechStackImage logoUrl="/icons/firebase.svg" alt="firebase logo" />
      </CardProject>
      <CardProject
        title="Landing Page Baarshop"
        desc="The TikTok Seller Client Website is a website project using Next.js and Tailwind CSS. This project aims to give online presence to TikTok sellers and introduce their products to TikTok users. "
        imgProject="/img/project-2.png"
        linkProject="https://baarshopid.vercel.app"
      >
        <TechStackImage logoUrl="/icons/nextjs.svg" alt="nextjs logo" />
        <TechStackImage
          logoUrl="/icons/tailwindcss.svg"
          alt="tailwindcss logo"
        />
      </CardProject>
      <CardProject
        title="Personal Portfolio"
        desc="This website showcases a description about me and includes a feature to contact me. It was created using Next.js and Tailwind CSS. I also used the Framer Motion library for animations."
        imgProject="/img/project-3.png"
        linkProject="https://gr.mahpardigital.com"
      >
        <TechStackImage logoUrl="/icons/nextjs.svg" alt="nextjs logo" />
        <TechStackImage
          logoUrl="/icons/tailwindcss.svg"
          alt="tailwindcss logo"
        />
      </CardProject>
    </motion.section>
  );
}
