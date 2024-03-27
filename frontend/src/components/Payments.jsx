import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "./buttons/DeleteButton";
import Tooltip from "./Tooltip";
import Input from "./Input";
import useAddPaymentModal from "../hooks/useAddPaymentModal";
import useDeletePaymentModal from "../hooks/useDeletePaymentModal";
import useUpdatePaymentModal from "../hooks/useUpdatePaymentModal";
import AddPaymentModal from "./modals/AddPaymentModal";
import DeletePaymentModal from "./modals/DeletePaymentModal";
import UpdatePaymentModal from "./modals/UpdatePaymentModal";

function ItemRow({ name, value }) {
  return (
    <div className="min-w-[200px] group flex relative px-8">
      <Tooltip name={name} />
      <div className="text-sm font-semibold text-blue-gray-900">{value}</div>
    </div>
  );
}

function Payments() {
  const { isOpen, onOpen, onClose } = useAddPaymentModal();
  const { isDeleteOpen, onDeleteOpen, onDeleteClose } = useDeletePaymentModal();
  const { isUpdateOpen, onUpdateOpen, onUpdateClose } = useUpdatePaymentModal();
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);
  const [filterRecipient, setFilterRecipient] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPayments = async () => {
      const result = await axios("http://localhost:4000/api/payments");
      let filteredPayments = result.data.filter(
        (payment) =>
          payment.recipient
            .toLowerCase()
            .includes(filterRecipient.toLowerCase()) &&
          payment.payment_type.toLowerCase().includes(filterType.toLowerCase())
      );
      if (sortOrder === "asc") {
        filteredPayments.sort(
          (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
        );
      } else {
        filteredPayments.sort(
          (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        );
      }
      setPayments(filteredPayments);
    };
    fetchPayments();
  }, [
    isOpen,
    isDeleteOpen,
    isUpdateOpen,
    filterRecipient,
    filterType,
    sortOrder,
  ]);

  const handleDeleteClick = (paymentId) => {
    setSelectedPaymentId(paymentId);
    onDeleteOpen();
  };

  const handleEditClick = (paymentData) => {
    setSelectedPaymentItem(paymentData);
    onUpdateOpen();
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-300 flex flex-col items-center">
      <div className="w-[90%] flex justify-between">
        <h1 className="mt-12 mb-2  text-2xl font-bold text-blue-gray-900 ">
          Payments list
        </h1>
        <div className="flex gap-x-2  mt-10 h-[40px]">
          <Input
            type="text"
            label="Filter by recipient"
            id="recipient filter"
            value={filterRecipient}
            onChange={(e) => setFilterRecipient(e.target.value)}
          />
          <Input
            type="text"
            label="Filter by type"
            id="type filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className=" mt-3 shadow  border rounded  py-2 px-3 text-gray-700 leading-tight "
          >
            <option value="asc">Date Ascending</option>
            <option value="desc">Date Descending</option>
          </select>
        </div>
        {/* <div className="w-2/3"></div> */}
      </div>
      <div className="pt-2 flex flex-col text-gray-700 bg-white shadow-2xl w-[90%] rounded-xl bg-clip-border overflow-scroll">
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {payments.length ? (
            payments.map((payment) => {
              const {
                id,
                amount,
                creation_date,
                description,
                payment_type,
                recipient,
              } = payment;

              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };

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
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 mx-2 rounded"
                      onClick={() => handleEditClick(payment)}
                    >
                      Edit
                    </button>
                    <DeleteButton onClick={() => handleDeleteClick(id)} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center italic text-rose-500 font-bold">
              No payments found
            </div>
          )}
        </nav>
      </div>
      <button
        onClick={onOpen}
        className="bg-blue-500 hover:bg-blue-700 shadow-xl text-white text-sm font-bold py-2 px-4 mx-2 my-12 rounded"
      >
        Add payment
      </button>
      {isOpen && <AddPaymentModal isOpen={isOpen} onClose={onClose} />}
      {isDeleteOpen && (
        <DeletePaymentModal
          paymentId={selectedPaymentId}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
      )}
      {isUpdateOpen && (
        <UpdatePaymentModal
          selectedPaymentItem={selectedPaymentItem}
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
        />
      )}
    </div>
  );
}

export default Payments;
