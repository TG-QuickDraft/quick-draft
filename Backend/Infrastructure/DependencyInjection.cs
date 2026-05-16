using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Infrastructure.Persistence.Repositories;
using Backend.Infrastructure.Security;
using Backend.Infrastructure.Settings;
using Backend.Infrastructure.Upload;
using Backend.Infrastructure.Url;

namespace Backend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<ICartaoCreditoRepository, CartaoCreditoRepository>();
            services.AddScoped<IContaBancariaRepository, ContaBancariaRepository>();
            services.AddScoped<IFreelancerRepository, FreelancerRepository>();
            services.AddScoped<IProjetoFreelancerRepository, ProjetoFreelancerRepository>();
            services.AddScoped<IServicoRepository, ServicoRepository>();
            services.AddScoped<IEntregaRepository, EntregaRepository>();
            services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();
            services.AddScoped<IPropostaRepository, PropostaRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IAuditRepository, AuditRepository>();
            services.AddScoped<IMensagemServicoRepository, MensagemServicoRepository>();
            services.AddScoped<IPagamentoRepository, PagamentoRepository>();

            services.AddScoped<ITokenService, JwtService>();
            services.AddScoped<IUrlBuilder, UrlBuilder>();

            // Configuração condicional do UploadService
            var githubSettings = configuration.GetSection("GithubSettings");
            var googleDriveSettings = configuration.GetSection("GoogleDriveSettings");

            if (githubSettings.Exists() && !string.IsNullOrEmpty(githubSettings["Token"]))
            {
                services.Configure<GithubSettings>(githubSettings);
                services.AddScoped<IUploadService, GithubUploadService>();
            }
            else if (googleDriveSettings.Exists() && !string.IsNullOrEmpty(googleDriveSettings["ServiceAccountEmail"]))
            {
                services.Configure<GoogleDriveSettings>(googleDriveSettings);
                services.AddScoped<IUploadService, GoogleDriveUploadService>();
            }
            else
            {
                services.AddScoped<IUploadService, LocalUploadService>();
            }

            return services;
        }
    }
}
