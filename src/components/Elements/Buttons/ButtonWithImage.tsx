import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ButtonWithImageProps {
  useButton: boolean;
  children?: React.ReactNode;
  imgUrl?: string;
  customParentClass?: string;
  customImageClass?: string;
  linkUrl?: string;
  blank?: string;
}
export default function ButtonWithImage(props: ButtonWithImageProps) {
  const {
    useButton,
    children,
    imgUrl,
    customParentClass,
    customImageClass,
    linkUrl,
    blank,
  } = props;

  if (useButton) {
    return (
      <button className={customParentClass}>
        {children ? (
          children
        ) : (
          <Image
            src={imgUrl || "no-image-set"}
            alt="Button Icon"
            width={100}
            height={100}
            className={customImageClass}
          />
        )}
      </button>
    );
  } else {
    return (
      <Link href={linkUrl || "/"} target={blank} className={customParentClass}>
        {children ? (
          children
        ) : (
          <Image
            src={imgUrl || "no-image-set"}
            alt="Button Icon"
            width={100}
            height={100}
            className={customImageClass}
          />
        )}
      </Link>
    );
  }
}
