import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={"/interactive-rating"}>
        <button className="bg-black text-white">Interactive Rating</button>
      </Link>
    </main>
  );
}
