import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Modal from "../components/ui/modals/Modal";
import { useNavigate } from "react-router-dom";
import type { ModalVariants } from "../types/ModalVariants";

import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";

interface ModalOptions {
  title?: string;
  content: ReactNode;
  icon?: ReactNode;
  redirect?: string;
  variant?: ModalVariants;

  onConfirm?: () => void;
}

interface ModalContextData {
  showModal: (options: ModalOptions) => void;
  showError: (
    options: Omit<ModalOptions, "title"> & { title?: string },
  ) => void;
  showSuccess: (
    options: Omit<ModalOptions, "title"> & { title?: string },
  ) => void;
  showDanger: (
    options: Omit<ModalOptions, "title"> & { title?: string },
  ) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [config, setConfig] = useState<ModalOptions & { show: boolean }>({
    show: false,
    content: null,
  });

  const showModal = (options: ModalOptions) => {
    setConfig({ ...options, variant: "primary", show: true });
  };

  const showError = (options: ModalOptions) => {
    setConfig({
      title: "Erro!",
      ...options,
      variant: "error",
      icon: <HiOutlineEmojiSad size={28} />,
      show: true,
    });
  };

  const showSuccess = (options: ModalOptions) => {
    setConfig({
      title: "Sucesso!",
      ...options,
      variant: "success",
      icon: <HiOutlineEmojiHappy size={28} />,
      show: true,
    });
  };

  const showDanger = (options: ModalOptions) => {
    setConfig({
      title: "Atenção!",
      icon: <IoIosWarning size={28} color="red" />,
      ...options,
      variant: "danger",
      show: true,
    });
  };

  const hideModal = (redirect?: string) => {
    setConfig((prev) => ({ ...prev, show: false }));
    redirect && navigate(redirect);
  };

  const handleCancel = () => {
    !config.onConfirm ? hideModal(config.redirect) : hideModal();
  };

  const handleConfirm = () => {
    if (!config.onConfirm) return;

    config.onConfirm();
    hideModal(config.redirect);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, showError, showSuccess, showDanger, hideModal }}
    >
      {children}

      <Modal
        show={config.show}
        onClose={handleCancel}
        title={config.title}
        icon={config.icon}
        variant={config.variant}
        onConfirm={config.onConfirm ? handleConfirm : undefined}
      >
        {config.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
