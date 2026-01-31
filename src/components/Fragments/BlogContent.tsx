"use client";

import { motion } from "framer-motion";
import CardBlogPost from "../Elements/Cards/CardBlogPost";
import { boxVariant } from "../utils/landingAnimation.config";
import { blogPosts } from "@/data/blog";

export default function BlogContent() {
  const firstPost = blogPosts[0];
  if (!firstPost) return null;

  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid sm:grid-cols-2 gap-7 items-center pb-16"
    >
      <CardBlogPost post={firstPost} />
    </motion.section>
  );
}
