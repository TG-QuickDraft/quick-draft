export class ApiError extends Error {
  constructor(error: any) {
    const message =
      error?.response?.data?.message ??
      error?.response?.data?.erro ??
      error?.response?.data?.error ??
      error?.response?.data?.detail ??
      error?.response?.data?.msg ??
      error?.message ??
      "Erro inesperado.";

    super(message);

    this.name = "ApiError";

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}