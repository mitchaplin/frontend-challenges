"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CurrentSelected = {
  name: string;
  index: number;
  hide: boolean;
  score: number;
  locked: boolean;
};

interface ContextProps {
  currentSelected: {
    name: string;
    index: number;
    hide: boolean;
    score: number;
    locked: boolean;
  };
  setCurrentSelected: Dispatch<SetStateAction<CurrentSelected>>;
}

const CurrentSelectedContext = createContext<ContextProps>({
  currentSelected: {
    name: "",
    index: -1,
    hide: false,
    score: 0,
    locked: false,
  },
  setCurrentSelected: () => {},
});

export const CurrentSelectedContextProvider = ({ children }: any) => {
  const [currentSelected, setCurrentSelected] = useState({
    name: "",
    index: 0,
    hide: false,
    score: 0,
    locked: false,
  });

  return (
    <CurrentSelectedContext.Provider
      value={{ currentSelected, setCurrentSelected }}
    >
      {children}
    </CurrentSelectedContext.Provider>
  );
};

export const useCurrentSelectedContext = () =>
  useContext(CurrentSelectedContext);
