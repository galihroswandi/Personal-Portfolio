import LearningJourneyList from "@/components/Fragments/LearningJourneyList";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import { learningJourneyJsonld } from "@/seo/learning-journey";
import { learningJourneyItems } from "@/data/learning-journey";
import { Metadata } from "next";

export default function page() {
  return (
    <>
      <ParticlesBackground customParentClass="hidden dark:block" />
      <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden">
        <Navbar />
        <Sidebar />
        <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
          <HeaderMain
            title="Learning Journey"
            desc="Continuous growth through exploration and practice"
          />
          <LearningJourneyList items={learningJourneyItems} />
        </main>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(learningJourneyJsonld()),
        }}
      />
    </>
  );
}

export const metadata: Metadata = {
  title: "Learning Journey - Galih Roswandi",
  description:
    "What Galih Roswandi is currently learning: skills, technologies, and topics in progress. See the learning journey and growth in practice.",
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/learning-journey`,
  },
  openGraph: {
    countryName: "Indonesia",
    title: "Learning Journey - Galih Roswandi",
    description:
      "What Galih Roswandi is currently learning: skills, technologies, and topics in progress.",
  },
};
