using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ServiceMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "mensagens_servico",
                columns: table => new
                {
                    mss_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mss_ser_id = table.Column<int>(type: "integer", nullable: false),
                    mss_data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    mss_mensagem = table.Column<string>(type: "text", nullable: false),
                    mss_remetente_usu_id = table.Column<int>(type: "integer", nullable: false),
                    mss_destinatario_usu_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mensagens_servico", x => x.mss_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "mensagens_servico");
        }
    }
}
