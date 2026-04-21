import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import StarRating from "@/shared/components/ui/StarRating";

type Props = {
  cliente: ClienteDTO | null;
};

export const ClienteIdentity = ({ cliente }: Props) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg md:text-xl font-bold text-zinc-900 leading-tight truncate">
          {cliente?.nome}
        </h1>

        <p className="text-sm text-zinc-600 mt-1 truncate">
          {cliente?.email}
        </p>
      </div>

      <div className="shrink-0 pt-1">
        <div className="scale-90 origin-top-right">
          <StarRating rating={4} />
        </div>
      </div>
    </div>
  );
};