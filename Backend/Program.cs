using Backend.Application.Interfaces.Repositories;
using Backend.Application.Interfaces.Services;
using Backend.Application.Services;
using Backend.Config;
using Backend.Infrastructure.Persistence;
using Backend.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var map = new Dictionary<Type, Type>()
{
    { typeof(IUsuarioService), typeof(UsuarioService) },
    { typeof(IUsuarioRepository), typeof(UsuarioRepository) },

    { typeof(IFreelancerService), typeof(FreelancerService) },
    { typeof(IFreelancerRepository), typeof(FreelancerRepository) },

    { typeof(IClienteService), typeof(ClienteService) },
    { typeof(IClienteRepository), typeof(ClienteRepository) },
    
    { typeof(IServicoService), typeof(ServicoService) },
    { typeof(IServicoRepository), typeof(ServicoRepository) },
};

foreach (var entry in map){
    builder.Services.AddScoped(entry.Key, entry.Value);
}

builder.Services.Configure<ImageSettings>(builder.Configuration.GetSection("ImageSettings"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "PermitirOrigemFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("PermitirOrigemFrontend");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
