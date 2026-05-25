namespace Backend.Application.Exceptions
{
    public class NotFoundException(string campo)
        : Exception($"{campo} não encontrado.");
}