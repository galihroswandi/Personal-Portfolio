import React, { ReactNode } from "react";
import HeaderSkills from "../Elements/Headers/HeaderSkills";
import GalleryCarousel from "../Elements/Sections/GalleryCarousel";

export default function GallerySerticate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="px-7 py-1.5 lg:py-5 pb-10 md:px-5 lg:px-10 w-full primary section -mt-4">
      {children}
    </section>
  );
}

const Header = () => {
  return <HeaderSkills text="Gallery Serticate" numberSection={3} />;
};

const MainGallery = () => {
  return <GalleryCarousel />;
};

GallerySerticate.Header = Header;
GallerySerticate.MainGallery = MainGallery;
