import clsx from "clsx";
import { RxCaretLeft } from "react-icons/rx";

const Title = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className="flex items-center">
      {onClick && (
        <RxCaretLeft
          onClick={onClick}
          size={40}
          className={clsx(
            "transition duration-200 cursor-pointer",
            "hover:-translate-x-1",
          )}
        />
      )}
      <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>
    </div>
  );
};
export default Title;
