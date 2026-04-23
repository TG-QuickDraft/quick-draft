import clsx from "clsx";

type Props = {
  value: string | number;
  label: string;
  dark?: boolean;
  className?: string;
};

export const InfoCard = ({ value, label, dark, className }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-2xl px-5 py-4 min-w-36",
        dark
          ? "bg-primary-100 text-white"
          : "bg-secondary-100 text-primary-100",
        className,
      )}
    >
      <p className="text-2xl font-semibold">{value}</p>

      <p className={`text-xs ${dark ? "opacity-80" : "text-neutral-80"}`}>
        {label}
      </p>
    </div>
  );
};
