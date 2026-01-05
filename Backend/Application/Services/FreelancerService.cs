using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class FreelancerService(
        IFreelancerRepository repository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper,
        IUrlBuilder urlBuilder
    ) : IFreelancerService
    {
        private readonly IFreelancerRepository _repository = repository;
        private readonly IUsuarioRepository _usuarioRepository = usuarioRepository;
        private readonly IMapper _mapper = mapper;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task<IEnumerable<FreelancerDTO>> ConsultarTodosAsync(string? nome)
        {
            IEnumerable<Freelancer> list = await _repository.ConsultarTodosAsync(nome);

            foreach (var freelancer in list)
            {
                var usuario = freelancer.Usuario 
                    ?? throw new InvalidOperationException("Freelancer sem Usuario carregado");

                usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");
            }

            return _mapper.Map<IEnumerable<FreelancerDTO>>(list);
        }

        public async Task<FreelancerDTO?> ConsultarPorIdAsync(int id)
        {
            var freelancer = await _repository.ConsultarPorIdAsync(id);

            if (freelancer == null)
                return null;

            var usuario = freelancer.Usuario 
                ?? throw new InvalidOperationException("Freelancer sem Usuario carregado");

            usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");

            return _mapper.Map<FreelancerDTO>(freelancer);
        }

        public async Task<FreelancerDTO> CriarAsync(int usuarioId)
        {
            Freelancer freelancerCriado = await _repository.CriarAsync(new Freelancer { Id = usuarioId });

            return _mapper.Map<FreelancerDTO>(freelancerCriado);
        }

        public async Task<bool> AtualizarAsync(FreelancerDTO freelancer)
        {
            Freelancer freelancerEntidade = _mapper.Map<Freelancer>(freelancer);
            Usuario usuario = _mapper.Map<Usuario>(freelancerEntidade.Usuario);

            usuario.Id = freelancerEntidade.Id;

            return
                await _repository.AtualizarAsync(freelancerEntidade)
                &&
                await _usuarioRepository.AtualizarAsync(usuario);
        }
    }
}