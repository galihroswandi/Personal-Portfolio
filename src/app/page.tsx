import About from "@/components/Fragments/About";
import GallerySerticate from "@/components/Fragments/GallerySerticate";
import Navbar from "@/components/Fragments/Navbar";
import Skills from "@/components/Fragments/Skills";

export default function Home() {
  return (
    <div className="min-h-screen pb-20 primary relative">
      <Navbar>
        <Navbar.Title
          classimg="w-14 md:w-16 lg:w-20 xl:w-24 h-14 md:h-16 lg:h-20 xl:h-24"
          classname=""
        />
        <Navbar.NavLink />
      </Navbar>
      <Navbar.NavbarSlide />
      <About>
        <About.NameTag />
        <About.Content />
      </About>
      <Skills>
        <Skills.Header />
        <Skills.Main />
      </Skills>
      <GallerySerticate>
        <GallerySerticate.Header />
        <GallerySerticate.MainGallery />
      </GallerySerticate>
    </div>
  );
}
