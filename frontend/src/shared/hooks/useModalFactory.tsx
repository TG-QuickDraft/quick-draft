import { useState, useCallback } from "react";

export const useModalFactory = (ModalComponent: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal = useCallback(
    (props: any) => {
      if (!isOpen) return null;

      return <ModalComponent isOpen={isOpen} close={closeModal} {...props} />;
    },
    [isOpen, closeModal],
  );

  return {
    openModal,
    closeModal,
    isOpen,
    Modal,
  };
};
