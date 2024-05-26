import { Metadata } from "next";
import NotBlog from "@/components/Elements/Errors/NotBlog";
import HeaderMain from "@/components/Fragments/HeaderMain";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";
import { blogJsonld } from "@/seo/blog";

export default function page() {
  return (
    <>
      <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto">
        <Navbar />
        <Sidebar />
        <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
          <HeaderMain title="Blog" desc="Showcase of my writing" />
          <NotBlog />
        </main>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonld()),
        }}
      ></script>
    </>
  );
}

export const metadata: Metadata = {
  title: "Explore Galih Roswandi's Blog",
  description:
    "Dive into Galih Roswandi's blog, where he shares insights, tips, and experiences in the world of software development, technology, and more.",
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/blog`,
  },
  openGraph: {
    countryName: "Indonesia",
    title: "Explore Galih Roswandi's Blog",
    description:
      "Dive into Galih Roswandi's blog, where he shares insights, tips, and experiences in the world of software development, technology, and more.",
  },
};
