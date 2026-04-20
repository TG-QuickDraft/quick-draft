import clsx from "clsx";
import { formatUrl } from "@/shared/utils/url.utils";

const MiniProposalCard = ({
  img,
  url,
}: {
  img?: string;
  url?: string;
}) => {
  return (
    <a href={formatUrl(url)} target="_blank" rel="noopener noreferrer">
      <div
        className={clsx(
          "w-28 h-28 rounded-lg overflow-hidden",
          "bg-gray-200 border border-gray-300",
          "transition-all duration-200",
          "hover:scale-105 hover:shadow-md",
          "active:scale-95 cursor-pointer"
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

export default MiniProposalCard;