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
  {
    id: "1",
    title: "Next.js App Router",
    description:
      "Deep dive into server components, routing, and data fetching patterns.",
    status: "learning",
    progress: 60,
    startedAt: "2025-01-15",
    resourceUrl: "https://nextjs.org/docs",
    techStack: ["/icons/nextjs.svg", "/icons/typescript.svg"],
  },
  {
    id: "2",
    title: "Solidity & Smart Contracts",
    description: "Building decentralized applications and understanding EVM.",
    status: "planned",
    techStack: ["/icons/solidity.svg", "/icons/blockchain.svg"],
  },
  {
    id: "3",
    title: "System Design",
    description: "Scalable system design and distributed systems fundamentals.",
    status: "completed",
    progress: 100,
    startedAt: "2024-09-01",
  },
];
