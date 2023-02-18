export type Project = {
  name: string;
  difficulty: "Newbie" | "Intermediate" | "Advanced";
  tags: string[];
  completed: string;
  link: string;
};

export const projects: Project[] = [
  {
    name: "Interactive Rating",
    difficulty: "Newbie",
    tags: ["React", "Tailwind", "TypeScript", "Next"],
    completed: "Feb 9, 2023",
    link: "./interactive-rating",
  },
  {
    name: "Memory Game",
    difficulty: "Intermediate",
    tags: ["React", "Tailwind", "TypeScript", "Next"],
    completed: "Feb 11, 2023",
    link: "./memory-game",
  },
  {
    name: "Checkout Line",
    difficulty: "Intermediate",
    tags: ["React", "Tailwind", "TypeScript", "Next"],
    completed: "Feb 11, 2023",
    link: "./checkout-line",
  },
];

export const projectColor = (difficulty: string) => {
  switch (difficulty) {
    case "Newbie":
      return "bg-green-200";
    case "Intermediate":
      return "bg-orange-500";
    case "Advanced":
      return "bg-red-500";
    default:
      return "bg-green-200";
  }
};
