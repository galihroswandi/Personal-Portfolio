import HeaderMain from "@/components/Fragments/HeaderMain";
import MainContact from "@/components/Fragments/MainContact";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";
import { Metadata } from "next";

export default function page() {
  return (
    <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden">
      <Navbar />
      <Sidebar />
      <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
        <HeaderMain title="Contact" desc="Let's Talk" />
        <MainContact />
      </main>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Get in Touch with Galih Roswandi",
  description:
    "Contact Galih Roswandi effortlessly using the contact details provided on this page. Whether it's a professional inquiry or just to say hello, feel free to get in touch.",
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/contacts`,
  },
  openGraph: {
    countryName: "Indonesia",
    title: "Get in Touch with Galih Roswandi",
    description:
      "Contact Galih Roswandi effortlessly using the contact details provided on this page. Whether it's a professional inquiry or just to say hello, feel free to get in touch.",
  },
};
