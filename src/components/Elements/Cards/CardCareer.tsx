"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { boxVariant } from "@/components/utils/landingAnimation.config";

export default function CardCareer() {
  const calculateMonthsSiceAugust = () => {
    const startDate = new Date(2023, 7, 1);
    const currentDate = new Date();

    let months;
    months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += currentDate.getMonth();

    return months;
  };

  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card bg-slate-100 dark:bg-slate-900 w-fit p-4 rounded flex justify-between items-center gap-2 sm:gap-3"
    >
      <Image
        src={"/img/solusi247.png"}
        alt="Solusi 247"
        width={1000}
        height={100}
        className="w-24 sm:w-32"
      />
      <section className="flex flex-col gap-1.5">
        <h2 className="text-base text-slate-600 dark:text-slate-300">
          Frontend Developer
        </h2>
        <section className="flex items-center gap-6">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Solusi 247
          </p>
          <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc">
            <li>Yogyakarta</li>
          </ul>
        </section>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          1 August 2023 - Present
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          ~ {calculateMonthsSiceAugust()} months
        </p>
      </section>
    </motion.section>
  );
}
