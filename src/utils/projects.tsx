export type Project = {
  name: string;
  difficulty: string;
  tags: string[];
  completed: string;
  link: string;
};
export const projects = [
  {
    name: "Interactive Rating",
    difficulty: "Newbie",
    tags: ["React", "Tailwind", "TypeScript", "Next"],
    completed: "Feb 9, 2023",
    link: "./interactive-rating",
  },
];
