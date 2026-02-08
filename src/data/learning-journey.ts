export type LearningStatus = "learning" | "completed" | "planned";

export interface LearningJourneyItem {
  id: string;
  title: string;
  description?: string;
  status: LearningStatus;
  progress?: number;
  startedAt?: string;
  resourceUrl?: string;
  techStack?: string[];
}

export const learningJourneyItems: LearningJourneyItem[] = [
  // {
  //   id: "1",
  //   title: "Next.js App Router",
  //   description:
  //     "Deep dive into server components, routing, and data fetching patterns.",
  //   status: "learning",
  //   progress: 60,
  //   startedAt: "2025-01-15",
  //   resourceUrl: "https://nextjs.org/docs",
  //   techStack: ["/icons/nextjs.svg", "/icons/typescript.svg"],
  // },
];
