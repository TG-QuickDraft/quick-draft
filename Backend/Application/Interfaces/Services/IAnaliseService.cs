using Backend.Application.DTOs.Analise;

namespace Backend.Application.Interfaces.Services
{
    public interface IAnaliseService
    {
        Task<AnaliseDto> GetAnaliseDataAsync(DateTime? startDate, DateTime? endDate);
    }
}
