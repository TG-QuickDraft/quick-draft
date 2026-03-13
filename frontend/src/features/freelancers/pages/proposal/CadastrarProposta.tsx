import Title from "@/shared/components/ui/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/Button";

import TextArea from "@/shared/components/ui/Inputs/TextArea";
import Checkbox from "@/shared/components/ui/Checkbox";
import clsx from "clsx";

import Label from "@/shared/components/ui/Label";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import { useState } from "react";

import { CiCirclePlus } from "react-icons/ci";
import { FiX } from "react-icons/fi";

const CadastrarProposta = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div className="flex flex-col gap-5 flex-1 max-w-300 mx-auto w-full">
      <Title className="font-semibold! text-2xl" onClick={() => {}}>
        Envio de Proposta
      </Title>

      <div className="flex border border-neutral-20 flex-1 rounded-xl">
        <ProposalWrapper>
          <Subtitle>Logo para loja de materiais</Subtitle>

          <InputGroup notSpaced>
            <Label>Descrição da proposta</Label>
            <TextArea
              className="min-h-30"
              placeholder="Descrição da proposta..."
            />
          </InputGroup>

          <div className="flex flex-col gap-5">
            <InputGroup notSpaced>
              <Label>Itens propostos</Label>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Adicionar item..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button
                  className={clsx(
                    "active:scale-90 transition duration-200 cursor-pointer",
                    "hover:scale-110 flex justify-center items-center",
                  )}
                  type="button"
                  onClick={handleAddItem}
                  aria-label="Adicionar item"
                >
                  <CiCirclePlus size={36} />
                </button>
              </div>
            </InputGroup>

            <ul className="flex flex-col gap-3 max-h-100 overflow-y-auto">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "p-3 text-neutral-80 border-b border-neutral-20",
                      "flex-1",
                    )}
                  >
                    {item}
                  </span>

                  <button
                    onClick={() => handleDeleteItem(index)}
                    className={clsx(
                      "active:scale-90 transition duration-200 cursor-pointer",
                      "hover:scale-110 flex justify-center items-center text-red-400 hover:text-red-600 p-2",
                    )}
                    aria-label="Remover item"
                  >
                    <FiX size={24} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ProposalWrapper>

        <ProposalWrapper variant="secondary">
          <Subtitle>Cliente: Joesvaldo</Subtitle>

          <div className="flex justify-evenly gap-10">
            <InputGroup notSpaced>
              <Label>Valor por hora</Label>
              <Input placeholder="R$ 00,00" />
            </InputGroup>
            <InputGroup notSpaced>
              <Label>Prazo de entrega</Label>
              <Input placeholder="1 dia" />
            </InputGroup>
            <InputGroup notSpaced>
              <Label>Valor total</Label>
              <Input placeholder="R$ 00,00" />
            </InputGroup>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Selecione projetos de destaque:</Label>
            <div
              className={clsx(
                "flex flex-wrap gap-2 justify-center ",
                "max-h-100 overflow-auto overscroll-contain",
              )}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <ProposalProjects key={item} />
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex gap-2 items-center">
              <Checkbox
                label="Adicione taxa do sistema ao total"
                checkboxSize="md"
              />
            </div>
            <Stack className="mt-5" align="right">
              <Button>Enviar proposta</Button>
            </Stack>
          </div>
        </ProposalWrapper>
      </div>
    </div>
  );
};

export default CadastrarProposta;

const ProposalWrapper = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const base = clsx("flex flex-col flex-1 p-6");
  const variants = {
    primary: clsx(base, "gap-5"),
    secondary: clsx(base, "bg-neutral-10 rounded-xl gap-8"),
  };

  return <div className={variants[variant]}>{children}</div>;
};

const ProposalProjects = () => {
  return (
    <button
      className={clsx(
        "cursor-pointer h-40 aspect-square hover:-translate-y-1",
        "bg-neutral-20 rounded-xl duration-200 transition",
        "active:scale-90",
      )}
    />
  );
};

const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-semibold text-xl">{children}</h2>;
};
