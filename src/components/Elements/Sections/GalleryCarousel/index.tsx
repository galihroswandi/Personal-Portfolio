"use client";
import { slideData } from "@/utils/JSON/certificateData";
import ImgSlide from "./ImgSlide";
import ContentHover from "./ContentHover";

export default function GalleryCarousel() {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5">
      {slideData.map((slide, index) => (
        <div className="group" key={index}>
          <figure
            className="relative overflow-hidden rounded-2xl border border-slate-800 group-hover:rounded-none transition-all duration-500"
            id="main-gallery"
          >
            <ImgSlide source={slide.source} />
            <ContentHover slide={slide}>
              <ContentHover.Text />
              <ContentHover.ImageCredential />
            </ContentHover>
          </figure>
          <span>{slide.caption}</span>
        </div>
      ))}
    </div>
  );
}
