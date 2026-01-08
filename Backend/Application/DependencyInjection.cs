using Backend.Application.Interfaces.Services;
using Backend.Application.Services;

namespace Backend.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IFreelancerService, FreelancerService>();
            services.AddScoped<IProjetoFreelancerService, ProjetoFreelancerService>();
            services.AddScoped<IServicoService, ServicoService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }
    }
}
