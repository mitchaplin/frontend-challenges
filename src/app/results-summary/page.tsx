"use client";
import { useRouter } from "next/router";
import styles from "./results-summary.module.css";
import { useState } from "react";

export default function ResultsSummary() {
  const router = useRouter();
  const [state, setState] = useState<boolean>();
  const [newState, setNewState] = useState<boolean>();
  return (
    <main className={styles.main}>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="mt-36 rounded-lg bg-slate-100 p-2 text-gray-700"
      >
        Go Back
      </button>
    </main>
  );
}
