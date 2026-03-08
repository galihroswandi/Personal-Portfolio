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
  totalMaterials?: number;
  completedMaterials?: number;
}

const calculateProgress = (
  completedMaterials: number,
  totalMaterials: number,
): number => {
  return Math.ceil((completedMaterials / totalMaterials) * 100);
};

export const learningJourneyItems: LearningJourneyItem[] = [
  {
    id: "1",
    title: "C++ Basics",
    description:
      "Learning the fundamentals of C++ programming, including syntax, data types, and basic algorithms.",
    status: "learning",
    progress: calculateProgress(37, 87),
    startedAt: "2026-03-06",
    resourceUrl:
      "https://www.youtube.com/watch?v=RElB-9YjIZA&list=PLZS-MHyEIRo4Ze0bbGB1WKBSNMPzi-eWI&index=37&t=3s",
    techStack: ["/icons/cpp.svg"],
    totalMaterials: 87,
    completedMaterials: 10,
  },
];
