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
            <button className="bg-slate-700 p-3 rounded-full">
              <Image
                src={"./assets/interactive-rating/icon-star.svg"}
                width={12}
                height={12}
                alt="card star"
              ></Image>
            </button>
            <div className="pt-8">
              <h1 className="text-white text-xl">How did we do?</h1>
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
                        : "bg-slate-600 hover:bg-gray-500 text-gray-400"
                    } flex grow justify-center gap-2 items-center mx-3 h-10 w-10 rounded-full`}
                  >
                    {star}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="bg-orange-500 grow rounded-full w-full h-10 hover:bg-white hover:text-orange-500 text-white"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <Image
              src={"./assets/interactive-rating/illustration-thank-you.svg"}
              width={225}
              height={225}
              alt="card star"
            ></Image>
            <button className="mt-8 bg-gray-700 rounded-full h-10 px-8 w-fit mx-auto text-orange-500">
              You selected {rating} out of 5
            </button>
            <h1 className="mt-8 text-center text-3xl text-white">Thank you!</h1>
            <p className="mt-4 text-gray-400 text-center">
              We appreciate you taking the time to give a rating. If you ever
              need more support, don’t hesitate to get in touch!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
