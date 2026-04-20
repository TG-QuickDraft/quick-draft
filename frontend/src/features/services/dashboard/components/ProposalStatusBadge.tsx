type ProposalStatusBadgeProps = {
    isAceita: boolean;
    outraAceita: boolean;
};

const ProposalStatusBadge = ({
    isAceita,
    outraAceita,
}: ProposalStatusBadgeProps) => {
    const statusConfig = isAceita
        ? {
              label: "ACEITA",
              color: "bg-green-100 text-green-700 border-green-300",
          }
        : outraAceita
        ? {
              label: "REJEITADA (outra proposta escolhida)",
              color: "bg-red-100 text-red-600 border-red-300",
          }
        : {
              label: "EM ANÁLISE",
              color: "bg-yellow-100 text-yellow-700 border-yellow-300",
          };

    return (
        <div
            className={`w-fit px-4 py-1 rounded-full border text-sm font-semibold ${statusConfig.color}`}
        >
            {statusConfig.label}
        </div>
    );
};

export default ProposalStatusBadge;