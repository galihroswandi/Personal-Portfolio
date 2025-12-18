"use client";
import { motion } from "framer-motion";
import CardProject from "../Elements/Cards/CardProject";
import { boxVariant } from "../utils/landingAnimation.config";

export default function BlogContent() {
  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid sm:grid-cols-2 gap-7 items-center pb-16"
    >
      <CardProject
        title="Pengertian HTML5"
        desc="HTML5 adalah sebuah kerangka kerja untuk membuat sebuah website perbedaannya terletak pada cara penulisannya yang dimana jika html sebelumnya itu belum menerapkan sistem semantik element di HTML5 sudah mendukung adanya semantik element..."
        imgProject="/img/example-blog.png"
        linkProject="/blog/detail/KSHU328DSJWH"
        target_link=""
      ></CardProject>
    </motion.section>
  );
}
