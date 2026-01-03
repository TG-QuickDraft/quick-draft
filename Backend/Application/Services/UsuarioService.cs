using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Utils;
using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Services
{
    public class UsuarioService(
        IUsuarioRepository repository,
        IMapper mapper,

        IClienteService clienteService,
        IFreelancerService freelancerService
    ) : IUsuarioService
    {
        private readonly IUsuarioRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        private readonly IClienteService _clienteService = clienteService;
        private readonly IFreelancerService _freelancerService = freelancerService;

        public async Task<UsuarioDTO?> ConsultarPorIdAsync(int id)
        {
            var usuario = await _repository.ConsultarPorIdAsync(id); 

            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public async Task<TipoUsuario> ObterTipoUsuario(int id)
        {
            var usuario = await _repository.ConsultarPorIdAsync(id);

            if (usuario == null)
                throw new ArgumentException("Usuário não encontrado.");

            if (usuario.IsAdmin)
            {
                return TipoUsuario.Admin;   
            }

            var cliente = await _clienteService.ConsultarPorIdAsync(id);
        
            if (cliente is not null)
            {
                return TipoUsuario.Cliente;
            }

            var freelancer = _freelancerService.ConsultarPorIdAsync(id);

            if (freelancer is not null)
            {
                return TipoUsuario.Freelancer;
            }

            throw new ArgumentException("Usuário não encontrado.");
        }

        public async Task<UsuarioDTO> CriarAsync(CriarUsuarioDTO usuario)
        {
            Usuario usuarioACriar = _mapper.Map<Usuario>(usuario);
            usuarioACriar.HashSenha = PasswordHasherUtil.Hash(usuario.Senha);

            var usuarioCriado = await _repository.CriarAsync(usuarioACriar);

            if (usuario.TipoUsuario == TipoUsuario.Cliente)
            {
                await _clienteService.CriarAsync(usuarioCriado.Id);
            }
            else if (usuario.TipoUsuario == TipoUsuario.Freelancer)
            {
                await _freelancerService.CriarAsync(usuarioCriado.Id);
            } else
            {
                throw new ArgumentException("Tipo de usuário inválido.");
            }

            return _mapper.Map<UsuarioDTO>(usuarioCriado);
        }

        public async Task<bool> AtualizarAsync(UsuarioDTO usuario)
        {
            // TODO: Fazer lógica corretamente (hash senha possívelmente deletado nessa atualização)

            return await _repository.AtualizarAsync(_mapper.Map<Usuario>(usuario));
        }

        public async Task<bool> DeletarAsync(int id)
        {
            return await _repository.DeletarAsync(id);
        }

        public async Task<bool> AtualizarFotoAsync(PerfilUploadDTO dto)
        {
            var usuario = await _repository.ConsultarPorIdAsync(dto.UsuarioId);
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