import { useState } from "react";

const useDeletePaymentModal = () => {
  const [isDeleteOpen, setDeleteIsOpen] = useState(false);

  const onDeleteOpen = () => {
    setDeleteIsOpen(true);
  };

  const onDeleteClose = () => {
    setDeleteIsOpen(false);
  };

  return { isDeleteOpen, onDeleteOpen, onDeleteClose };
};

export default useDeletePaymentModal;
