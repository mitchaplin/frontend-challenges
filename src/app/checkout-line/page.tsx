"use client";
import { useEffect, useState } from "react";


export type CheckoutLine = {
  number: number;
  cashier: Cashier
  customers: Customer[];
};

export type Cashier = {
  name: string;
  status: "idle" | "working" | "on break";
  lane: number;
};

export type Customer = {
  name: string;
  items: number;
  status: "waiting" | "checkout";
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

const generateRandomCustomerName = () => {
  const names = [
    "Jane",
    "Jill",
    "Jack",
    "Jenny",
    "Josh",
    "Jen",
    "Jill",
    "James",
    "Jasmine",
    "Jared",
    "Jade",
    "Jasper",
    "Jax",
    "Jaxson",
    "Jaden",
    "Jagger",
    "Jaiden",
    "Jairo",
    "Jamar",
    "Jamari",
    "Jamal",
    "Jameson",
    "Jamie",
  ];
  return names[Math.floor(Math.random() * names.length)];
}
const generateCustomer = () => {
  const random = Math.random();
  if (random > 0.5) {
    return {
      name: generateRandomCustomerName(),
      items: Math.ceil(Math.random() * 10),
      status: "waiting",
    } as Customer;
  }
  return;
};

// Finds the shortest line and adds the customer to that line
// Returns the checkout line array
const queueIntoShortestLine = (checkoutLines: CheckoutLine[], customer: Customer) => {
  const lane1 = checkoutLines.find(({ cashier }) => cashier.lane === 1);
  const lane2 = checkoutLines.find(({ cashier }) => cashier.lane === 2);
  const lane3 = checkoutLines.find(({ cashier }) => cashier.lane === 3);
  const lane1Length = lane1?.customers?.length || 0;
  const lane2Length = lane2?.customers?.length || 0;
  const lane3Length = lane3?.customers?.length || 0;
  if (lane1Length <= lane2Length && lane1Length <= lane3Length) {
    if (lane1?.cashier.status === "idle" || lane1?.cashier.status === "working") {
      lane1?.customers?.push(customer);
    }
  } else if (lane2Length <= lane1Length && lane2Length <= lane3Length) {
    if (lane2?.cashier.status === "idle" || lane2?.cashier.status === "working") {
      lane2?.customers?.push(customer);
    }
  } else if (lane3Length <= lane1Length && lane3Length <= lane2Length) {
    if (lane3?.cashier.status === "idle" || lane3?.cashier.status === "working") {
      lane3?.customers?.push(customer);
    }
  }
  return checkoutLines;
}

export default function CheckoutLine() {
  const [checkoutLines, setCheckoutLines] = useState<CheckoutLine[]>([
    {
      number: 1,
      cashier: {
        name: "John",
        status: "working",
        lane: 1,
      },
      customers: [],
    },
    {
      number: 2,
      cashier: {
        name: "Jafar",
        status: "working",
        lane: 2,
      },
      customers: [],
    },
    {
      number: 3,
      cashier: {
        name: "Jerry",
        status: "working",
        lane: 3,
      },
      customers: [],
    },
  ]);


  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new customer to the queue
      const potentialCustomer = generateCustomer();
      if (potentialCustomer) {
        setCheckoutLines(queueIntoShortestLine(checkoutLines, potentialCustomer));
      }
      // Update the status of the checkout lines
      const updatedCheckoutLine = checkoutLines.map((checkoutLine: CheckoutLine) => {
        let line = checkoutLine;
        const cashier = line.cashier;
        let customers = line.customers; 
        if (customers.length > 0) {
          if (cashier.status === "idle") {
            cashier.status = "working";
          }
          if (customers[0].status === "waiting") {
            customers[0].status = "checkout";
          } else if (customers[0].status === "checkout") {
            if (customers[0].items > 0) {
            customers[0].items -= 1;
            } else {
            // pop customer from the queue
            console.log(`${customers[0].name} has been checked out`);
            line.customers = customers.slice(1)
            }
          }
        } else {
          cashier.status = "idle";
        }
        return line;
      });
      setCheckoutLines(updatedCheckoutLine);
    }, 1000);
    return () => clearInterval(interval);
  }, [checkoutLines]);

  return (
    <main className="h-screen w-screen overflow-x-auto bg-black p-12 text-white">
      <h1 className="mb-8 text-center text-4xl">Checkout Line</h1>
      <div className="flex items-start justify-center gap-4 transition-all">
        {checkoutLines.map((cl) => {
          return (
            <div key={cl.number} className="grid grid-cols-1 gap-4">
              <button
                key={cl.number}
                className={`h-24 w-24 rounded-full ${getWorkingCondition(
                  cl.cashier.status
                )}`}
              >
                <div key={cl.number}>
                  <h3>{cl.cashier.name}</h3>
                  <h4>{cl.cashier.status}</h4>
                </div>
              </button>
              {cl.customers.map((customer: Customer, index: number) => {
                return (
                  <button
                    key={index}
                    className={`h-24 w-24 rounded-full bg-blue-300`}
                  >
                      <h3>{customer.name}</h3>
                      <h4>{customer.items}</h4>
                    <h5 key={customer.status}>
                    </h5>
                  </button>
                )
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
