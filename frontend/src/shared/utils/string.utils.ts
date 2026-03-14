export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

export const capitalizeEachWord = (str: string): string => {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const handleCapitalizedName = (value: string) =>
  value
    .replace(/\s{2,}/g, " ")
    .toLocaleLowerCase("pt-BR")
    .split(" ")
    .map((word) =>
      word ? word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1) : "",
    )
    .join(" ");
