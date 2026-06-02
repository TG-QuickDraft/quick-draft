namespace Backend.Domain.Exceptions
{
    public class RegraNegocioException(string mensagem)
        : Exception(mensagem);
}