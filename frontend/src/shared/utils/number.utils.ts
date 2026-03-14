export const parseCurrencyToNumber = (
  value: string | number | undefined,
): number => {
  if (!value) return 0;

  if (typeof value === "number") return value;

  const cleanString = value.replace(/[^\d,-]/g, "").replace(",", ".");

  return Number(cleanString);
};
