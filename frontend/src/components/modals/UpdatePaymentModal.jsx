import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";

const EditPaymentModal = ({ isOpen, onClose, selectedPaymentItem }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    const { amount, description, payment_type, recipient } =
      selectedPaymentItem;
    setAmount(amount);
    setDescription(description);
    setPaymentType(payment_type);
    setRecipient(recipient);
  }, [selectedPaymentItem]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/payments/${selectedPaymentItem.id}`,
        {
          amount,
          payment_type: paymentType,
          recipient,
          description,
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Payment updated successfully!");
        onClose();
      } else {
        toast.error("An error occurred while updating the payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the payment.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Heading title="Edit Payment" subtitle="Update the payment details!" />
      <Input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Amount"
        id="amount"
        className="w-80"
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        id="description"
        className="w-80"
      />
      <Input
        type="text"
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
        label="Payment Type"
        id="paymentType"
        className="w-80"
      />
      <Input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        label="Recipient"
        id="recipient"
        className="w-80"
      />
      <button
        type="submit"
        className="self-center bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Edit Payment"
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default EditPaymentModal;
