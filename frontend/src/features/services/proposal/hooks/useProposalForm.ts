import { sessionStorageKeys } from "@/shared/utils/storageKeys";
import { useEffect, useState } from "react";

const useProposalForm = () => {
  const [items, setItems] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(sessionStorageKeys.proposalItems);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProjects, setSelectedProjects] = useState<number[]>(() => {
    const saved = sessionStorage.getItem(sessionStorageKeys.proposalProjects);
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    sessionStorage.setItem(
      sessionStorageKeys.proposalItems,
      JSON.stringify(items),
    );
  }, [items]);

  useEffect(() => {
    sessionStorage.setItem(
      sessionStorageKeys.proposalProjects,
      JSON.stringify(selectedProjects),
    );
  }, [selectedProjects]);

  const clearAuxiliaryCache = () => {
    sessionStorage.removeItem(sessionStorageKeys.proposalItems);
    sessionStorage.removeItem(sessionStorageKeys.proposalProjects);
    setItems([]);
    setSelectedProjects([]);
  };

  const handleProjectSelection = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
      return;
    }

    if (selectedProjects.length >= 3) {
      return;
    }

    setSelectedProjects([...selectedProjects, projectId]);
  };

  const handleAddItem = () => {
    if (inputValue.trim() === "") return;

    setItems((prevItems) => [inputValue, ...prevItems]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleDeleteItem = (indexToRemove: number) => {
    setItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  return {
    selectedProjects,
    items,
    inputValue,
    setInputValue,
    handleProjectSelection,
    handleAddItem,
    handleKeyDown,
    handleDeleteItem,
    clearAuxiliaryCache,
  };
};

export default useProposalForm;
