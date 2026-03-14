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

import { consultarProjetosFreelancerPorIdFreelancer } from "../../api/projetoFreelancer.api";
import type { ProjetoFreelancer } from "../../dtos/projetoFreelancer/ProjetoFreelancer";
import Subtitle from "@/shared/components/ui/titles/Subtitle";
import SelectableProjectCard from "../../components/SelectableProjectCard";
import ProposalSection from "../../components/ProposalSection";
import useProposalForm from "../../hooks/useProposalForm";
import { RemovableListItem } from "../../components/RemovableListItem";
import { AnimatedCollapse } from "@/shared/components/AnimatedCollapse";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NewProposalSchema,
  type INewProposalForm,
} from "../../validations/proposal.schema";

import { GoPlus } from "react-icons/go";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewProposalForm>({
    resolver: yupResolver(NewProposalSchema),
    mode: "onChange",
  });

  const onValid = (formData: INewProposalForm) => {
    reset();
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

      <form
        onSubmit={handleSubmit(onValid)}
        className="flex border border-neutral-20 flex-1 rounded-xl"
      >
        <ProposalSection>
          <Subtitle>Logo para loja de materiais</Subtitle>

          <InputGroup notSpaced>
            <Label>Descrição da proposta</Label>
            <TextArea
              className="min-h-30"
              placeholder="Descrição da proposta..."
              showErrorMsg
              error={errors.description?.message}
              {...register("description")}
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
                    "group active:scale-90 transition duration-200 cursor-pointer bg-primary-100",
                    "hover:scale-105 flex justify-center items-center p-2 rounded-lg",
                  )}
                  type="button"
                  onClick={handleAddItem}
                  aria-label="Adicionar item"
                >
                  <GoPlus size={30} color="white" />
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
              <Input
                mask="currency"
                placeholder="R$ 00,00"
                error={errors?.hourlyValue?.message}
                showErrorMsg
                {...register("hourlyValue")}
              />
            </InputGroup>
            <InputGroup notSpaced>
              <Label>Prazo de entrega</Label>
              <Input
                mask="00/00/0000"
                placeholder="1 dia"
                error={errors?.deadline?.message}
                showErrorMsg
                {...register("deadline")}
              />
            </InputGroup>
            <InputGroup notSpaced>
              <Label>Valor total</Label>
              <Input
                mask="currency"
                placeholder="R$ 00,00"
                error={errors?.totalCost?.message}
                showErrorMsg
                {...register("totalCost")}
              />
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
                {...register("addSystemTax")}
              />
            </div>
            <Stack className="mt-5" align="right">
              <Button>Enviar proposta</Button>
            </Stack>
          </div>
        </ProposalSection>
      </form>
    </div>
  );
};

export default CadastrarProposta;
