"use client";

import CardBlogPost from "@/components/Elements/Cards/CardBlogPost";
import type { BlogPost } from "@/data/blog";
import { motion } from "framer-motion";
import { boxVariant } from "@/components/utils/landingAnimation.config";

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid sm:grid-cols-2 gap-7 items-stretch pb-16"
    >
      {posts.map((post) => (
        <CardBlogPost key={post.slug} post={post} />
      ))}
    </motion.section>
  );
}
