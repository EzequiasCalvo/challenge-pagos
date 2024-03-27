import { useState } from "react";

const useUpdatePaymentModal = () => {
  const [isUpdateOpen, setUpdateIsOpen] = useState(false);

  const onUpdateOpen = () => {
    setUpdateIsOpen(true);
  };

  const onUpdateClose = () => {
    setUpdateIsOpen(false);
  };

  return { isUpdateOpen, onUpdateOpen, onUpdateClose };
};

export default useUpdatePaymentModal;
