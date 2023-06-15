"use client";

export default function NavbarLink({
  text,
  classLink,
}: {
  text: string;
  classLink: string;
}) {
  const handleMouseEnter = (e: any) => {
    e.target.classList.add("button");
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      className={`text-slate-900 font-roboto-slab tracking-wide font-medium ${classLink}`}
    >
      {text}
    </button>
  );
}
