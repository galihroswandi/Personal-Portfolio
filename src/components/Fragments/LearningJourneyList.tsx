"use client";

import CardLearningItem from "@/components/Elements/Cards/CardLearningItem";
import type { LearningJourneyItem } from "@/data/learning-journey";
import { motion } from "framer-motion";
import { boxVariant } from "@/components/utils/landingAnimation.config";

const STATUS_ORDER: LearningJourneyItem["status"][] = [
  "learning",
  "completed",
  "planned",
];

const SECTION_TITLES: Record<LearningJourneyItem["status"], string> = {
  learning: "Currently learning",
  completed: "Completed",
  planned: "Planned",
};

function groupByStatus(
  items: LearningJourneyItem[]
): Record<LearningJourneyItem["status"], LearningJourneyItem[]> {
  const groups: Record<
    LearningJourneyItem["status"],
    LearningJourneyItem[]
  > = {
    learning: [],
    completed: [],
    planned: [],
  };
  for (const item of items) {
    groups[item.status].push(item);
  }
  return groups;
}

export default function LearningJourneyList({
  items,
}: {
  items: LearningJourneyItem[];
}) {
  const grouped = groupByStatus(items);

  return (
    <motion.section
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-10 pb-16"
    >
      {STATUS_ORDER.map((status) => {
        const list = grouped[status];
        if (list.length === 0) return null;

        return (
          <div key={status}>
            <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-200 mb-4">
              {SECTION_TITLES[status]}
            </h2>
            <div className="grid sm:grid-cols-2 gap-7 items-stretch">
              {list.map((item) => (
                <CardLearningItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </motion.section>
  );
}
