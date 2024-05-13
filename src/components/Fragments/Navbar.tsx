import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonWithImage from "../Elements/Buttons/ButtonWithImage";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 w-full h-16 bg-primary-blue rounded-t-[27.5px] shadow-inner-shadow px-1 flex items-center justify-between gap-3">
      <section className="border-r border-[#67B5D2] p-2">
        <Image
          src={"/img/me.png"}
          alt="Profile Image"
          width={1000}
          height={1000}
          className="w-10"
        />
      </section>
      <section className="flex items-center gap-1.5 400:gap-4 sm:gap-7">
        <ButtonWithImage
          useButton={false}
          customParentClass="text-white bg-gradient-to-b from-[#0A66C2] to-[#5FA04E] p-1.5 rounded-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.47 3.841C11.6106 3.70055 11.8013 3.62166 12 3.62166C12.1988 3.62166 12.3894 3.70055 12.53 3.841L21.22 12.531C21.2892 12.6026 21.372 12.6597 21.4635 12.699C21.5551 12.7382 21.6535 12.7589 21.7531 12.7597C21.8526 12.7605 21.9514 12.7415 22.0435 12.7037C22.1357 12.666 22.2194 12.6102 22.2898 12.5398C22.3602 12.4693 22.4158 12.3856 22.4535 12.2934C22.4912 12.2012 22.5101 12.1024 22.5092 12.0028C22.5083 11.9033 22.4875 11.8049 22.4482 11.7134C22.4088 11.6219 22.3517 11.5392 22.28 11.47L13.591 2.78C13.3821 2.57106 13.134 2.40533 12.861 2.29225C12.5881 2.17918 12.2955 2.12098 12 2.12098C11.7045 2.12098 11.4119 2.17918 11.139 2.29225C10.866 2.40533 10.6179 2.57106 10.409 2.78L1.719 11.47C1.6474 11.5392 1.59031 11.622 1.55104 11.7135C1.51178 11.805 1.49114 11.9035 1.49032 12.0031C1.4895 12.1026 1.50853 12.2014 1.54628 12.2935C1.58403 12.3857 1.63976 12.4694 1.71022 12.5398C1.78067 12.6102 1.86443 12.6658 1.95662 12.7035C2.04881 12.7412 2.14758 12.7601 2.24716 12.7592C2.34675 12.7583 2.44515 12.7375 2.53664 12.6982C2.62812 12.6588 2.71085 12.6017 2.78 12.53L11.47 3.841Z"
              fill="currentColor"
            />
            <path
              d="M12 5.432L20.159 13.591C20.189 13.621 20.219 13.649 20.25 13.677V19.875C20.25 20.91 19.41 21.75 18.375 21.75H15C14.8011 21.75 14.6103 21.671 14.4697 21.5303C14.329 21.3897 14.25 21.1989 14.25 21V16.5C14.25 16.3011 14.171 16.1103 14.0303 15.9697C13.8897 15.829 13.6989 15.75 13.5 15.75H10.5C10.3011 15.75 10.1103 15.829 9.96967 15.9697C9.82902 16.1103 9.75 16.3011 9.75 16.5V21C9.75 21.1989 9.67098 21.3897 9.53033 21.5303C9.38968 21.671 9.19891 21.75 9 21.75H5.625C5.12772 21.75 4.65081 21.5525 4.29917 21.2008C3.94754 20.8492 3.75 20.3723 3.75 19.875V13.677C3.78111 13.6492 3.81146 13.6205 3.841 13.591L12 5.432Z"
              fill="currentColor"
            />
          </svg>
        </ButtonWithImage>
        <ButtonWithImage useButton={false} customParentClass="text-white p-1.5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 4.5V19.5M15 4.5V19.5M4.125 19.5H19.875C20.496 19.5 21 18.996 21 18.375V5.625C21 5.004 20.496 4.5 19.875 4.5H4.125C3.504 4.5 3 5.004 3 5.625V18.375C3 18.996 3.504 19.5 4.125 19.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonWithImage>
        <Link href={"/"} className="text-white p-1.5">
          <Image
            src={"/icons/feather.svg"}
            alt="Home Icon"
            width={100}
            height={100}
            className="w-7"
          />
        </Link>
        <Link href={"/"} className="text-white p-1.5">
          <Image
            src={"/icons/blog.svg"}
            alt="Home Icon"
            width={100}
            height={100}
            className="w-7"
          />
        </Link>
        <Link href={"/"} className="text-white p-1.5">
          <Image
            src={"/icons/plane.svg"}
            alt="Home Icon"
            width={100}
            height={100}
            className="w-7"
          />
        </Link>
      </section>
      <section className="flex items-center border-l border-[#67B5D2] p-2">
        <ButtonWithImage
          useButton={true}
          imgUrl="/icons/sun.svg"
          customParentClass="dark-light"
          customImageClass="w-7"
        />
      </section>
    </nav>
  );
}
