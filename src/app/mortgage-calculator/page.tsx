"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import styles from "./mortgage-calculator.module.css";
import {
  CurrencyDollarIcon,
  ClockIcon,
  PercentBadgeIcon,
  CalculatorIcon,
} from "@heroicons/react/24/solid";

const calculateMortgage = (
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
) => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const numberOfPayments = loanTermYears * 12;

  const monthlyPayment =
    (principal *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalInterestPaid = monthlyPayment * numberOfPayments - principal;
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalInterestPaid: totalInterestPaid.toFixed(2),
  };
};

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState<number | "">(300000);
  const [interestRate, setInterestRate] = useState<number | "">(5.5);
  const [termYears, setTermYears] = useState<number | "">(30);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [results, setResults] = useState<{
    monthlyPayment: string;
    totalInterestPaid: string;
  } | null>(null);
  const router = useRouter();
  const handleSubmit = (e: SyntheticEvent) => {
    if (!principal || !interestRate || !termYears) {
      alert("Please fill out all fields");
      return;
    }
    e.preventDefault();
    setResults(calculateMortgage(principal, interestRate, termYears));
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <div className="grid grid-cols-2">
        <form className="w-full max-w-lg bg-slate-100 rounded-l-xl p-4">
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
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.valueAsNumber)}
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
                  value={termYears}
                  onChange={(e) => setTermYears(e.target.valueAsNumber)}
                  placeholder="30"
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
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(
                      isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber
                    )
                  }
                  placeholder="5.5"
                  className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                />

                <div className="absolute left-4">
                  <PercentBadgeIcon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3 my-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
                htmlFor="mortgage-amount"
              >
                <input className="my-4 " type="radio" name="Repayment" />
                <i className="p-4">Repayment</i>
              </label>

              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
                htmlFor="mortgage-amount"
              >
                <input className="my-4" type="radio" name="Interest" />
                <i className="p-4">Interest Only</i>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <button
              onClick={(e) => handleSubmit(e)}
              className="mx-16 justify-center w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              <CalculatorIcon className="fill-current w-4 h-4 mr-2" />
              <span>Calculate Repayments</span>
            </button>
          </div>
        </form>
        <div
          className={`w-full rounded-r-xl flex justify-center ${styles.calcbg}`}
        >
          {!submitted ? (
            <Image
              src={"./assets/mortgage-calculator/illustration-empty.svg"}
              width={400}
              height={400}
              alt="empty-state-img"
            ></Image>
          ) : (
            <span className="justify-around">
              <div className="pb-12 flex justify-center text-xl text-slate-100">
                Your Results
              </div>
              <div className="p-8 flex justify-center max-w-lg text-lg text-slate-100">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayment" again.
              </div>
              {results && (
                <div className="">
                  <div className="p-8 flex justify-center max-w-lg text-lg text-slate-100">
                    Monthly Payment: ${results.monthlyPayment}
                  </div>
                  <div className="p-8 flex justify-center max-w-lg text-lg text-slate-100">
                    Total Interest Paid: ${results.totalInterestPaid}
                  </div>
                </div>
              )}
            </span>
          )}
        </div>
      </div>
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
