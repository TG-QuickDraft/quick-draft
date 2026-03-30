export const toLocaleString = (
  data: Date | string,
  options?: { somenteData: boolean },
): string => {
  return new Date(data).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: options?.somenteData ? "short" : undefined,
    timeStyle: options?.somenteData ? undefined : "medium",
  });
};
