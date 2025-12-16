using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Config;
using Backend.Domain.Entities;
using Microsoft.Extensions.Options;

namespace Backend.Application.Services
{
    public class ClienteService(
        IClienteRepository repository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper,
        IOptions<ImageSettings> options
    ) : IClienteService
    {
        private readonly IClienteRepository _repository = repository;
        private readonly IUsuarioRepository _usuarioRepository = usuarioRepository;
        private readonly IMapper _mapper = mapper;
        private readonly ImageSettings _settings = options.Value;

        public async Task<IEnumerable<ClienteDTO>> ConsultarTodosAsync()
        {
            IEnumerable<Cliente> list = await _repository.ConsultarTodosAsync();

            foreach (var cliente in list)
            {
                if (!string.IsNullOrEmpty(cliente.Usuario?.FotoPerfilUrl))
                {
                    cliente.Usuario.FotoPerfilUrl = $"{_settings.BaseUrl}/{cliente.Usuario.FotoPerfilUrl}";
                }
            }

            return _mapper.Map<IEnumerable<ClienteDTO>>(list);
        }

        public async Task<ClienteDTO?> ConsultarPorIdAsync(int id)
        {
            var cliente = await _repository.ConsultarPorIdAsync(id);

            if (cliente == null)
                return null;

            var usuario = cliente.Usuario 
                ?? throw new InvalidOperationException("Cliente sem Usuario carregado");

            usuario.FotoPerfilUrl = $"{_settings.BaseUrl}/{cliente.Usuario?.FotoPerfilUrl}";
            
            return _mapper.Map<ClienteDTO>(cliente);
        }

        public async Task<ClienteDTO> CriarAsync(ClienteDTO cliente)
        {
            Cliente clienteDTO = await _repository.CriarAsync(_mapper.Map<Cliente>(cliente));

            return _mapper.Map<ClienteDTO>(clienteDTO);
        }

        public async Task<bool> AtualizarAsync(ClienteDTO cliente)
        {
            Cliente clienteEntidade = _mapper.Map<Cliente>(cliente);
            Usuario usuario = _mapper.Map<Usuario>(clienteEntidade.Usuario);

            usuario.Id = clienteEntidade.Id;

            return
                await _repository.AtualizarAsync(clienteEntidade)
                &&
                await _usuarioRepository.AtualizarAsync(usuario);
        }
    }
}