using Backend.Application.Interfaces.Infrastructure;
using Backend.Application.Interfaces.Repositories;
using Backend.Infrastructure.Persistence.Repositories;
using Backend.Infrastructure.Security;
using Backend.Infrastructure.Url;

namespace Backend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IClienteRepository, ClienteRepository>();
            services.AddScoped<IFreelancerRepository, FreelancerRepository>();
            services.AddScoped<IServicoRepository, ServicoRepository>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<IUrlBuilder, UrlBuilder>();
            
            services.AddScoped<ITokenService, JwtService>();

            return services;
        }
    }
}
