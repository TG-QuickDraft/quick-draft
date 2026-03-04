import StarRating from "@/shared/components/ui/StarRating";

import Image01 from "@/features/freelancers/assets/image01.jpg";
import Image02 from "@/features/freelancers/assets/image02.jpg";
import Image03 from "@/features/freelancers/assets/image03.jpg";

import { MockProfile } from "@/shared/assets";
import ProposalCards from "../components/ProposalCards";

const PropostaFreelancer = () => {
  return (
    <div className="flex flex-col gap-5 max-w-310 mx-auto w-full">
      <div className="flex gap-5 items-center flex-wrap">
        <div className="h-50 w-50 rounded-full border-2">
          <img
            src={MockProfile}
            alt="Profile photo"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">João Luiz</h1>
          <p className="text-[20px]">Design Gráfico / Editor de Vídeo</p>
        </div>

        <StarRating rating={4.2} />
      </div>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-2 w-50">
          <p className="text-[20px] font-semibold">Proposta</p>
          <div className="flex flex-col gap-1">
            <p>R$ 250,00 / Hora</p>
            <p>7 dias úteis</p>

            <div className="ml-5 text-[13px]">
              <p>R$ 4,46 por hora</p>
              <p>R$ 35,71 por dia útil</p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 min-w-50">
          <p className="text-[20px] font-semibold">
            Olá! sou João Luiz, profissional da área do design à 5 ano...
          </p>
          <h2>Items propostos: </h2>
          <ul className="font-semibold">
            <li>- Duas versões do menu</li>
            <li>- Tres edições gratuitas</li>
          </ul>
        </div>
      </div>

      <p className="text-xl mt-3">Projetos Selecionados em Destaque:</p>

      <div className="flex gap-5 flex-wrap justify-center">
        {[Image01, Image02, Image03].map((image, index) => (
          <ProposalCards key={index} img={image} />
        ))}
      </div>
    </div>
  );
};

export default PropostaFreelancer;
