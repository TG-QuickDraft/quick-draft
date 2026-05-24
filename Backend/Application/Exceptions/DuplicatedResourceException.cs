namespace Backend.Application.Exceptions
{
    public class DuplicateResourceException(string campo)
        : AppException($"{campo} já cadastrado.", 409);
}