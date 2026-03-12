import Title from "@/shared/components/ui/Title";
import Input from "@/shared/components/ui/Inputs/Input";
import Stack from "@/shared/components/Stack";
import Button from "@/shared/components/ui/Button";

import TextArea from "@/shared/components/ui/Inputs/TextArea";
import Checkbox from "@/shared/components/ui/Checkbox";

const CadastrarProposta = () => {
  return (
    <div className="flex flex-col gap-5 flex-1 max-w-300 mx-auto w-full">
      <Title>Envio de Proposta</Title>

      <div className="flex border border-neutral-20 flex-1 rounded-xl">
        <div className="flex flex-col gap-5 flex-1 p-6">
          <h2 className="font-semibold text-xl">Logo para loja de materiais</h2>

          <div>
            <h3 className="mb-3">Descrição da proposta</h3>
            <TextArea
              className="min-h-30"
              placeholder="Descrição da proposta..."
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h3 className="mb-3">Itens propostos</h3>
              <Input placeholder="Adicionar item..." />
            </div>

            <ul className="list-disc ml-6">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 flex-1 p-6 bg-neutral-10 rounded-xl">
          <h2 className="font-semibold text-xl">Cliente: Joesvaldo</h2>

          <div className="flex justify-evenly gap-10">
            <div className="flex flex-col gap-1">
              <span>Valor por hora</span>
              <Input placeholder="R$ 00,00" />
            </div>
            <div className="flex flex-col gap-1">
              <span>Prazo de entrega</span>
              <Input placeholder="1 dia" />
            </div>
            <div className="flex flex-col gap-1">
              <span>Valor total</span>
              <Input placeholder="R$ 00,00" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3>Selecione projetos de destaque:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="cursor-pointer h-40 aspect-square bg-neutral-20 rounded-xl" />
              <div className="cursor-pointer h-40 aspect-square bg-neutral-20 rounded-xl" />
              <div className="cursor-pointer h-40 aspect-square bg-neutral-20 rounded-xl" />
              <div className="cursor-pointer h-40 aspect-square bg-neutral-20 rounded-xl" />
              <div className="cursor-pointer h-40 aspect-square bg-neutral-20 rounded-xl" />
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
        </div>
      </div>
    </div>
  );
};

export default CadastrarProposta;
