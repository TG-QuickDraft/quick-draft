using Backend.Application.Exceptions;
using Backend.Domain.Exceptions;
using System.Net;
using System.Text.Json;

namespace Backend.API.Middlewares{

public class ExceptionMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (RegraNegocioException ex)
        {
            await Handle(context, HttpStatusCode.UnprocessableEntity, ex.Message);
        }
        catch (DuplicateResourceException ex)
        {
            await Handle(context, HttpStatusCode.Conflict, ex.Message);
        }
        catch (NotFoundException ex)
        {
            await Handle(context, HttpStatusCode.NotFound, ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            await Handle(context, HttpStatusCode.Unauthorized, ex.Message);
        }
        catch (ArgumentException ex)
        {
            await Handle(context, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (Exception)
        {
            await Handle(
                context,
                HttpStatusCode.InternalServerError,
                "Erro interno do servidor."
            );
        }
    }

    private static async Task Handle(
        HttpContext context,
        HttpStatusCode status,
        string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)status;

        var response = JsonSerializer.Serialize(new
        {
            message
        });

        await context.Response.WriteAsync(response);
    }
}}