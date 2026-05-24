namespace Backend.Application.Exceptions
{
    public class DuplicateResourceException(string campo)
        : Exception($"{campo} já cadastrado.");
}