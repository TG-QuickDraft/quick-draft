import clsx from "clsx";

const gaps = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
};

interface StackProps {
  align?: "left" | "center" | "right";
  direction?: "row" | "col";
  justify?: "start" | "center" | "end";
  wFull?: boolean;
  gap?: keyof typeof gaps;
  children: React.ReactNode;
  className?: string;
}

const Stack = ({
  align = "center",
  direction = "col",
  justify = "center",
  gap = 2,
  wFull,
  className,
  children,
}: StackProps) => {
  return (
    <div
      className={clsx(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        {
          left: "items-start",
          center: "items-center",
          right: "items-end",
        }[align],
        {
          start: "justify-start",
          center: "justify-center",
          end: "justify-end",
        }[justify],
        gaps[gap],
        wFull && "w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Stack;
