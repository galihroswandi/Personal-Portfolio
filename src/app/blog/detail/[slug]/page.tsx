import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";
import MarkdownContent from "@/components/Elements/small/MarkdownContent";
import ParticlesBackground from "@/components/utils/ParticlesBackground";
import { blogJsonld } from "@/seo/blog";
import { blogPosts, getPostBySlug } from "@/data/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }
  const url = `${process.env.NEXT_SITE_URL}/blog/detail/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      countryName: "Indonesia",
      title: post.title,
      description: post.description,
      url,
    },
  };
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ParticlesBackground customParentClass="hidden dark:block" />
      <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden">
        <Navbar />
        <Sidebar />
        <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
          <article className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-200 mb-2">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <time dateTime={post.datePublished}>
                Published: {post.datePublished}
              </time>
              {post.dateModified && (
                <time dateTime={post.dateModified}>
                  Updated: {post.dateModified}
                </time>
              )}
            </div>
            {post.image && (
              <div className="mb-6 rounded overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                />
              </div>
            )}
            <MarkdownContent content={post.content} />
          </article>
        </main>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonld()),
        }}
      />
    </>
  );
}
