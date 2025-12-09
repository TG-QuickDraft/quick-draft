using AutoMapper;
using Backend.Config;
using Backend.DTO;
using Backend.Models;
using Backend.Repositories.Interfaces;
using Backend.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace Backend.Services.Implementations
{
    public class FreelancerService(
        IFreelancerRepository repository,
        IUsuarioRepository usuarioRepository,
        IMapper mapper,
        IOptions<ImageSettings> options
    ) : IFreelancerService
    {
        private readonly IFreelancerRepository _repository = repository;
        private readonly IUsuarioRepository _usuarioRepository = usuarioRepository;
        private readonly IMapper _mapper = mapper;
        private readonly ImageSettings _settings = options.Value;

        public async Task<IEnumerable<FreelancerDTO>> ConsultarTodosAsync()
        {
            IEnumerable<Freelancer> list = await _repository.ConsultarTodosAsync();

            foreach (var freelancer in list)
            {
                if (!string.IsNullOrEmpty(freelancer.Usuario.FotoPerfilUrl))
                {
                    freelancer.Usuario.FotoPerfilUrl = $"{_settings.BaseUrl}/{freelancer.Usuario.FotoPerfilUrl}";
                }
            }

            return _mapper.Map<IEnumerable<FreelancerDTO>>(list);
        }

        public async Task<FreelancerDTO?> ConsultarPorIdAsync(int id)
        {
            var freelancer = await _repository.ConsultarPorIdAsync(id);

            if (freelancer == null)
                return null;

            freelancer.Usuario.FotoPerfilUrl = $"{_settings.BaseUrl}/{freelancer.Usuario.FotoPerfilUrl}";

            return _mapper.Map<FreelancerDTO>(freelancer);
        }

        public async Task<FreelancerDTO> CriarAsync(FreelancerDTO freelancer)
        {
            Freelancer freelancerCriado = await _repository.CriarAsync(_mapper.Map<Freelancer>(freelancer));

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