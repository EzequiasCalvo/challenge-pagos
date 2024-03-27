import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "./buttons/DeleteButton";
import Tooltip from "./Tooltip";

function ItemRow({ name, value }) {
  return (
    <div class="min-w-[200px] group flex relative px-8">
      <Tooltip name={name} />
      <div className="text-sm font-semibold text-blue-gray-900">{value}</div>
    </div>
  );
}

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const result = await axios("http://localhost:4000/api/payments");
      setPayments(result.data);
    };
    fetchPayments();
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-300 flex flex-col items-center">
      <h1 className="mt-12 mb-2 ml-5 text-2xl font-bold text-blue-gray-900 w-[90%]">
        Payments list
      </h1>
      <div className="pt-2 flex flex-col text-gray-700 bg-white shadow-2xl w-[90%] rounded-xl bg-clip-border overflow-scroll">
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {payments?.map((payment) => {
            console.log(payment);
            const {
              id,
              amount,
              creation_date,
              description,
              payment_type,
              recipient,
            } = payment;

            const options = { year: "numeric", month: "long", day: "numeric" };

            const date = new Intl.DateTimeFormat("en-US", options).format(
              new Date(creation_date)
            );
            return (
              <div
                key={id}
                role="button"
                className="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start  hover:bg-gray-100"
              >
                <div className="flex justify-center">
                  <ItemRow name="recipient" value={recipient} />
                  <ItemRow name="type" value={payment_type} />
                  <ItemRow name="description" value={description} />
                  <ItemRow name="amount" value={amount} />
                  <ItemRow name="date" value={date} />
                </div>
                <div className="grid grid-flow-col ml-auto place-items-center justify-self-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 mx-2 rounded">
                    Edit
                  </button>
                  <DeleteButton />
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      <button className=" bg-blue-500 hover:bg-blue-700 shadow-xl text-white text-sm font-bold py-2 px-4 mx-2 mt-12 rounded">
        Add payment
      </button>
    </div>
  );
}

export default Payments;
