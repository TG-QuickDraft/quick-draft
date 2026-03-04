import clsx from "clsx";

const ProposalCards = ({ img }: { img?: string }) => {
  return (
    <div
      className={clsx(
        "aspect-square w-100 bg-gray-400 rounded-xl border-2",
        "transition hover:scale-101 hover:shadow-xl cursor-pointer",
        "active:scale-98",
      )}
    >
      <img
        src={img}
        alt="Card"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default ProposalCards;
