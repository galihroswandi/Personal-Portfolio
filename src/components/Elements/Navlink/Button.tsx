"use client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  use: string;
}

const Button = (props: Props) => {
  const { children } = props;

  const handleHamburger = () => {
    const targetSlide = document.getElementById("slide-target");
    targetSlide?.classList.remove("hidden");
    setTimeout(() => {
      targetSlide?.classList.add("active");
    }, 200);
  };

  return <button onClick={handleHamburger}>{children}</button>;
};

export default Button;
