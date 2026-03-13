import Title from "@/shared/components/ui/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/Button";

import TextArea from "@/shared/components/ui/Inputs/TextArea";
import Checkbox from "@/shared/components/ui/Checkbox";
import clsx from "clsx";

import Label from "@/shared/components/ui/Label";
import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import { useEffect, useState } from "react";

import { CiCirclePlus } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { consultarProjetosFreelancerPorIdFreelancer } from "../../api/projetoFreelancer.api";
import type { ProjetoFreelancer } from "../../dtos/projetoFreelancer/ProjetoFreelancer";

const CadastrarProposta = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [freelancerProjects, setFreelancerProjects] = useState<
    ProjetoFreelancer[]
  >([]);

  const handleProjectSelection = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await consultarProjetosFreelancerPorIdFreelancer(2);
        setFreelancerProjects(projects);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProjects();
  }, []);

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
                "max-h-100 overflow-auto overscroll-contain p-2",
              )}
            >
              {freelancerProjects &&
                freelancerProjects.map((item) => (
                  <ProposalProjects
                    key={item.id}
                    active={selectedProjects.includes(item.id)}
                    onClick={() => handleProjectSelection(item.id)}
                    {...item}
                  />
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

const ProposalProjects = ({
  nome,
  imagemUrl,
  onClick,
  active,
}: {
  nome?: string;
  imagemUrl?: string;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer h-50 aspect-square hover:-translate-y-1 overflow-hidden",
        "bg-neutral-20 rounded-xl duration-200 transition relative",
        "active:scale-95 border-3 border-transparent",
        active && "border-secondary-100! ",
      )}
    >
      <img
        src={imagemUrl}
        className={clsx(
          "object-cover w-full h-full transition duration-200 hover:scale-110",
        )}
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <span
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full",
          "text-white text-xl font-bold",
        )}
      >
        {nome}
      </span>
    </button>
  );
};

const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-semibold text-xl">{children}</h2>;
};
