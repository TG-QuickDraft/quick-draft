using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Infrastructure.Persistence.Repositories;
using Backend.Infrastructure.Security;
using Backend.Infrastructure.Upload;
using Backend.Infrastructure.Url;

namespace Backend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IContaBancariaRepository, ContaBancariaRepository>();
            services.AddScoped<IFreelancerRepository, FreelancerRepository>();
            services.AddScoped<IProjetoFreelancerRepository, ProjetoFreelancerRepository>();
            services.AddScoped<IServicoRepository, ServicoRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<ITokenService, JwtService>();
            services.AddScoped<IUploadService, LocalUploadService>();
            services.AddScoped<IUrlBuilder, UrlBuilder>();

            return services;
        }
    }
}
