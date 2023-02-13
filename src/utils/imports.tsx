import {
  BugAntIcon,
  CakeIcon,
  CalculatorIcon,
  ClockIcon,
  CloudIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  FireIcon,
  HeartIcon,
  KeyIcon,
  LightBulbIcon,
  PaintBrushIcon,
  PencilIcon,
  ScaleIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";

export const iconArr = [
  { name: "pencil", img: <PencilIcon className="h-12 w-12 text-white" /> },
  { name: "heart", img: <HeartIcon className="h-12 w-12 text-white" /> },
  { name: "cake", img: <CakeIcon className="h-12 w-12 text-white" /> },
  { name: "clock", img: <ClockIcon className="h-12 w-12 text-white" /> },
  { name: "cloud", img: <CloudIcon className="h-12 w-12 text-white" /> },
  { name: "envelope", img: <EnvelopeIcon className="h-12 w-12 text-white" /> },
  {
    name: "lightbulb",
    img: <LightBulbIcon className="h-12 w-12 text-white" />,
  },
  { name: "fire", img: <FireIcon className="h-12 w-12 text-white" /> },
  {
    name: "facesmile",
    img: <FaceSmileIcon className="h-12 w-12 text-white" />,
  },
  {
    name: "paintbrush",
    img: <PaintBrushIcon className="h-12 w-12 text-white" />,
  },
  {
    name: "calculator",
    img: <CalculatorIcon className="h-12 w-12 text-white" />,
  },
  { name: "scale", img: <ScaleIcon className="h-12 w-12 text-white" /> },
  { name: "star", img: <StarIcon className="h-12 w-12 text-white" /> },
  { name: "bugant", img: <BugAntIcon className="h-12 w-12 text-white" /> },
  { name: "key", img: <KeyIcon className="h-12 w-12 text-white" /> },
  { name: "trophy", img: <TrophyIcon className="h-12 w-12 text-white" /> },
  { name: "truck", img: <TruckIcon className="h-12 w-12 text-white" /> },
  { name: "sparkles", img: <SparklesIcon className="h-12 w-12 text-white" /> },
] as {
  name: string;
  img: React.ReactNode;
}[];
