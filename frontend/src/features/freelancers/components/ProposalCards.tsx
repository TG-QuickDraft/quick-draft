import clsx from "clsx";
import { formatUrl } from "@/shared/utils/url.utils";

const ProposalCards = ({ img, url }: { img?: string; url?: string }) => {

  return (
   <a href={formatUrl(url)} target="_blank" rel="noopener noreferrer">
      <div
        className={clsx(
          "aspect-square w-100 bg-gray-400 rounded-xl border-2 border-gray-600/20",
          "transition hover:scale-101 hover:shadow-xl cursor-pointer overflow-hidden",
          "active:scale-98",
        )}
      >
        <img src={img} className="w-full h-full object-cover" />
      </div>
    </a>
  );
};

export default ProposalCards;
