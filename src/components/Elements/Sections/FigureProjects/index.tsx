import React from "react";
import ImageFigure from "./ImageFigure";
import Figcaption from "./Figcaption";

interface PropsProjects {
  title: string;
  desc: string;
  linkDemo: string;
  typeWebsite: string;
  image: string;
}

export default function FigureProjects(props: PropsProjects) {
  const { title, desc, linkDemo, typeWebsite, image } = props;
  return (
    <figure className="md:flex md:gap-x-4 md:items-start md:mt-14">
      <header className="md:order-2 md:w-[300%]">
        <h1 className="py-2 inline-block font-medium text-lg md:text-xl -mt-7">
          {typeWebsite}
        </h1>
        <ImageFigure image={image} />
      </header>
      <Figcaption>
        <Figcaption.Title title={title} />
        <Figcaption.Description desc={desc} />
        <Figcaption.LinkDemo linkDemo={linkDemo} />
      </Figcaption>
    </figure>
  );
}
