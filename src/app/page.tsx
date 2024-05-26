import TechStack from "@/components/Elements/Sections/TechStack";
import CareerMain from "@/components/Fragments/CareerMain";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Services from "@/components/Fragments/Services";
import Sidebar from "@/components/Fragments/Sidebar";
import { homeJsonld } from "@/seo/home";
import { Metadata } from "next";

export default function Home() {
  return (
    <>
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
              <List textname="Software Developer" />
              <List textname="Based In Tasikmalaya 🇮🇩" />
            </section>
          </HeaderMain>
          <CareerMain />
          <Services />
          <TechStack />
        </main>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonld()),
        }}
      ></script>
    </>
  );
}

export const metadata: Metadata = {
  title: "Discover the Work of Galih Roswandi, Software Developer",
  description:
    "Explore the portfolio of Galih Roswandi, a passionate software developer dedicated to creating innovative digital solutions.",
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/`,
    languages: {
      "en-US": "/en-US",
      "id-ID": "/id-ID/about-me",
    },
  },
  openGraph: {
    countryName: "Indonesia",
    title: "Discover the Work of Galih Roswandi, Software Developer",
    description:
      "Explore the portfolio of Galih Roswandi, a passionate software developer dedicated to creating innovative digital solutions.",
  },
};

const List = (props: { textname: string }) => {
  return (
    <ul className="list-disc">
      <li className="text-sm md:text-base text-slate-600 dark:text-slate-300">
        {props.textname}
      </li>
    </ul>
  );
};
