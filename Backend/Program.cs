using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json.Serialization;
using Backend.Application;
using Backend.Infrastructure;
using Backend.Infrastructure.Persistence;
using Backend.Infrastructure.Persistence.Interceptors;
using Backend.Infrastructure.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplication();
builder.Services.AddInfrastructure();

builder.Services.Configure<ImageSettings>(builder.Configuration.GetSection("ImageSettings"));

builder.Services.AddScoped<AuditInterceptor>();

builder.Services.AddDbContext<AppDbContext>((serviceProvider, options) =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.AddInterceptors(serviceProvider.GetRequiredService<AuditInterceptor>());
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder
    .Services.AddControllers()
    .AddJsonOptions(opt => opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "PermitirOrigemFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder
    .Services.AddAuthentication("Bearer")
    .AddJwtBearer(opt =>
    {
        opt.MapInboundClaims = false;

        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            ),
            RoleClaimType = "roles",
        };
    });

var port = Environment.GetEnvironmentVariable("PORT") ?? "5191";

builder.WebHost.UseUrls($"http://*:{port}");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("PermitirOrigemFrontend");

app.UseDefaultFiles();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();