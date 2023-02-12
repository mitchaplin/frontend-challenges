"use client";
import { SyntheticEvent, useState } from "react";
import styles from "./memory-game.module.css";

// TODO: Dynamically generate the cards based on the game size
// TODO: Dynamically render card size based on game size
// TODO: Add a timer
// TODO: Add a score
// TODO: Add a reset button
// TODO: Add a "go back" button
// TODO: Add a add end state screen
const getBoardData = (gameSize: number) => {
  switch (gameSize) {
    case 4:
      return { size: "20rem", cols: "grid-cols-4" };
    case 6:
      return { size: "16rem", cols: "grid-cols-6" };
    case 8:
      return { size: "12rem", cols: "grid-cols-8" };
    default:
      return { size: "20rem", cols: "grid-cols-4" };
  }
};

export default function InteractiveRating() {
  const [gameSize, setGameSize] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            value={gameSize}
            onChange={(e) => setGameSize(parseInt(e.target.value))}
            id="sizes"
            className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Choose game size</option>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
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
        <div className={`grid ${getBoardData(gameSize).cols} w-1/2 gap-12`}>
          {Array.from({ length: gameSize ** 2 }).map((item, idx) => (
            <div
              key={idx}
              className={`m-4 flex justify-center bg-red-500 py-4 h-[${
                getBoardData(gameSize).size
              }] w-[${getBoardData(gameSize).size}]`}
            >
              test
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
