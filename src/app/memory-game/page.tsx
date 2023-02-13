"use client";
import { iconArr } from "@/utils/imports";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import styles from "./memory-game.module.css";
// TODO: Add a timer
// TODO: Add a score
// TODO: Add a reset button
// TODO: Add a "go back" button
// TODO: Add a add end state screen
type BoardData = {
  size: string;
  cols: string;
  icons: {
    name: string;
    img: React.ReactNode;
  }[];
};
const getBoardData = (gameSize: number): BoardData => {
  const dataSet =
    gameSize === 6
      ? [...iconArr.slice(0, gameSize * 3)]
      : gameSize === 4
      ? [...iconArr.slice(0, gameSize * 2)]
      : [...iconArr.slice(0, gameSize)];
  const pairs = [...dataSet, ...dataSet];
  const shuffledPairs = [...pairs.sort(() => 0.5 - Math.random())];
  switch (gameSize) {
    case 2:
      return {
        size: "20rem",
        cols: "grid-cols-2",
        icons: shuffledPairs,
      };
    case 4:
      return {
        size: "16rem",
        cols: "grid-cols-4",
        icons: shuffledPairs,
      };
    case 6:
      return { size: "12rem", cols: "grid-cols-6", icons: shuffledPairs };
    default:
      return {
        size: "20rem",
        cols: "grid-cols-2",
        icons: shuffledPairs,
      };
  }
};

export default function InteractiveRating() {
  const [gameSize, setGameSize] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<BoardData>();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flipCount, setFlipCount] = useState<number>(0);

  const handleSubmit = (e: SyntheticEvent) => {
    if (gameSize === 0) {
      alert("Please select a game size");
      return;
    }
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFlip = (e: any) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (submitted) {
      setBoardData(getBoardData(gameSize));
    }
  }, [setBoardData, submitted, gameSize]);

  return (
    <main className={styles.main}>
      {!submitted ? (
        <div className="m-auto flex h-24 w-[24rem] flex-col gap-4">
          <label
            htmlFor="sizes"
            className="mb-2 block text-3xl font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            required
            placeholder="Choose game size"
            value={gameSize}
            onChange={(e) => setGameSize(parseInt(e.target.value))}
            id="sizes"
            className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Choose game size</option>
            <option value={2}>2x2</option>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
          </select>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="rounded-full bg-slate-400 p-2"
          >
            Submit Size
          </button>
        </div>
      ) : (
        <div className={`grid ${boardData?.cols} w-fit`}>
          {boardData?.icons.map((item, idx) => (
            <div
              key={idx}
              className={`m-3 flex justify-center h-[${boardData?.size}] w-[${boardData?.size}]`}
            >
              <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection="horizontal"
                key={idx}
              >
                <button
                  onClick={handleFlip}
                  className={`flex justify-center h-[${boardData?.size}] w-[${boardData?.size}]`}
                >
                  <div className="max-w-sm rounded-lg border border-gray-200 bg-gray-800 p-6 text-gray-800 shadow dark:border-gray-700 dark:bg-gray-800">
                    <QuestionMarkCircleIcon className="h-12 w-12" />
                  </div>
                </button>
                <button
                  key={idx}
                  onClick={handleFlip}
                  className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
                >
                  {item.img}
                </button>
              </ReactCardFlip>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
