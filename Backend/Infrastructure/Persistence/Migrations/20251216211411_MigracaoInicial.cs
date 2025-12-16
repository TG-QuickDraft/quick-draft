using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MigracaoInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    usu_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usu_nome = table.Column<string>(type: "text", nullable: false),
                    usu_foto_perfil_url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.usu_id);
                });

            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    cli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clientes", x => x.cli_id);
                    table.ForeignKey(
                        name: "FK_clientes_usuarios",
                        column: x => x.cli_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "freelancers",
                columns: table => new
                {
                    fre_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_freelancers", x => x.fre_id);
                    table.ForeignKey(
                        name: "FK_freelancers_usuarios",
                        column: x => x.fre_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "servicos",
                columns: table => new
                {
                    ser_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ser_nome = table.Column<string>(type: "text", nullable: false),
                    ser_descricao = table.Column<string>(type: "text", nullable: false),
                    ser_cli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_servicos", x => x.ser_id);
                    table.ForeignKey(
                        name: "FK_servicos_clientes_ser_cli_id",
                        column: x => x.ser_cli_id,
                        principalTable: "clientes",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_servicos_ser_cli_id",
                table: "servicos",
                column: "ser_cli_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "freelancers");

            migrationBuilder.DropTable(
                name: "servicos");

            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "usuarios");
        }
    }
}
