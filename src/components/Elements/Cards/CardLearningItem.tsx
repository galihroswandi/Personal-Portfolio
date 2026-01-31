"use client";

import Image from "next/image";
import Link from "next/link";
import type { LearningJourneyItem } from "@/data/learning-journey";

const statusLabels: Record<LearningJourneyItem["status"], string> = {
  learning: "Learning",
  completed: "Completed",
  planned: "Planned",
};

const statusBadgeClass: Record<
  LearningJourneyItem["status"],
  string
> = {
  learning:
    "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  completed:
    "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  planned:
    "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

const progressBarClass: Record<
  LearningJourneyItem["status"],
  string
> = {
  learning: "bg-blue-500",
  completed: "bg-green-500",
  planned: "bg-slate-400 dark:bg-slate-500",
};

export default function CardLearningItem({
  item,
}: {
  item: LearningJourneyItem;
}) {
  const { title, description, status, progress, resourceUrl, techStack } =
    item;
  const showProgress =
    progress !== undefined && (status === "learning" || status === "completed");

  const content = (
    <section className="card rounded bg-slate-100 dark:bg-slate-900 p-4 group">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <h2 className="text-lg text-slate-600 dark:text-slate-200">
          {title}
        </h2>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${statusBadgeClass[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {description}
        </p>
      )}
      {showProgress && (
        <div className="mb-3">
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressBarClass[status]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {progress}%
          </p>
        </div>
      )}
      {resourceUrl && (
        <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 mb-3">
          <span className="truncate">Resource</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 shrink-0 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              fillRule="evenodd"
              d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {techStack && techStack.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          {techStack.map((logoUrl) => (
            <Image
              key={logoUrl}
              src={logoUrl}
              alt=""
              width={28}
              height={28}
              className="w-7"
            />
          ))}
        </div>
      )}
    </section>
  );

  if (resourceUrl) {
    return (
      <Link
        href={resourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
