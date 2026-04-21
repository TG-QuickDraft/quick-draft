import clsx from "clsx";

const LimitadorLargura = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction?: "row" | "col";
}) => {
  return (
    <div
      className={clsx(
        "flex gap-4 px-4",
        "md:px-10 max-w-280 mx-auto w-full",
        direction === "row" ? "flex-row" : "flex-col",
      )}
    >
      {children}
    </div>
  );
};

export default LimitadorLargura;
