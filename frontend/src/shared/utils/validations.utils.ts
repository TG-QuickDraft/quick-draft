export const validateDate = (value: string) => {
  if (!value) return false;

  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const validateFutureDate = (value: string) => {
  if (!value) return false;

  const inputDate = new Date(value);
  const now = new Date();

  return inputDate > now;
};

export const validateCurrency = (value: string) => {
  if (!value) return false;

  const numeric = Number(value.replace(/[^\d,-]/g, "").replace(",", "."));

  return numeric > 0;
};
