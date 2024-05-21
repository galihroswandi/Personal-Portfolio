import TechStack from "@/components/Elements/Sections/TechStack";
import CareerMain from "@/components/Fragments/CareerMain";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Services from "@/components/Fragments/Services";
import Sidebar from "@/components/Fragments/Sidebar";

export default function Home() {
  return (
    <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto">
      <Navbar />
      <Sidebar />
      <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
        <HeaderMain />
        <CareerMain />
        <Services />
        <TechStack />
      </main>
    </section>
  );
}
