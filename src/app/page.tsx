import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-4xl font-bold pb-12">Frontend Mentor Solutions</h1>
      <Link href={"/interactive-rating"}>
        <button className="bg-black text-white rounded-full p-3">
          Interactive Rating
        </button>
      </Link>
    </main>
  );
}
