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
        "p-1.5 border-b-4 border-transparent max-w-25 w-full cursor-pointer",
        active && "border-b-4 border-b-neutral-20! bg-primary-80",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MarkdownToggleButton;
