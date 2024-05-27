"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { boxVariant } from "@/utils/landingAnimation.config";

export default function AboutDesc() {
  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-slate-600 dark:text-slate-200 flex flex-col gap-6 mb-6"
    >
      <p>
        Hello! My name is Galih Roswandi, and I am a software developer based in
        Tasikmalaya City 🇮🇩. I specialize in full-stack web development. With
        more than 2 years of experience in the technology industry, I have honed
        my skills in website development using React, Bootstrap, and JavaScript
        technologies.
      </p>
      <p>
        In the course of my career, I have enjoyed working at{" "}
        <Link
          className="underline"
          target="_blank"
          href={"https://solusi247.com"}
        >
          PT. Dua Empat Tujuh (Solusi 247)
        </Link>{" "}
        as a Frontend Developer. This is where I first entered the IT industry.
        My work focuses on building scalable web applications and providing
        innovative technology solutions.
      </p>
      <p>
        My career goal is to become a successful entrepreneur. I aspire to build
        my own technology startup, creating innovative solutions that can have a
        significant impact on the industry. I believe in the power of technology
        to change lives, and I am committed to pursuing my entrepreneurial
        dreams with dedication and perseverance.
      </p>
      <p>
        Feel free to contact me at <b>galihroswandi25@gmail.com</b> or through
        the{" "}
        <Link className="underline" href="/contacts">
          Contact
        </Link>{" "}
        page, and let{"'"}s discuss how we can collaborate on interesting
        projects.
      </p>
    </motion.section>
  );
}
