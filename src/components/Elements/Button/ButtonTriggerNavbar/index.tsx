"use client";

export default function ButtonTriggerNavbar() {
  function handleClick() {
    const navbarSlide = document.getElementById("navbar-slide");
    navbarSlide?.classList.remove("hidden");
    setTimeout(() => {
      navbarSlide?.classList.replace("opacity-0", "opacity-100");
      navbarSlide?.classList.replace("top-full", "top-0");
    }, 200);
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-x-1.5 text-slate-800 p-2 rounded-md active:bg-white text-base md:hidden"
    >
      <section className="flex flex-col gap-y-0.5">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </section>
      Menu
    </button>
  );
}
