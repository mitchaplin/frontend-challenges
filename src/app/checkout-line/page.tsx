"use client";
import { useEffect, useState } from "react";

export type Cashier = {
  number: number;
  name: string;
  status: "idle" | "working" | "on break";
  lane: number;
};
export type Customer = {
  number: number;
  name: string;
  items: 3;
  status: "waiting" | "checkout";
  line: -1;
};

const getWorkingCondition = (status: Cashier["status"]) => {
  switch (status) {
    case "idle":
      return "bg-yellow-300";
    case "working":
      return "bg-green-300";
    case "on break":
      return "bg-red-300";
  }
};
const generateOptionalCustomer = (customers: Customer[]) => {
  const random = Math.random();
  if (random > 0.5) {
    const newCustomer: Customer = {
      number: customers.length + 1,
      name: `Jill ${customers.length + 1}`,
      items: 3,
      status: "waiting",
      line: -1,
    };
    return [...customers, newCustomer];
  }
  return null;
};

export default function CheckoutLine() {
  const [cashiers, setCashiers] = useState<Cashier[]>([
    {
      number: 1,
      name: "John",
      status: "working",
      lane: 1,
    },
  ]);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      number: 1,
      name: "Jill",
      items: 3,
      status: "waiting",
      line: -1,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      let c = generateOptionalCustomer(customers);
      c && setCustomers(c);
    }, 5000);
    return () => clearInterval(interval);
  }, [customers]);

  return (
    <main className="h-screen w-screen overflow-x-auto bg-black p-12 text-white">
      <h1 className="mb-8 text-center text-4xl">Checkout Line</h1>
      <div className="flex justify-center">
        {cashiers.map((cashier) => {
          return (
            <div key={cashier.number} className="grid grid-cols-1 gap-4">
              <button
                key={cashier.number}
                className={`h-24 w-24 rounded-full ${getWorkingCondition(
                  cashier.status
                )}`}
              >
                <div key={cashier.number}>
                  <h3>{cashier.name}</h3>
                  <h4>{cashier.status}</h4>
                </div>
              </button>
              {customers.map((customer) => {
                return (
                  <button
                    key={customer.number}
                    className={`h-24 w-24 rounded-full bg-blue-300`}
                  >
                    <div key={customer.number}>
                      <h3>{customer.name}</h3>
                      <h4>{customer.status}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
