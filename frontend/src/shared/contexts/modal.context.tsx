import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import type { ModalVariants } from "../types/ModalVariants";

interface ModalOptions {
  title?: string;
  content: ReactNode;
  icon?: ReactNode;
  redirect?: string;
  variant?: ModalVariants;
}

interface ModalContextData {
  showModal: (options: ModalOptions) => void;
  showError: (
    options: Omit<ModalOptions, "title"> & { title?: string },
  ) => void;
  showSuccess: (
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
    setConfig({ title: "Erro!", ...options, variant: "error", show: true });
  };

  const showSuccess = (options: ModalOptions) => {
    setConfig({ title: "Sucesso!", ...options, variant: "success", show: true });
  };

  const hideModal = () => {
    setConfig((prev) => ({ ...prev, show: false }));
    config.redirect && navigate(config.redirect);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, showError, showSuccess, hideModal }}
    >
      {children}

      <Modal
        show={config.show}
        onClose={hideModal}
        title={config.title}
        icon={config.icon}
        variant={config.variant}
      >
        {config.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
