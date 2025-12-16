using AutoMapper;
using Backend.Application.DTOs;
using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class ServicoService (
        IServicoRepository repository,
        IMapper mapper
    ) : IServicoService
    {
        private readonly IServicoRepository _repository = repository;
        private readonly IMapper _mapper = mapper;

        public async Task<ServicoDTO> CriarAsync(ServicoDTO criarServico)
        {
            Servico servicoCriado = await _repository.CriarAsync(
                _mapper.Map<Servico>(criarServico)
            );

            return _mapper.Map<ServicoDTO>(servicoCriado);
        }

        public async Task<IEnumerable<ServicoDTO>> ConsultarTodosAsync()
        {
            IEnumerable<Servico> list = await _repository.ConsultarTodosAsync();

            return _mapper.Map<IEnumerable<ServicoDTO>>(list);
        }

        public async Task<ServicoDTO?> ConsultarPorIdAsync(int id)
        {
            var servico = await _repository.ConsultarPorIdAsync(id);

            if (servico == null)
                return null;

            return _mapper.Map<ServicoDTO>(servico);
        }

        public async Task<bool> AtualizarAsync(ServicoDTO servico)
        {
            Servico servicoEntidade = _mapper.Map<Servico>(servico);

            return await _repository.AtualizarAsync(servicoEntidade);
        }
    }
}