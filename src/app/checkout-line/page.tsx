"use client";
import { useEffect, useState } from "react";

export type Cashier = {
  number: number;
  name: string;
  status: "idle" | "working" | "on break";
  lane: 1 | 2 | 3 | -1;
};

export type Customer = {
  number: number;
  name: string;
  items: number;
  status: "waiting" | "checkout";
  lane: number;
};

const getWorkingCondition = (status: Cashier["status"]) => {
  switch (status) {
    case "idle":
      return "bg-yellow-500";
    case "working":
      return "bg-green-500";
    case "on break":
      return "bg-red-500";
  }
};

const generateOptionalCustomer = (customers: Customer[]) => {
  const random = Math.random();
  let lane1 = customers.reduce(
    (acc, customer) => (customer.lane === 1 ? acc++ : acc),
    0
  );
  let lane2 = customers.reduce(
    (acc, customer) => (customer.lane === 2 ? acc++ : acc),
    0
  );
  let lane3 = customers.reduce(
    (acc, customer) => (customer.lane === 3 ? acc++ : acc),
    0
  );
  console.log(lane1, lane2, lane3);
  let min;
  if (lane1 < lane2 && lane1 < lane3) {
    min = 1;
  } else if (lane2 < lane1 && lane2 < lane3) {
    min = 2;
  } else {
    min = 3;
  }
  console.log(min);
  if (random > 0.5) {
    const newCustomer: Customer = {
      number: customers.length + 1,
      name: `Jill ${customers.length + 1}`,
      items: Math.ceil(Math.random() * 8) + 1,
      status: "waiting",
      lane: min,
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
    {
      number: 2,
      name: "Joe",
      status: "working",
      lane: 2,
    },
    {
      number: 3,
      name: "Jim",
      status: "working",
      lane: 3,
    },
  ]);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      number: 1,
      name: "Jill",
      items: 3,
      status: "waiting",
      lane: 1,
    },
  ]);
  // check if items = 0, if so, remove customer from line
  // else if person is checking out, remove items by line
  useEffect(() => {
    const interval = setInterval(() => {
      let c = generateOptionalCustomer(customers);
      c && setCustomers(c);
      if (
        customers &&
        customers.length > 0 &&
        (customers[0].items <= 0 ||
          customers[1].items <= 0 ||
          customers[2].items <= 0)
      ) {
        if (customers[0].items === 0) customers.splice(0, 1);
        if (customers[1].items === 0) customers.splice(1, 1);
        if (customers[2].items === 0) customers.splice(2, 1);
        setCustomers(customers);
        return;
      } else {
        // remove items from three customers in front on lines
        customers.find((customer) => customer.lane === 1 && customer)!
          .items-- || null;
        customers.find((customer) => customer.lane === 2)!.items-- || null;
        customers.find((customer) => customer.lane === 3)!.items-- || null;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [customers]);

  return (
    <main className="h-screen w-screen overflow-x-auto bg-black p-12 text-white">
      <h1 className="mb-8 text-center text-4xl">Checkout Line</h1>
      <div className="flex items-start justify-center gap-4 transition-all">
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
                  {customers.some((cust) => cust.lane === cashier.lane) ? (
                    <h4>{cashier.status}</h4>
                  ) : (
                    <h4>{"idle"}</h4>
                  )}
                </div>
              </button>
              {customers.map((customer) => {
                return customer.lane === cashier.lane ? (
                  <button
                    key={customer.number}
                    className={`h-24 w-24 rounded-full bg-blue-300`}
                  >
                    <div key={customer.number}>
                      <h3>{customer.name}</h3>
                      <h4>{customer.items}</h4>
                    </div>
                  </button>
                ) : (
                  <></>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
