"use client";

export default function NavbarLink({
  text,
  classLink,
  to,
}: {
  text: string;
  classLink: string;
  to: string;
}) {
  const handleMouseEnter = (e: any) => {
    e.target.classList.add("button");
  };

  const handleClick = () => {
    const targetSlide = document.getElementById("target-trigger-slide");

    const target = document.getElementById(to);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`text-slate-900 font-roboto-slab tracking-wide font-medium ${classLink}`}
    >
      {text}
    </button>
  );
}
