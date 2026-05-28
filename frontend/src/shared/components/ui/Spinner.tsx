import clsx from "clsx";

const alignments = {
  full: "h-full w-full flex items-center justify-center absolute top-0 left-0 z-5",
  screen: "h-screen w-full flex items-center justify-center absolute top-0 left-0 z-5",
  none: "",
};

const sizes = {
  xs: "w-4 h-4 border-2",
  sm: "w-6 h-6 border-2",
  md: "w-12 h-12 border-4",
};

const Spinner = ({
  alignment = "screen",
  background = false,
  size = "md",
  className,
}: {
  alignment?: keyof typeof alignments;
  background?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        className,
        alignments[alignment],
        background && "bg-white",
      )}
    >
      <span
        className={clsx(
          "inline-block animate-spin rounded-full",
          sizes[size],
          "border-gray-600/20 border-t-secondary-100",
        )}
      />
    </div>
  );
};

export default Spinner;
