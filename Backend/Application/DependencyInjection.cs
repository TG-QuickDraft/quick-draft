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
            services.AddScoped<IServicoService, ServicoService>();
            services.AddScoped<IUsuarioService, UsuarioService>();

            return services;
        }
    }
}
