import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";

const AddPaymentModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payments`,
        {
          amount,
          payment_type: paymentType,
          recipient,
          description,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Payment added successfully!");

        onClose();
      } else {
        toast.error("An error occurred while adding the payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the payment.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Heading
        title="Add New Payment"
        subtitle="Fill in the payment details!"
      />
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
        className="self-center bg-blue-500 hover:bg-blue-700  text-white text-sm font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Pay"}
      </button>
    </form>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Add payment"
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default AddPaymentModal;
