import clsx from "clsx";

const alignments = {
  full: "h-full",
  screen: "h-screen",
};

const Spinner = ({
  alignment = "screen",
  background = false,
  className,
}: {
  alignment?: keyof typeof alignments;
  background?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        alignments[alignment],
        background && "bg-white",
        "w-full flex items-center justify-center absolute top-0 left-0 z-5",
      )}
    >
      <span
        className={clsx(
          "inline-block w-12 h-12 animate-spin rounded-full",
          "border-4 border-gray-600/20 border-t-secondary-100",
        )}
      />
    </div>
  );
};

export default Spinner;
