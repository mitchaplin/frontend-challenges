"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextProps {
  lockedNames: string[];
  setLockedNames: Dispatch<SetStateAction<string[]>>;
}

const LockedNamesContext = createContext<ContextProps>({
  lockedNames: [],
  setLockedNames: (): string[] => [],
});

export const LockedNamesContextProvider = ({ children }: any) => {
  const [lockedNames, setLockedNames] = useState<[] | string[]>([]);

  return (
    <LockedNamesContext.Provider value={{ lockedNames, setLockedNames }}>
      {children}
    </LockedNamesContext.Provider>
  );
};

export const useLockedNamesContext = () => useContext(LockedNamesContext);
