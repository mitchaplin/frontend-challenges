"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./mortgage-calculator.module.css";
export default function MortgageCalculator() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  return (
    <main className={styles.main}>
      <form className="w-full max-w-lg bg-slate-100 rounded-md p-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="mortgage-amount"
            >
              Mortgage Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="mortgage-amount"
              type="number"
              placeholder="300,000"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="mortgage-term"
            >
              Mortgage Term
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="mortgage-term"
              type="number"
              placeholder="30"
            />
            {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="interest-rate"
            >
              Interest Rate
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="interest-rate"
              type="number"
              placeholder="5"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="flex border-gray-700 bg-gray-100 text-gray-700 rounded-md px-3 py-3 my-3  hover:bg-indigo-300 cursor-pointer ">
              <input className="my-3" type="radio" name="Repayment" />
              <i className="p-2">Repayment</i>
            </label>

            <label className="flex border-gray-700 bg-gray-100 text-gray-700 rounded-md px-3 py-3 my-3  hover:bg-indigo-300 cursor-pointer ">
              <input className="my-3" type="radio" name="Interest" />
              <i className="p-2">Interest Only</i>
            </label>
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="mt-36 rounded-lg bg-gray-700 p-2 text-white"
      >
        Go Back
      </button>
    </main>
  );
}
