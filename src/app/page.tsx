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
        <HeaderMain
          title="Hi, I'm Galih Roswandi"
          desc="Enthusiastic to continue working in the field of technology, especially
        websites. Experienced in creating websites that focus on frontend
        development."
        >
          <section className="profesional flex items-center gap-7 px-3 mb-3 md:mb-5">
            <List textname="Software Engineer" />
            <List textname="Based In Tasikmalaya" />
          </section>
        </HeaderMain>
        <CareerMain />
        <Services />
        <TechStack />
      </main>
    </section>
  );
}

const List = (props: { textname: string }) => {
  return (
    <ul className="list-disc">
      <li className="text-sm md:text-base text-slate-600">{props.textname}</li>
    </ul>
  );
};
