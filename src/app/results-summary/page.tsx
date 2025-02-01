"use client";
import { useRouter } from "next/router";
import styles from "./results-summary.module.css";
import { useEffect, useState } from "react";

export default function ResultsSummary() {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  return (
    <main className={styles.main}>
      <button
        onClick={() => {
          setUrl(router.asPath);

          router.push("/");
        }}
        className="mt-36 rounded-lg bg-slate-100 p-2 text-gray-700"
      >
        Go Back
      </button>
    </main>
  );
}
