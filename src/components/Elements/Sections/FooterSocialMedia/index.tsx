import Link from "next/link";
import React from "react";

export default function FooterSocialMedia({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-start mb-10">{children}</section>
  );
}

const SocialMedia = ({ url, text }: { url: string; text: string }) => {
  return (
    <Link
      href={url}
      className="text-6xl lg:text-7xl lg:font-fraunces-regular font-medium font-fraunces-72pt-regular text-slate-800"
      target="_blank"
    >
      {text}
    </Link>
  );
};

FooterSocialMedia.SocialMedia = SocialMedia;
