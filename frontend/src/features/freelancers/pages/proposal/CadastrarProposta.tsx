import Title from "@/shared/components/ui/titles/Title";
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
import Subtitle from "@/shared/components/ui/titles/Subtitle";
import SelectableProjectCard from "../../components/SelectableProjectCard";
import ProposalSection from "../../components/ProposalSection";
import useProposalForm from "../../hooks/useProposalForm";
import { RemovableListItem } from "../../components/RemovableListItem";
import { AnimatedCollapse } from "@/shared/components/AnimatedCollapse";

const CadastrarProposta = () => {
  const {
    selectedProjects,
    inputValue,
    handleProjectSelection,
    handleKeyDown,
    handleAddItem,
    handleDeleteItem,
    setInputValue,
    items,
  } = useProposalForm();

  const [freelancerProjects, setFreelancerProjects] = useState<
    ProjetoFreelancer[]
  >([]);
  const countSelectedProjects = selectedProjects.length;

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
        <ProposalSection>
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
                <RemovableListItem
                  key={index}
                  item={item}
                  index={index}
                  onDelete={handleDeleteItem}
                />
              ))}
            </ul>
          </div>
        </ProposalSection>

        <ProposalSection variant="secondary">
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

            <AnimatedCollapse show={countSelectedProjects > 0}>
              <p className="text-neutral-60">
                {countSelectedProjects} projetos selecionados
              </p>
            </AnimatedCollapse>

            <div
              className={clsx(
                "flex flex-wrap gap-2 justify-center ",
                "max-h-100 overflow-auto overscroll-contain p-2",
              )}
            >
              {freelancerProjects &&
                freelancerProjects.map((item) => (
                  <SelectableProjectCard
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
        </ProposalSection>
      </div>
    </div>
  );
};

export default CadastrarProposta;
