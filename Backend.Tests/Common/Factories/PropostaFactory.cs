using Backend.Application.DTOs.Proposta;

namespace Backend.Tests.Common.Factories
{
    public static class PropostaFactory
    {
        public static PropostaDTO ObterPropostaDTO()
        {
            return new PropostaDTO
            {
                FreelancerId = 10
            };
        }

    }
}