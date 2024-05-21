import React from "react";
import CardProject, { TechStackImage } from "../Elements/Cards/CardProject";

export default function CardsProject() {
  return (
    <section className="grid sm:grid-cols-2 gap-7 items-center">
      <CardProject
        title="E-Comerce Garuda Store"
        desc="This simple e-commerce project uses ReactJS, Firebase, and Redux technologies. In this project, e-commerce applications are built using the ReactJS framework for a responsive user interface."
        imgProject="/img/project-1.png"
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
      >
        <TechStackImage logoUrl="/icons/nextjs.svg" alt="nextjs logo" />
        <TechStackImage
          logoUrl="/icons/tailwindcss.svg"
          alt="tailwindcss logo"
        />
      </CardProject>
    </section>
  );
}
