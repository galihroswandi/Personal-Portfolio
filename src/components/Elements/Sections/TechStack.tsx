"use client";
import Image from "next/image";
import StackImage from "../small/StackImage";
import { TextHeaderWithIcon } from "./HeaderContent";
import { motion } from "framer-motion";
import { boxVariant } from "@/components/utils/landingAnimation.config";

export default function TechStack() {
  return (
    <section className="mb-10">
      <TextHeaderWithIcon title="Tech Stacks" desc="My coding skills">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 640 512"
          className="w-6 h-6"
        >
          <path
            d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
            fill="currentColor"
          ></path>
        </svg>
      </TextHeaderWithIcon>
      <Stack />
    </section>
  );
}

const Stack = () => {
  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mt-5 flex flex-row flex-wrap gap-2.5"
    >
      <StackImage titleTech="HTML">
        <Image
          src={"/icons/html5.svg"}
          alt="html5 logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="CSS">
        <Image
          src={"/icons/css3.svg"}
          alt="css logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Tailwindcss">
        <Image
          src={"/icons/tailwindcss.svg"}
          alt="tailwindcss logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Bootstrap">
        <Image
          src={"/icons/bootstrap.svg"}
          alt="bootstrap logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Javascript">
        <Image
          src={"/icons/javascript.svg"}
          alt="javascript logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Typescript">
        <Image
          src={"/icons/typescript.svg"}
          alt="typescript logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="NodeJS">
        <Image
          src={"/icons/nodejs.svg"}
          alt="nodejs logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="ExpressJS">
        <Image
          src={"/icons/express.svg"}
          alt="express logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Mysql">
        <Image
          src={"/icons/mysql.svg"}
          alt="mysql logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="React">
        <Image
          src={"/icons/react.svg"}
          alt="react logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="NextJS">
        <Image
          src={"/icons/nextjs.svg"}
          alt="nextjs logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="NestJS">
        <Image
          src={"/icons/nestjs.svg"}
          alt="nestjs logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Figma">
        <Image
          src={"/icons/figma.svg"}
          alt="figma logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Blockchain">
        <Image
          src={"/icons/blockchain.svg"}
          alt="blockchain logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Solidity">
        <Image
          src={"/icons/solidity.svg"}
          alt="solidity logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Git">
        <Image
          src={"/icons/git.svg"}
          alt="git logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Github">
        <Image
          src={"/icons/github.svg"}
          alt="github logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Docker">
        <Image
          src={"/icons/docker.svg"}
          alt="docker logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Linux">
        <Image
          src={"/icons/linux.svg"}
          alt="linux logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Ubuntu">
        <Image
          src={"/icons/ubuntu.svg"}
          alt="ubuntu logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Nginx">
        <Image
          src={"/icons/nginx.svg"}
          alt="nginx logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="PHP">
        <Image
          src={"/icons/php.svg"}
          alt="php logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Laravel">
        <Image
          src={"/icons/laravel.svg"}
          alt="laravel logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
      <StackImage titleTech="Jest Unit Testing">
        <Image
          src={"/icons/jest.svg"}
          alt="jest logo"
          width={50}
          height={50}
          className="w-6"
        />
      </StackImage>
    </motion.section>
  );
};
