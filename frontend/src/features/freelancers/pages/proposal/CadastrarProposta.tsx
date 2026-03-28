import Title from "@/shared/components/ui/titles/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/buttons/Button";

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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NewProposalSchema,
  type INewProposalForm,
} from "../../validations/proposal.schema";

import { GoPlus } from "react-icons/go";
import { useCreateProposal } from "../../hooks/useCreateProposal";
import type { ProposalRequest } from "../../dtos/freelancer/Proposal";
import Modal from "@/shared/components/ui/Modal";
import { parseCurrencyToNumber } from "@/shared/utils/number.utils";
import { useNavigate, useParams } from "react-router-dom";
import type { Servico } from "@/features/services/dtos/Servico";
import { consultarServicoPorId } from "@/features/services/api/servico.api";
import Spinner from "@/shared/components/ui/Spinner";
import type { Cliente } from "@/features/clients/dtos/Cliente";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarUsuario } from "@/features/users/api/usuario.api";
import { AddButton } from "@/shared/components/ui/buttons/AddButton";
import { IoMdSend } from "react-icons/io";
import { capitalize } from "@/shared/utils/string.utils";
import { freelancerPaths } from "../../routes/freelancerPaths";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import DateInput from "@/shared/components/ui/Inputs/DateInput";
import { sessionStorageKeys } from "@/shared/utils/storageKeys";

const CadastrarProposta = () => {
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"Sucesso" | "Erro" | "">("");
  const [modalMsg, setModalMsg] = useState("");

  const navigate = useNavigate();
  const { serviceId } = useParams();

  const { mutate: doProposal, isPending } = useCreateProposal();
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

  const countSelectedProjects = selectedProjects.length;

  const [freelancerProjects, setFreelancerProjects] = useState<
    ProjetoFreelancer[]
  >([]);
  const [servico, setServico] = useState<Servico | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<INewProposalForm>({
    resolver: yupResolver(NewProposalSchema),
    mode: "onChange",
  });

  const formValues = watch();

  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      sessionStorage.setItem(
        sessionStorageKeys.proposalCache,
        JSON.stringify(formValues),
      );
    }
  }, [formValues]);

  useEffect(() => {
    const savedData = sessionStorage.getItem(sessionStorageKeys.proposalCache);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (parsedData.deadline) {
        parsedData.deadline = new Date(parsedData.deadline);
      }

      reset(parsedData);
    }
  }, [reset]);

  const onValid = (formData: INewProposalForm) => {
    const proposalData: ProposalRequest = {
      mensagem: formData.description,
      valorPorHora: parseCurrencyToNumber(formData.hourlyValue),
      prazoEntrega: new Date(formData.deadline).toISOString(),
      valorTotal: parseCurrencyToNumber(formData.totalCost),
      itensPropostos: items.join("; "),
      taxaSistemaAdicionadaAoTotal: formData.addSystemTax,
      servicoId: Number(serviceId),
      projetosDestacados: selectedProjects.map((id) => ({
        id,
        nome: "",
        link: "",
        descricao: "",
        imagemUrl: "",
      })),
    };

    doProposal(proposalData, {
      onSuccess: () => {
        sessionStorage.removeItem(sessionStorageKeys.proposalCache);
        setModalStatus("Sucesso");
        setModalMsg("Proposta enviada com sucesso!");
        setShowModal(true);
      },
      onError: (error) => {
        setModalStatus("Erro");
        setModalMsg(error.message);
        setShowModal(true);
      },
    });
  };

  useEffect(() => {
    const obterDados = async () => {
      setLoading(true);
      try {
        const service = await consultarServicoPorId(Number(serviceId));

        if (service) {
          setServico(service);
          const client = await consultarClientePorId(service.clienteId);
          client && setCliente(client);
        }

        const user = await consultarUsuario();

        if (user) {
          const projects = await consultarProjetosFreelancerPorIdFreelancer(
            user.id,
          );
          projects && setFreelancerProjects(projects);
        }
      } finally {
        setLoading(false);
      }
    };

    obterDados();
  }, [serviceId]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="flex flex-col gap-5 flex-1 max-w-7xl mx-auto w-full">
        <Title
          className="font-semibold! text-2xl"
          onClick={() =>
            navigate(servicoPaths.visualizarServicoById(Number(serviceId)))
          }
        >
          Envio de Proposta
        </Title>
        <form
          onSubmit={handleSubmit(onValid)}
          className={clsx(
            "flex flex-col md:flex-row border border-neutral-20 flex-1 rounded-xl ",
            "overflow-hidden shadow-2xl",
          )}
        >
          <ProposalSection>
            <Subtitle>
              <span className="text-neutral-60 font-normal text-sm mr-2 block">
                Serviço
              </span>
              <span className="text-neutral-100">
                {capitalize(servico?.nome || "")}
              </span>
            </Subtitle>
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
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <RemovableListItem
                      key={index}
                      item={item}
                      index={index}
                      onDelete={handleDeleteItem}
                    />
                  ))
                ) : (
                  <p className="text-neutral-60">Nenhum item adicionado</p>
                )}
              </ul>
            </div>
          </ProposalSection>
          <ProposalSection variant="secondary">
            <Subtitle>
              <span className="text-neutral-60 block font-normal text-sm mr-2">
                Cliente
              </span>
              <span className="text-neutral-100">
                {capitalize(cliente?.nome || "")}
              </span>
            </Subtitle>
            <div className="flex flex-col xl:flex-row justify-evenly gap-5 xl:gap-10">
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

                <Controller
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <DateInput
                      selectedDate={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      error={errors?.deadline?.message}
                      showErrorMsg
                    />
                  )}
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
              <Label>Selecione até 3 projetos para destaque:</Label>
              <AnimatedCollapse show={countSelectedProjects > 0}>
                <p className="text-neutral-60">
                  {countSelectedProjects > 1
                    ? `${countSelectedProjects} Projetos selecionados`
                    : `1 Projeto selecionado`}
                </p>
              </AnimatedCollapse>
              <div
                className={clsx(
                  "flex flex-wrap gap-2 justify-center ",
                  "max-h-100 overflow-auto overscroll-contain p-2",
                )}
              >
                {freelancerProjects.length > 0 ? (
                  freelancerProjects.map((item) => (
                    <SelectableProjectCard
                      key={item.id}
                      active={selectedProjects.includes(item.id)}
                      onClick={() => handleProjectSelection(item.id)}
                      {...item}
                    />
                  ))
                ) : (
                  <p className="text-neutral-60">Nenhum projeto cadastrado</p>
                )}
              </div>
              <Stack>
                <AddButton
                  className="mt-4"
                  onClick={() =>
                    navigate(
                      freelancerPaths.cadastrarProjetoFreelancer +
                        `${serviceId ? `?from=${freelancerPaths.cadastrarPropostaById(serviceId)}` : ""}`,
                    )
                  }
                />
              </Stack>
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
                <Button disabled={isPending} icon={<IoMdSend size={25} />}>
                  Enviar proposta
                </Button>
              </Stack>
            </div>
          </ProposalSection>
        </form>
      </div>
      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => {
          setShowModal(false);
          navigate(servicoPaths.pesquisaServico);
        }}
      >
        {modalMsg}
      </Modal>
    </>
  );
};

export default CadastrarProposta;
