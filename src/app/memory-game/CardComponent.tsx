import { useCurrentSelectedContext } from "@/utils/context/CurrentSelectedContext";
import { useLockedNamesContext } from "@/utils/context/LockedNamedContext";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Icon } from "./page";

export const CardComponent = ({
  name,
  img,
  index,
}: Icon & { index: number }): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { currentSelected, setCurrentSelected } = useCurrentSelectedContext();
  const { lockedNames, setLockedNames } = useLockedNamesContext();

  const handleFlip = (e: SyntheticEvent, name: string) => {
    setCurrentSelected({
      name: currentSelected.name,
      index: currentSelected.index,
      hide: false,
      score: currentSelected.score,
    });

    if (
      currentSelected.name.length > 0 &&
      currentSelected.name === name &&
      index !== currentSelected.index
    ) {
      setLockedNames([...lockedNames, name]);
      setCurrentSelected({
        name: "",
        index: -1,
        hide: true,
        score: currentSelected.score + 1,
      });
      setIsFlipped(!isFlipped);
      return;
    } else {
      if (currentSelected.name.length > 0 && currentSelected.name !== name) {
        console.log(currentSelected);
        setIsFlipped(true);
        setTimeout(() => {
          setCurrentSelected({
            name: "",
            index: -1,
            hide: true,
            score: currentSelected.score + 1,
          });
          setIsFlipped(!currentSelected.hide ? false : !isFlipped);
        }, 1000);
      } else {
        setCurrentSelected({
          name: name,
          index: index,
          hide: false,
          score: currentSelected.score,
        });
        setIsFlipped(!isFlipped);
      }
    }
  };

  useEffect(() => {
    if (currentSelected.hide) {
      setIsFlipped(false);
    }
  }, [currentSelected, setCurrentSelected]);
  return (
    <ReactCardFlip
      flipDirection="horizontal"
      isFlipped={lockedNames.includes(name) || isFlipped}
    >
      <button
        onClick={(e) => handleFlip(e, name)}
        className="rounded-lg border-gray-700 bg-gray-800 p-4 shadow"
      >
        <div className="rounded-lg border-gray-700 bg-gray-800 p-4 text-gray-800">
          <QuestionMarkCircleIcon className="h-10 w-10 text-gray-800" />
        </div>
      </button>
      <button
        onClick={(e) => handleFlip(e, name)}
        className={`rounded-lg bg-white p-4 shadow ${
          lockedNames.includes(name)
            ? "cursor-default bg-gray-500"
            : "bg-gray-800"
        } border-gray-700`}
      >
        <div
          className={`${
            lockedNames.includes(name)
              ? "cursor-default bg-gray-500"
              : "bg-gray-800"
          } rounded-lg border-gray-700 bg-gray-800 p-4 text-white`}
        >
          {img}
        </div>
      </button>
    </ReactCardFlip>
  );
};
