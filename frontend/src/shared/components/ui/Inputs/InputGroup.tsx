import clsx from "clsx";

const InputGroup = ({
  children,
  notSpaced,
}: {
  children: React.ReactNode;
  notSpaced?: boolean;
}) => {
  return (
    <div className={clsx("flex flex-col gap-3 mb-6", notSpaced && "mb-0!")}>
      {children}
    </div>
  );
};

export default InputGroup;
