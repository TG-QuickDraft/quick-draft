import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";

interface ModalOptions {
  title?: string;
  content: ReactNode;
  icon?: ReactNode;
  redirect?: string;
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
    setConfig({ ...options, show: true });
  };

  const showError = (options: ModalOptions) => {
    setConfig({ title: "Erro", ...options, show: true });
  };

  const showSuccess = (options: ModalOptions) => {
    setConfig({ title: "Sucesso", ...options, show: true });
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
      >
        {config.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
