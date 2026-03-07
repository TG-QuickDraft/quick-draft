using AutoMapper;
using Backend.Application.DTOs.ProjetoFreelancer;
using Backend.Domain.Entities;

namespace Backend.Application.Mappings
{
    public class ProjetoFreelancerProfile : Profile
    {
        public ProjetoFreelancerProfile()
        {
            CreateMap<ProjetoFreelancerDTO, ProjetoFreelancer>();
            CreateMap<ProjetoFreelancer, ProjetoFreelancerDTO>();
            CreateMap<CriarProjetoFreelancerDTO, ProjetoFreelancer>();

            CreateMap<ProjetoDestacadoProposta, ProjetoFreelancerDTO>()
               .ConvertUsing((src, _, context) =>
                    context.Mapper.Map<ProjetoFreelancerDTO>(src.ProjetoFreelancer));

            CreateMap<ProjetoFreelancerDTO, ProjetoDestacadoProposta>()
                .ForMember(dest => dest.ProjetoFreelancerId,
                    opt => opt.MapFrom(src => src.Id));
        }
    }
}