import { Metadata } from "next";
import { blogJsonld } from "@/seo/blog";
import ParticlesBackground from "@/components/utils/ParticlesBackground";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <>
      <ParticlesBackground customParentClass="hidden dark:block" />
      <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden"></section>
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
