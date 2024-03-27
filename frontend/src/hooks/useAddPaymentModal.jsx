const useAddPaymentModal = (set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
});

export default useAddPaymentModal;
