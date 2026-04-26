import clsx from "clsx";
import { formatUrl } from "@/shared/utils/url.utils";

type Props = {
  img?: string;
  url?: string;
  className?: string;
};

const ProposalCards = ({ img, url, className }: Props) => {
  return (
    <a href={formatUrl(url)} target="_blank" rel="noopener noreferrer">
      <div
        className={clsx(
          "aspect-square bg-gray-400 rounded-xl border border-gray-200",
          "transition hover:scale-[1.02] hover:shadow-lg cursor-pointer overflow-hidden",
          "active:scale-[0.98]",
          className
        )}
      >
        <img
          src={img}
          className="w-full h-full object-cover"
        />
      </div>
    </a>
  );
};

export default ProposalCards;