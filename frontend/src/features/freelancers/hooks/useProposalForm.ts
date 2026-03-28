import { useState } from "react";

const useProposalForm = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

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
  };
};

export default useProposalForm;
