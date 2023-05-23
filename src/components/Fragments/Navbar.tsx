"use client";
import Link from "next/link";
import Navlink from "../Elements/Navlink";

const Navbar = () => {
  const handleRemove = () => {
    const targetSlide = document.getElementById("slide-target");
    targetSlide?.classList.remove("active");
    setTimeout(() => {
      targetSlide?.classList.add("hidden");
    }, 200);
  };

  return (
    <div className="nav-wrapper  min-w-full px-4">
      <Navlink />

      <div
        className="nav-slide fixed w-full min-h-screen bg-[#0d0d0d] top-0 left-0 p-5 translate-x-80 transition duration-500 ease-in-out opacity-0 hidden"
        id="slide-target"
      >
        <nav>
          <button className="float-right" onClick={handleRemove}>
            <span className="w-[1.9rem] h-[3px] rounded-3xl my-1.5 block bg-slate-50 origin-top-right rotate-[30deg] translate-y-6"></span>
            <span className="w-[1.9rem] h-[3px] rounded-3xl my-1.5 block bg-slate-50 origin-top-right -rotate-[30deg]"></span>
          </button>
          <div className="content flex flex-col justify-between border. border-white min-h-[95vh]">
            <div className="pt-12 flex flex-col">
              <Link
                href="/"
                className="text-white text-[44px] font-Neue-Regular hover:text-slate-400"
              >
                HOME
              </Link>
              <Link
                href="/"
                className="text-white text-[44px] font-Neue-Regular hover:text-slate-400"
              >
                PROJECT
              </Link>
              <Link
                href="/"
                className="text-white text-[44px] font-Neue-Regular hover:text-slate-400"
              >
                CONTACT
              </Link>
            </div>

            <ul className="text-white">
              <li>
                <Link href="https://instagram.com">Instagram</Link>
              </li>
              <li>
                <Link href="https://instagram.com">Facebook</Link>
              </li>
              <li>
                <Link href="https://instagram.com">Linkedin</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
