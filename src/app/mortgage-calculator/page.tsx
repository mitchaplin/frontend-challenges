"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./mortgage-calculator.module.css";
import {
  CurrencyDollarIcon,
  ClockIcon,
  PercentBadgeIcon,
} from "@heroicons/react/24/solid";
export default function MortgageCalculator() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  return (
    <main className={styles.main}>
      <form className="w-full max-w-lg bg-slate-100 rounded-md p-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
              htmlFor="mortgage-amount"
            >
              Mortgage Amount
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="300000"
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
              />

              <div className="absolute left-4">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="mortgage-term"
            >
              Mortgage Term (Years)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="5.5"
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
              />

              <div className="absolute left-4 ">
                <ClockIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
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
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="5.5"
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
              />

              <div className="absolute left-4">
                <PercentBadgeIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
              htmlFor="mortgage-amount"
            >
              <input className="my-3 " type="radio" name="Repayment" />
              <i className="p-4">Repayment</i>
            </label>

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
              htmlFor="mortgage-amount"
            >
              <input className="my-3" type="radio" name="Interest" />
              <i className="p-4">Interest Only</i>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button className="mx-12 w-full mt-1 rounded-lg bg-gray-700 p-2 text-white">
            Calculate
          </button>
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
