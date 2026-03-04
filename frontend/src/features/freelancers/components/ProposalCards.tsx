import clsx from "clsx";

const ProposalCards = ({ img }: { img?: string }) => {
  return (
    <div
      className={clsx(
        "aspect-square w-100 bg-gray-400 rounded-xl border-2 border-gray-600/20",
        "transition hover:scale-101 hover:shadow-xl cursor-pointer overflow-hidden",
        "active:scale-98",
      )}
    >
      <img src={img} className="w-full h-full object-cover" />
    </div>
  );
};

export default ProposalCards;
