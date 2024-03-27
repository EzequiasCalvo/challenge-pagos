import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";

const DeletePaymentModal = ({ isOpen, onClose, paymentId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/payments/${paymentId}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Payment deleted successfully!");
        onClose();
      } else {
        toast.error("An error occurred while deleting the payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the payment.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-12 pl-5">
      <Heading
        title="Confirm Deletion"
        subtitle="Are you sure you want to delete this payment?"
      />
      <div className="flex justify-center pr-5 gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Delete Payment"
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default DeletePaymentModal;
