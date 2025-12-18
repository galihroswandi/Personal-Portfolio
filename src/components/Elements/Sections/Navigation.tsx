"use client";
import React from "react";
import ButtonWithImage from "../Buttons/ButtonWithImage";
import { usePathname } from "next/navigation";

interface NavigationProps {
  iconColor: string;
  useMobile: boolean;
}
export default function Navigation(props: NavigationProps) {
  const { iconColor, useMobile } = props;

  const pathname = usePathname();

  return (
    <section
      className={`flex ${
        useMobile ? "flex-row" : "flex-col"
      } items-center lg:items-start gap-1.5 400:gap-4 sm:gap-7 lg:gap-2`}
    >
      <ButtonWithImage
        useButton={false}
        linkUrl="/"
        ariaLabel="Home"
        customParentClass={`nav-button ${pathname === "/" ? "active" : ""} ${
          useMobile ? "mobile" : "desktop"
        } text-${iconColor} p-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded lg:flex lg:items-center lg:gap-3 lg:w-full md:hover:bg-slate-100 hover:bg-[#0299D0] dark:md:hover:bg-slate-900`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1024 1024"
          width={25}
          height={25}
        >
          <path
            d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7l23.1 23.1L882 542.3h-96.1z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="hidden lg:block text-lg font-medium">Home</span>
      </ButtonWithImage>
      <ButtonWithImage
        useButton={false}
        linkUrl="/showcase-project"
        ariaLabel="Showcase Project"
        customParentClass={`nav-button ${
          pathname === "/showcase-project" ? "active" : ""
        } ${
          useMobile ? "mobile" : "desktop"
        } text-${iconColor} p-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded lg:flex lg:items-center lg:gap-3 lg:w-full md:hover:bg-slate-100 hover:bg-[#0299D0] dark:md:hover:bg-slate-900`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1024 1024"
          width={25}
          height={25}
        >
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-696 72h136v656H184V184zm656 656H384V384h456v456zM384 320V184h456v136H384z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="hidden lg:block text-lg font-medium">Projects</span>
      </ButtonWithImage>
      <ButtonWithImage
        useButton={false}
        linkUrl="/about-me"
        ariaLabel="About Me"
        customParentClass={`nav-button ${
          pathname === "/about-me" ? "active" : ""
        } ${
          useMobile ? "mobile" : "desktop"
        } text-${iconColor} p-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded lg:flex lg:items-center lg:gap-3 lg:w-full md:hover:bg-slate-100 hover:bg-[#0299D0] dark:md:hover:bg-slate-900`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          width={25}
          height={25}
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 21c.5-4.5 2.5-8 7-10"></path>
            <path d="M9 18c6.218 0 10.5-3.288 11-12V4h-4.014c-9 0-11.986 4-12 9c0 1 0 3 2 5h3z"></path>
          </g>
        </svg>
        <span className="hidden lg:block text-lg font-medium">About Me</span>
      </ButtonWithImage>
      <ButtonWithImage
        useButton={false}
        linkUrl="/blog"
        ariaLabel="Blog"
        customParentClass={`nav-button ${
          pathname === "/blog" ? "active" : ""
        } ${
          useMobile ? "mobile" : "desktop"
        } text-${iconColor} p-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded lg:flex lg:items-center lg:gap-3 lg:w-full md:hover:bg-slate-100 hover:bg-[#0299D0] dark:md:hover:bg-slate-900`}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          width={25}
          height={25}
        >
          <path d="M4 24h10v2H4z" fill="currentColor"></path>
          <path d="M4 18h10v2H4z" fill="currentColor"></path>
          <path
            d="M26 14H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2zM6 6v6h20V6z"
            fill="currentColor"
          ></path>
          <path
            d="M26 28h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2zm-6-8v6h6v-6z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="hidden lg:block text-lg font-medium">Blog</span>
      </ButtonWithImage>
      <ButtonWithImage
        useButton={false}
        linkUrl="/contacts"
        ariaLabel="Contact"
        customParentClass={`nav-button ${
          pathname === "/contacts" ? "active" : ""
        } ${
          useMobile ? "mobile" : "desktop"
        } text-${iconColor} p-1.5 lg:px-3 lg:py-2 rounded-full lg:rounded lg:flex lg:items-center lg:gap-3 lg:w-full md:hover:bg-slate-100 hover:bg-[#0299D0] dark:md:hover:bg-slate-900`}
      >
        {" "}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          enableBackground="new 0 0 512 512"
          xmlSpace="preserve"
          width={25}
          height={25}
        >
          <path
            d="M48,270.9l118.9,44.6L181.7,464L256,360l104,104L464,48L48,270.9z M342.9,396.9L260,313.4L374.9,152
L193.6,289.8L124.9,265l291-156.2L342.9,396.9z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="hidden lg:block text-lg font-medium">Contact Me</span>
      </ButtonWithImage>
    </section>
  );
}
