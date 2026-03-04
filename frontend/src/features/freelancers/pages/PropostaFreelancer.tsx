import StarRating from "@/shared/components/ui/StarRating";

const PropostaFreelancer = () => {
  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="h-50 w-50 rounded-full bg-gray-400"></div>

        <div>
          <h1 className="text-2xl">João Luiz</h1>
          <p>Design Gráfico / Editor de Vídeo</p>
        </div>

        <StarRating rating={5} />
      </div>

      <div className="flex gap-5">
        <div className="border w-50">
          <p>Proposta</p>
          <p>A proposta</p>
          <p>Mais coisas</p>
        </div>

        <div className="flex-1">
          <p>Eu sou eu</p>
          <h2>Items</h2>
          <ul className="list-disc ml-2">
            <li>Duas versões do menu</li>
            <li>Tres edições gratuitas</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="h-100 w-100 bg-gray-400 rounded-xl"></div>
        <div className="h-100 w-100 bg-gray-400 rounded-xl"></div>
        <div className="h-100 w-100 bg-gray-400 rounded-xl"></div>
        <div className="h-100 w-100 bg-gray-400 rounded-xl"></div>
        <div className="h-100 w-100 bg-gray-400 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PropostaFreelancer;
