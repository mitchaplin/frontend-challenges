"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./interactive-rating.module.css";
export default function InteractiveRating() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        {!submitted ? (
          <>
            <button className="rounded-full bg-slate-700 p-3">
              <Image
                src={"./assets/interactive-rating/icon-star.svg"}
                width={12}
                height={12}
                alt="card star"
              ></Image>
            </button>
            <div className="pt-8">
              <h1 className="text-xl text-white">How did we do?</h1>
              <p className="pt-4 text-gray-400">
                Please let us know how we did with your support request. All
                feedback is appreciated to help us improve our offering!
              </p>
              <div className="flex flex-grow py-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    onClick={() => setRating(star)}
                    value={star}
                    key={star}
                    className={`${
                      star === rating
                        ? "bg-orange-500 text-white hover:bg-orange-500"
                        : "bg-slate-600 text-gray-400 hover:bg-gray-500"
                    } mx-3 flex h-10 w-10 grow items-center justify-center gap-2 rounded-full`}
                  >
                    {star}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="h-10 w-full grow rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"./assets/interactive-rating/illustration-thank-you.svg"}
              width={225}
              height={225}
              alt="card star"
            ></Image>
            <button className="mx-auto mt-8 h-10 w-fit cursor-default rounded-full bg-gray-700 px-8 text-orange-500">
              You selected {rating} out of 5
            </button>
            <h1 className="mt-8 text-center text-3xl text-white">Thank you!</h1>
            <p className="mt-4 text-center text-gray-400">
              We appreciate you taking the time to give a rating. If you ever
              need more support, don’t hesitate to get in touch!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
