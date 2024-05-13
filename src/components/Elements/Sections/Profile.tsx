import Image from "next/image";
import React from "react";

interface ProfileProps {
  borderRight?: boolean;
}
export default function Profile(props: ProfileProps) {
  const { borderRight } = props;
  return (
    <section
      className={`${borderRight ? "border-r border-[#67B5D2]" : ""} p-2`}
    >
      <Image
        src={"/img/me.png"}
        alt="Profile Image"
        width={1000}
        height={1000}
        className="w-10"
      />
    </section>
  );
}
