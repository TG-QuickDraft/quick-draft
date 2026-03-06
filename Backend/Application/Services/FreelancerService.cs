using AutoMapper;
using Backend.Application.DTOs.Freelancer;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Pagination;
using Backend.Application.Pagination.Extensions;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class FreelancerService(
        IFreelancerRepository repository,
        IMapper mapper,
        IUrlBuilder urlBuilder
    ) : IFreelancerService
    {
        private readonly IFreelancerRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task<PagedResult<FreelancerDTO>> ConsultarTodosAsync(
            string? nome,
            int pagina,
            int tamanhoPagina
        )
        {
            tamanhoPagina = tamanhoPagina < 1 ? 30 : tamanhoPagina;
            tamanhoPagina = tamanhoPagina > 100 ? 100 : tamanhoPagina;

            var list = await _repository.ConsultarTodosAsync(nome, pagina, tamanhoPagina);

            foreach (var freelancer in list.Itens)
            {
                var usuario =
                    freelancer.Usuario
                    ?? throw new InvalidOperationException("Freelancer sem Usuario carregado");

                usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");
            }

            return list.Map<Freelancer, FreelancerDTO>(_mapper);
        }

        public async Task<FreelancerDTO?> ConsultarPorIdAsync(int id)
        {
            var freelancer = await _repository.ConsultarPorIdAsync(id);

            if (freelancer == null)
                return null;

            var usuario =
                freelancer.Usuario
                ?? throw new InvalidOperationException("Freelancer sem Usuario carregado");

            usuario.FotoPerfilUrl = _urlBuilder.ConstruirUrl(usuario.FotoPerfilUrl ?? "");

            return _mapper.Map<FreelancerDTO>(freelancer);
        }

        public async Task<FreelancerDTO> CriarAsync(int usuarioId)
        {
            Freelancer freelancerCriado = await _repository.CriarAsync(
                new Freelancer { Id = usuarioId }
            );

            return _mapper.Map<FreelancerDTO>(freelancerCriado);
        }

        public async Task<bool> AtualizarAsync(AtualizarFreelancerDTO dto, int freelancerId)
        {
            Freelancer freelancer =
                await _repository.ConsultarPorIdAsync(freelancerId)
                ?? throw new InvalidOperationException("Freelancer não encontrado");

            freelancer.DescricaoPerfil = dto.DescricaoPerfil;
            freelancer.Titulo = dto.Titulo;

            return await _repository.AtualizarAsync(freelancer);
        }
    }
}
