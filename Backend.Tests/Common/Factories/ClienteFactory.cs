using AutoMapper;
using Backend.Application.DTOs.Cliente;

namespace Backend.Tests.Common.Factories
{
    public static class ClienteFactory
    {
        public static ClienteDTO ObterClienteDTO()
        {
            return new ClienteDTO
            {
                Id = 1,
                Email = "test@example.com",
                FotoPerfilUrl = null,
                Nome = "Test Client",
            };
        }
    }
}