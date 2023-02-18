"use client";
import { useCurrentSelectedContext } from "@/utils/context/CurrentSelectedContext";
import { useLockedNamesContext } from "@/utils/context/LockedNamedContext";
import { iconArr } from "@/utils/imports";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
import styles from "./memory-game.module.css";

// TODO: Add a timer
// TODO: Add a add end state screen
export type Icon = {
  name: string;
  img: React.ReactNode;
};
export type BoardData = {
  size: string;
  cols: string;
  icons: Icon[];
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
        size: "16rem",
        cols: "grid-cols-2",
        icons: shuffledPairs,
      };
    case 4:
      return {
        size: "12rem",
        cols: "grid-cols-4",
        icons: shuffledPairs,
      };
    case 6:
      return { size: "8rem", cols: "grid-cols-6", icons: shuffledPairs };
    default:
      return {
        size: "16rem",
        cols: "grid-cols-2",
        icons: shuffledPairs,
      };
  }
};

export default function MemoryGame() {
  const { currentSelected, setCurrentSelected } = useCurrentSelectedContext();
  const { lockedNames, setLockedNames } = useLockedNamesContext();
  const [gameSize, setGameSize] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<BoardData>();
  const router = useRouter();
  const handleSubmit = (e: SyntheticEvent) => {
    if (gameSize === 0) {
      alert("Please select a game size");
      return;
    }
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setBoardData(getBoardData(gameSize));
    }
  }, [setBoardData, submitted, gameSize]);

  useEffect(() => {}, [lockedNames, currentSelected]);

  return (
    <main className={styles.main}>
      <div className="relative z-[0] flex w-screen flex-row justify-between gap-4 p-4 xl:absolute">
        <div className="gap-4">
          <button
            onClick={() => {
              router.push("/");
              setLockedNames([]);
              setCurrentSelected({
                name: "",
                index: -1,
                hide: false,
                score: 0,
                locked: false,
              });
            }}
            className="my-12 h-fit rounded-lg bg-gray-700 p-2 text-white"
          >
            Go Back
          </button>
        </div>
        {submitted && (
          <div className="flex flex-col">
            <h1 className="my-2 rounded-lg p-2 text-3xl text-white">
              Total Guesses:&nbsp;{currentSelected.score}
            </h1>
            {submitted && (
              <button
                onClick={() => {
                  setSubmitted(false);
                  setLockedNames([]);
                  setCurrentSelected({
                    name: "",
                    index: -1,
                    hide: false,
                    score: 0,
                    locked: false,
                  });
                }}
                className="m-2 h-fit rounded-lg bg-gray-700 p-2 text-white"
              >
                Reset
              </button>
            )}
          </div>
        )}
      </div>
      {!submitted ? (
        <div className="z-10 m-auto flex h-60 w-[24rem] flex-col gap-4">
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
            <option value={0} selected>
              Select Game Size
            </option>
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
        <div className={`grid ${boardData?.cols} z-12 m-auto w-fit`}>
          {boardData?.icons.map((item, idx) => (
            <div
              key={idx}
              className={`m-3 flex justify-center h-[${boardData?.size}] w-[${boardData?.size}]`}
            >
              <CardComponent name={item.name} img={item.img} index={idx} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
