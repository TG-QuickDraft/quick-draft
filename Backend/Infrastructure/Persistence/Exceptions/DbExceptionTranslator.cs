using Backend.Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Backend.Infrastructure.Persistence.Exceptions
{
    public static class DbExceptionTranslator
    {
        public static void ThrowIfKnown(Exception ex)
        {
            if (ex is DbUpdateException dbEx &&
                dbEx.InnerException is PostgresException pgEx)
            {
                if (pgEx.SqlState == PostgresErrorCodes.UniqueViolation)
                {
                    var constraint = pgEx.ConstraintName;

                    throw constraint switch
                    {
                        "IX_usuarios_usu_cpf" =>
                            new DuplicateResourceException("CPF"),

                        "IX_usuarios_usu_email" =>
                            new DuplicateResourceException("Email"),

                        _ => new DuplicateResourceException("Registro")
                    };
                }
            }
        }
    }

}