export const deliveryPaths = {
  realizarPagamento: "/realizar-pagamento/:id",

  realizarPagamentoById: (id: string | number) => `/realizar-pagamento/${id}`,
};
