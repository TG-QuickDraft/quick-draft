using AutoMapper;
using Backend.Application.DTOs.Cliente;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class ClienteService(
        IClienteRepository repository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper,
        IUrlBuilder urlBuilder
    ) : IClienteService
    {
        private readonly IClienteRepository _repository = repository;
        private readonly IUsuarioRepository _usuarioRepository = usuarioRepository;
        private readonly IMapper _mapper = mapper;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task<IEnumerable<ClienteDTO>> ConsultarTodosAsync()
        {
            IEnumerable<Cliente> list = await _repository.ConsultarTodosAsync();

            foreach (var cliente in list)
            {
                if (!string.IsNullOrEmpty(cliente.Usuario?.FotoPerfilUrl))
                {
                    cliente.Usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(cliente.Usuario.FotoPerfilUrl ?? "");
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

            usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");
            
            return _mapper.Map<ClienteDTO>(cliente);
        }

        public async Task<ClienteDTO> CriarAsync(int usuarioId)
        {
            Cliente clienteDTO = await _repository.CriarAsync(new Cliente { Id = usuarioId });

            return _mapper.Map<ClienteDTO>(clienteDTO);
        }

        // TODO: Método do serviço não funciona
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