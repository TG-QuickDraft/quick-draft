using AutoMapper;
using Backend.Application.DTOs.ProjetoFreelancer;
using Backend.Application.DTOs.Upload;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class ProjetoFreelancerService(
        IProjetoFreelancerRepository repository,
        IMapper mapper,

        IUrlBuilder urlBuilder
    ) : IProjetoFreelancerService
    {
        private readonly IProjetoFreelancerRepository _repository = repository;
        private readonly IMapper _mapper = mapper;
        private readonly IUrlBuilder _urlBuilder = urlBuilder;

        public async Task <ProjetoFreelancerDTO?> ConsultarPorIdAsync(int id)
        {
            var projeto = await _repository.ConsultarPorIdAsync(id);

            if (projeto == null)
                return null;

            if (projeto != null)
                projeto.ImagemUrl = _urlBuilder.ConstruirUrl(projeto.ImagemUrl ?? "");

            return _mapper.Map<ProjetoFreelancerDTO>(projeto);
        }

        public async Task<IEnumerable<ProjetoFreelancerDTO>> ConsultarPorIdFreelancerAsync(
            int freelancerId
        )
        {
            IEnumerable<ProjetoFreelancer> list =
                await _repository.ConsultarPorIdFreelancerAsync(freelancerId);

            foreach (var projeto in list)
            {
                projeto.ImagemUrl = _urlBuilder.ConstruirUrl(projeto.ImagemUrl ?? "");
            }

            return _mapper.Map<IEnumerable<ProjetoFreelancerDTO>>(list);
        }

        public async Task<ProjetoFreelancerDTO> CriarAsync(
            CriarProjetoFreelancerDTO adicionarProjeto,
            int freelancerId
        )
        {
            ProjetoFreelancer projetoToAdd = _mapper.Map<ProjetoFreelancer>(adicionarProjeto);
            projetoToAdd.FreelancerId = freelancerId;

            var projetoAdicionado = await _repository.CriarAsync(projetoToAdd);

            return _mapper.Map<ProjetoFreelancerDTO>(projetoAdicionado);
        }

        public async Task<bool> AtualizarImagemAsync(
            UploadImagemDTO dto, 
            int freelancerId,
            int projetoId
        )
        {
            var projeto = await _repository.ConsultarPorIdAsync(projetoId);
            if (projeto == null)
                return false;

            string folder = Path.Combine(
                "wwwroot",
                "uploads",
                "imagens-projeto-freelancer",
                freelancerId.ToString()
            );

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string fileName = dto.Imagem.FileName;
            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Imagem.CopyToAsync(stream);
            }

            projeto.ImagemUrl = $"uploads/imagens-projeto-freelancer/{freelancerId}/{fileName}";
            
            return await _repository.AtualizarAsync(projeto);
        }

    }
}