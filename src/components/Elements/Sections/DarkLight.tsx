import React from "react";
import ButtonWithImage from "../Buttons/ButtonWithImage";

interface DarkLightProps {
  customParentClass: string;
  borderLeft?: boolean;
}
export default function DarkLight(props: DarkLightProps) {
  const { customParentClass, borderLeft = true } = props;
  return (
    <section
      className={`flex items-center ${
        borderLeft ? "border-l border-[#67B5D2]" : ""
      } p-2`}
    >
      <ButtonWithImage
        useButton={true}
        customParentClass={`dark-light-button ${customParentClass}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          width={25}
          height={25}
        >
          <path
            d="M6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407l-1.79 1.79l-1.407-1.408zm-1.8 15.115l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41l1.79-1.8l-1.41-1.41z"
            fill="currentColor"
          ></path>
        </svg>
      </ButtonWithImage>
    </section>
  );
}
