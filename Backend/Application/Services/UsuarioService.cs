using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class UsuarioService(
        IUsuarioRepository repository,
        IMapper mapper
    ) : IUsuarioService
    {
        private readonly IUsuarioRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<UsuarioDTO?> ConsultarPorIdAsync(int id)
        {
            var usuario = await _repository.ConsultarPorIdAsync(id); 

            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public async Task<UsuarioDTO> CriarAsync(UsuarioDTO usuario)
        {
            var usuarioCriado = await _repository.CriarAsync(_mapper.Map<Usuario>(usuario)); 
            return _mapper.Map<UsuarioDTO>(usuarioCriado);
        }

        public async Task<bool> AtualizarAsync(UsuarioDTO usuario)
        {
            return await _repository.AtualizarAsync(_mapper.Map<Usuario>(usuario));
        }

        public async Task<bool> DeletarAsync(int id)
        {
            return await _repository.DeletarAsync(id);
        }

        public async Task<bool> AtualizarFotoAsync(PerfilUploadDTO dto)
        {
            var usuario = await _repository.ConsultarPorIdAsync(dto.Id);
            if (usuario == null)
                return false;

            string folder = Path.Combine("wwwroot/uploads/fotos-perfil");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string fileName = dto.FotoPerfil.FileName;
            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.FotoPerfil.CopyToAsync(stream);
            }

            usuario.FotoPerfilUrl = $"/uploads/fotos-perfil/{fileName}";
            
            return await _repository.AtualizarAsync(usuario);
        }
    }
}