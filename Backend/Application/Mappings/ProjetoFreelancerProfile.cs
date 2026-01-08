using AutoMapper;
using Backend.Application.DTOs;
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
        }
    }
}