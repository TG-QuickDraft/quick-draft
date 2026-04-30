import clsx from "clsx";

const MarkdownToggleButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "py-1.5 px-3 border-b-4 border-transparent max-w-30 w-full text-neutral-10",
        active && "border-b-4 border-b-secondary-80! bg-primary-80",
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MarkdownToggleButton;
