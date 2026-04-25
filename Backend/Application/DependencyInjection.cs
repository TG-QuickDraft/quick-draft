using Backend.Application.Interfaces.Services;
using Backend.Application.Services;
using Backend.Application.Validators;

namespace Backend.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ICartaoCreditoService, CartaoCreditoService>();
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IContaBancariaService, ContaBancariaService>();
            services.AddScoped<IFreelancerService, FreelancerService>();
            services.AddScoped<IProjetoFreelancerService, ProjetoFreelancerService>();
            services.AddScoped<IServicoService, ServicoService>();
            services.AddScoped<IEntregaService, EntregaService>();
            services.AddScoped<IPropostaService, PropostaService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMensagemServicoService, MensagemServicoService>();
            
            services.AddScoped<IAuditService, AuditService>();

            services.AddScoped<ArquivoValidator>();

            return services;
        }
    }
}
