namespace Backend.Application.Exceptions
{
    public class NotFoundException(string campo)
        : AppException($"{campo} não encontrado.", 404);
}