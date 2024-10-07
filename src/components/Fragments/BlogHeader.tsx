import React from "react";
import ButtonWithImage from "../Elements/Buttons/ButtonWithImage";
import Image from "next/image";

export default function BlogHeader() {
  return (
    <section>
      <ButtonWithImage
        useButton={false}
        linkUrl="/blog"
        customParentClass="flex items-center gap-2 w-fit"
      >
        <Image
          src={"/icons/arrow-left-circle-dark.svg"}
          alt="Arrow Icon"
          width={50}
          height={50}
          className="w-7 dark:hidden flex"
        />
        <Image
          src={"/icons/arrow-left-circle-light.svg"}
          alt="Arrow Icon"
          width={50}
          height={50}
          className="w-7 dark:flex hidden"
        />
        <span>Back</span>
      </ButtonWithImage>
    </section>
  );
}
