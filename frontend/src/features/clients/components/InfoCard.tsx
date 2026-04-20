type Props = {
  value: string | number;
  label: string;
  dark?: boolean;
};

export const InfoCard = ({
  value,
  label,
  dark,
}: Props) => {
  return (
    <div
      className={`rounded-2xl px-5 py-4 min-w-36 ${
        dark
          ? "bg-primary-100 text-white"
          : "bg-secondary-100 text-zinc-900"
      }`}
    >
      <p className="text-2xl font-bold">{value}</p>

      <p
        className={`text-xs ${
          dark ? "opacity-80" : "text-zinc-600"
        }`}
      >
        {label}
      </p>
    </div>
  );
};