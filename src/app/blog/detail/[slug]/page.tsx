import { Metadata } from "next";
import { blogJsonld } from "@/seo/blog";
import ParticlesBackground from "@/utils/ParticlesBackground";
import BlogHeader from "@/components/Fragments/BlogHeader";

export default function page() {
  return (
    <>
      <ParticlesBackground customParentClass="hidden dark:block" />
      <main className="w-full px-5 py-5 md:pl-20 lg:pl-72 lg:py-3 relative md:px-5lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden">
        <BlogHeader />
      </main>
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
  title: "Pengertian dan penggunaan HTML",
  description:
    "Dive into Galih Roswandi's blog, where he shares insights, tips, and experiences in the world of software development, technology, and more.",
  alternates: {
    canonical: `${process.env.NEXT_SITE_URL}/blog/detail`,
  },
  openGraph: {
    countryName: "Indonesia",
    title: "Pengertian dan penggunaan HTML",
    description:
      "Dive into Galih Roswandi's blog, where he shares insights, tips, and experiences in the world of software development, technology, and more.",
  },
};
