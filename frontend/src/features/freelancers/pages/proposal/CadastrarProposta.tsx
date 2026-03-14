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
import { useCreateProposal } from "../../hooks/useCreateProposal";
import type { ProposalRequest } from "../../dtos/freelancer/proposal";
import Modal from "@/shared/components/ui/Modal";
import { parseCurrencyToNumber } from "@/shared/utils/numbers.utils";
import { useNavigate, useParams } from "react-router-dom";
import type { Servico } from "@/features/services/dtos/Servico";
import { consultarServicoPorId } from "@/features/services/api/servico.api";
import Spinner from "@/shared/components/ui/Spinner";
import type { Cliente } from "@/features/clients/dtos/Cliente";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarUsuario } from "@/features/users/api/usuario.api";

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

    formState: { errors },
  } = useForm<INewProposalForm>({
    resolver: yupResolver(NewProposalSchema),
    mode: "onChange",
  });

  const onValid = (formData: INewProposalForm) => {
    const proposalData: ProposalRequest = {
      mensagem: formData.description,
      valorPorHora: parseCurrencyToNumber(formData.hourlyValue),
      prazoEntrega: new Date(formData.deadline).toISOString(),
      valorTotal: parseCurrencyToNumber(formData.totalCost),
      itensPropostos: items.join("; "),
      taxaSistemaAdicionadaAoTotal: formData.addSystemTax,
      servicoId: 4,
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
      <div className="flex flex-col gap-5 flex-1 max-w-300 mx-auto w-full">
        <Title
          className="font-semibold! text-2xl"
          onClick={() => navigate(`/visualizarServico/${serviceId}`)}
        >
          Envio de Proposta
        </Title>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex border border-neutral-20 flex-1 rounded-xl"
        >
          <ProposalSection>
            <Subtitle>{servico?.nome}</Subtitle>
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
            <Subtitle>Cliente: {cliente?.nome}</Subtitle>
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
                <Button disabled={isPending}>Enviar proposta</Button>
              </Stack>
            </div>
          </ProposalSection>
        </form>
      </div>
      <Modal
        show={showModal}
        title={modalStatus}
        onClose={() => setShowModal(false)}
      >
        {modalMsg}
      </Modal>
    </>
  );
};

export default CadastrarProposta;
