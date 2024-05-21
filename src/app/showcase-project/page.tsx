import CardsProject from "@/components/Fragments/CardsProject";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";

export default function Home() {
  return (
    <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto">
      <Navbar />
      <Sidebar />
      <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
        <HeaderMain
          title="Projects"
          desc="Showcase projects that I have worked on"
        />
        <CardsProject />
      </main>
    </section>
  );
}
