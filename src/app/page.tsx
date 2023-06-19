import BackToTop from "@/components/Elements/Button/BackToTop";
import HeaderSkills from "@/components/Elements/Headers/HeaderSkills";
import About from "@/components/Fragments/About";
import Contact from "@/components/Fragments/Contact";
import GallerySerticate from "@/components/Fragments/GallerySerticate";
import Navbar from "@/components/Fragments/Navbar";
import Projects from "@/components/Fragments/Projects";
import Skills from "@/components/Fragments/Skills";

export default function Home() {
  return (
    <div className="min-h-screen primary relative">
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
      <Projects>
        <Projects.Header />
        <Projects.MainProjects />
      </Projects>
      <Contact>
        <HeaderSkills text="Contact" numberSection={5} />
        <section className="md:flex md:justify-between md:items-center md:gap-x-8">
          <Contact.Header />
          <Contact.Footer />
        </section>
        <Contact.Copyright />
      </Contact>
      <BackToTop />
    </div>
  );
}
