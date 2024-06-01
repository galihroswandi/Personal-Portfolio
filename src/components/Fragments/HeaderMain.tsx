"use client";
import { boxVariant } from "@/utils/landingAnimation.config";
import { motion } from "framer-motion";
export default function HeaderMain({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-slate-600 dark:border-slate-300 border-dashed py-4 md:py-6 md:pt-5 mb-6">
      <motion.section
        variants={boxVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <TextTitle textname={title} />
        {children}
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-200">
          {desc}
        </p>
      </motion.section>
    </header>
  );
}

const TextTitle = (props: { textname: string }) => {
  return (
    <h1 className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-200 mb-0.5 md:mb-2">
      {props.textname}
    </h1>
  );
};
