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
    const navbarSlide = document.getElementById("navbar-slide");
    navbarSlide?.classList.replace("top-0", "top-full");
    navbarSlide?.classList.replace("opacity-100", "opacity-0");
    setTimeout(() => {
      navbarSlide?.classList.add("hidden");
    }, 200);

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
