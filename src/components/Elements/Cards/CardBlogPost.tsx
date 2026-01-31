import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";

export default function CardBlogPost({ post }: { post: BlogPost }) {
  const { slug, title, description, datePublished, image } = post;
  const href = `/blog/detail/${slug}`;

  return (
    <Link
      href={href}
      className="card rounded bg-slate-100 dark:bg-slate-900 inline-block group"
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full object-cover"
        />
      )}
      <section className="p-4">
        <h2 className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-200 mb-2">
          {title}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 shrink-0 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              fillRule="evenodd"
              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-2">
          {description}
        </p>
        <time
          dateTime={datePublished}
          className="text-xs text-slate-500 dark:text-slate-400"
        >
          {datePublished}
        </time>
      </section>
    </Link>
  );
}
