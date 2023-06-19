import React from "react";
import FooterSocialMedia from "../Elements/Sections/FooterSocialMedia";
import Input from "../Elements/Input";

export default function Contact({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-7 py-1.5 lg:py-5 md:px-5 lg:px-10 w-full secondary section -mt-4 md:-mt-24 relative">
      {children}
    </section>
  );
}

const Header = () => {
  return (
    <header className="w-fit">
      <h1 className="text-6xl mt-5 font-medium mb-8 font-fraunces-72pt-regular text-slate-800 tracking-tight">
        Let’s Talk.
      </h1>
      <p className="mb-2">Follow Me</p>
      <FooterSocialMedia>
        <FooterSocialMedia.SocialMedia
          url="https://www.instagram.com/galih_roswandi/"
          text="INSTAGRAM"
        />
        <FooterSocialMedia.SocialMedia
          url="https://www.facebook.com"
          text="FACEBOOK"
        />
        <FooterSocialMedia.SocialMedia
          url="https://www.linkedin.com/in/galih-roswandi-55a8b5271/"
          text="LINKEDIN"
        />
      </FooterSocialMedia>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full xl:max-w-[50%]">
      <form className="mb-16 md:mb-0 flex flex-col gap-y-5">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="email" placeholder="Email Address" />
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={3}
          placeholder="Message"
          className="border border-slate-800 placeholder:text-slate-500 text-slate-800 py-2 px-4 bg-transparent focus:outline-none rounded-sm"
        ></textarea>
        <button
          type="submit"
          className="py-2.5 px-10 bg-slate-800 text-white rounded-full w-fit text-lg"
        >
          Send
        </button>
      </form>
    </footer>
  );
};

const Copyright = () => {
  return (
    <p className="text-xs text-center text-slate-800 mb-20 md:mb-5">
      &copy; 2023 galihroswandi. All rights reserved
    </p>
  );
};

Contact.Header = Header;
Contact.Footer = Footer;
Contact.Copyright = Copyright;
