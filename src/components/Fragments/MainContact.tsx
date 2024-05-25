"use client";
import React, { useEffect, useState } from "react";
import ButtonWithImage from "../Elements/Buttons/ButtonWithImage";
import sendbot from "@/services/sendbot";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function MainContact() {
  return (
    <section>
      <section className="social-media mb-5">
        <h2 className="mb-5 text-xl font-medium text-slate-600 dark:text-slate-200">
          Find me on
        </h2>
        <section className="flex items-center gap-3 flex-wrap">
          <ButtonWithImage
            useButton={false}
            blank="_blank"
            linkUrl="https://github.com/galihroswandi"
            customParentClass="text-white bg-black rounded flex items-center justify-center p-2 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 496 512"
              width={25}
              height={25}
            >
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-base font-medium">Github</span>
          </ButtonWithImage>
          <ButtonWithImage
            useButton={false}
            blank="_blank"
            linkUrl="https://www.linkedin.com/in/galih-roswandi-55a8b5271/"
            customParentClass="text-white bg-[#0A66C2] rounded flex items-center justify-center p-2 gap-2"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 448 512"
              width={25}
              height={25}
            >
              <path
                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9V416z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-base font-medium">LinkedIn</span>
          </ButtonWithImage>
          <ButtonWithImage
            useButton={false}
            blank="_blank"
            linkUrl="https://instagram.com/galih_roswandi/"
            customParentClass="bg-gradient-to-r from-[#FF9B01] via-[#FD02CE] to-[#9109F9] text-white rounded flex items-center justify-center p-2 gap-2"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 448 512"
              width={25}
              height={25}
            >
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9S287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7s74.7 33.5 74.7 74.7s-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8c-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8s26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9c-26.2-26.2-58-34.4-93.9-36.2c-37-2.1-147.9-2.1-184.9 0c-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9c1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0c35.9-1.7 67.7-9.9 93.9-36.2c26.2-26.2 34.4-58 36.2-93.9c2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6c-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6c-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6c29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6c11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-base font-medium">Instagram</span>
          </ButtonWithImage>
        </section>
      </section>
      <h2 className="mb-5 text-xl font-medium text-slate-600 dark:text-slate-200">
        Or contact me via message
      </h2>
      <FormContact />
    </section>
  );
}

const FormContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loadingContact, setLoadingContact] = useState(false);

  const theme = window.sessionStorage.getItem("theme");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingContact(true);

    sendbot({
      name,
      email,
      message,
    })
      .then((res: any) => {
        setLoadingContact(false);

        toast.success("Message sent successfully", {
          position: "bottom-left",
          autoClose: 5000,
        });

        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err: any) => {
        setLoadingContact(false);

        toast.error("Failed to send message", {
          position: "bottom-left",
          autoClose: 5000,
        });
      });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme || "light"}
      />
      <section className="flex flex-col sm:flex-row sm:items-center gap-3">
        <InputForm
          title="Name"
          type="text"
          placeholder="Enter your name"
          onchange={(value) => setName(value)}
        />
        <InputForm
          title="Email"
          type="email"
          placeholder="Enter your email"
          onchange={(value) => setEmail(value)}
        />
      </section>
      <label htmlFor="message" className="flex flex-col gap-1 mb-3">
        <span className="text-slate-600 dark:text-slate-200 text-sm">
          Message
        </span>
        <textarea
          name="message"
          id="message"
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
          className="py-2.5 px-4 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded outline-none text-slate-600 dark:text-slate-200"
          placeholder="Enter your message"
        ></textarea>
      </label>
      <button
        className={`bg-primary-blue hover:bg-gradient-to-r transition-colors duration-500 from-primary-green to-primary-blue text-white py-2.5 px-4 rounded relative flex items-center justify-center ${
          loadingContact ? "cursor-not-allowed" : ""
        }`}
        disabled={loadingContact}
      >
        <span>Send Message</span>
        {!loadingContact ? (
          <>
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
              className="absolute right-2 top-2 bottom-2"
            >
              <path
                d="M48,270.9l118.9,44.6L181.7,464L256,360l104,104L464,48L48,270.9z M342.9,396.9L260,313.4L374.9,152
L193.6,289.8L124.9,265l291-156.2L342.9,396.9z"
                fill="currentColor"
              ></path>
            </svg>
          </>
        ) : (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 animate-spin absolute right-2 top-2 bottom-2"
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
};

const InputForm = ({
  title,
  type,
  placeholder,
  onchange,
}: {
  title: string;
  type: string;
  placeholder: string;
  onchange: (value: string) => void;
}) => {
  return (
    <label htmlFor={title.toLowerCase()} className="flex flex-col gap-1 w-full">
      <span className="text-slate-600 dark:text-slate-200 text-sm">
        {title}
      </span>
      <input
        type={type}
        name={title.toLowerCase()}
        id={title.toLowerCase()}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onchange(e.target.value)}
        className="w-full py-2.5 px-4 border dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded outline-none text-slate-600 dark:text-slate-200"
      />
    </label>
  );
};
