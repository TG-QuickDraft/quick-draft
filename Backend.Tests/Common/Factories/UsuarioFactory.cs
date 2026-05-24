using Backend.Application.DTOs.Usuario;
using Backend.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests.Common.Factories
{
    public static class UsuarioFactory
    {
        public static UsuarioDTO ObterUsuarioDTO(){
            return new UsuarioDTO
            {
                Id = 1,
                Email = "test@example.com",
                Cpf = "12345678900",
                Nome = "Test User",
                FotoPerfilUrl = "http://example.com/foto.jpg"
            };
        }

        public static CriarUsuarioDTO ObterCriarUsuarioDTO(
            bool incluirFoto = true
        ){
            IFormFile? fotoPerfil =
                incluirFoto ? ArquivoFactory.CriarArquivoFake(
                    nome: "foto.jpeg",
                    contentType: "image/jpeg",
                    tamanho: 1024
                ) : null;

            return new CriarUsuarioDTO
            {
                Email = "test@example.com",
                Senha = "password123",
                ConfirmarSenha = "password123",
                Cpf = "12345678900",
                Nome = "Test User",
                TipoUsuario = TipoUsuario.Cliente,
                FotoPerfil = fotoPerfil
            };
        }
    }
}
