export class ApiError extends Error {
  status?: number;
  data?: any;

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
    this.status = error?.response?.status;
    this.data = error?.response?.data;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}