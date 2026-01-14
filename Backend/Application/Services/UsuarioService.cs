using AutoMapper;
using Backend.Application.DTOs.Upload;
using Backend.Application.DTOs.Usuario;
using Backend.Application.Interfaces.Infrastructure;
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
        IFreelancerService freelancerService,

        IUploadService uploadService,
        IUrlBuilder urlBuilder
    ) : IUsuarioService
    {
        private readonly IUsuarioRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        private readonly IClienteService _clienteService = clienteService;
        private readonly IFreelancerService _freelancerService = freelancerService;

        private readonly IUploadService _uploadService = uploadService;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task<UsuarioDTO?> ConsultarPorIdAsync(int id)
        {
            var usuario = await _repository.ConsultarPorIdAsync(id);

            if (usuario != null)
                usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");

            return _mapper.Map<UsuarioDTO>(usuario);
        }

        public async Task<TipoUsuario> ObterTipoUsuario(int id)
        {
            var usuario = await _repository.ConsultarPorIdAsync(id)
                ?? throw new ArgumentException("Usuário não encontrado.");

            if (usuario.IsAdmin)
                return TipoUsuario.Admin;

            if (await _clienteService.ConsultarPorIdAsync(id) is not null)
                return TipoUsuario.Cliente;

            if (await _freelancerService.ConsultarPorIdAsync(id) is not null)
                return TipoUsuario.Freelancer;

            throw new ArgumentException("Usuário não encontrado.");
        }

        public async Task<UsuarioDTO> CriarAsync(CriarUsuarioDTO usuario)
        {
            Usuario usuarioACriar = _mapper.Map<Usuario>(usuario);
            usuarioACriar.HashSenha = PasswordHasherUtil.Hash(usuario.Senha);

            var usuarioCriado = await _repository.CriarAsync(usuarioACriar);

            switch (usuario.TipoUsuario)
            {
                case TipoUsuario.Cliente:
                    await _clienteService.CriarAsync(usuarioCriado.Id);    
                    break;

                case TipoUsuario.Freelancer:
                    await _freelancerService.CriarAsync(usuarioCriado.Id);    
                    break;

                default:
                    throw new ArgumentException("Tipo de usuário inválido.");
            }

            return _mapper.Map<UsuarioDTO>(usuarioCriado);
        }

        // TODO: Método do serviço não funciona
        public async Task<bool> AtualizarAsync(UsuarioDTO usuario)
        {
            // TODO: Fazer lógica corretamente (hash senha possívelmente deletado nessa atualização)

            return await _repository.AtualizarAsync(_mapper.Map<Usuario>(usuario));
        }

        public async Task<bool> AtualizarSenha(AtualizarSenhaDTO dto, int usuarioId)
        {
            Usuario? usuarioBanco = await _repository.ConsultarPorIdAsync(usuarioId);

            if (usuarioBanco == null)
            {
                return false;
            }

            usuarioBanco.HashSenha = PasswordHasherUtil.Hash(dto.NovaSenha);
            
            return await _repository.AtualizarAsync(usuarioBanco);
        }

        public async Task<bool> DeletarAsync(int id)
        {
            return await _repository.DeletarAsync(id);
        }

        public async Task<bool> AtualizarFotoAsync(UploadImagemDTO dto, int usuarioId)
        {
            var usuario = await _repository.ConsultarPorIdAsync(usuarioId);
            if (usuario == null)
                return false;

            string path = Path.Combine(
              "uploads",
              "fotos-perfil",
              usuarioId.ToString()  
            );

            usuario.FotoPerfilUrl = await _uploadService.UploadImagem(dto.Imagem, "uploads/fotos-perfil");
            
            return await _repository.AtualizarAsync(usuario);
        }
    }
}