using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddingRatingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "avaliacoes",
                columns: table => new
                {
                    ava_ser_id = table.Column<int>(type: "integer", nullable: false),
                    ava_autor_id = table.Column<int>(type: "integer", nullable: false),
                    ava_alvo_id = table.Column<int>(type: "integer", nullable: false),
                    ava_nota_estrelas = table.Column<int>(type: "integer", nullable: false),
                    ava_comentario = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avaliacoes", x => new { x.ava_ser_id, x.ava_autor_id, x.ava_alvo_id });
                    table.ForeignKey(
                        name: "fk_ava_ser",
                        column: x => x.ava_ser_id,
                        principalTable: "servicos",
                        principalColumn: "ser_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_ava_usu_alvo",
                        column: x => x.ava_alvo_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_ava_usu_autor",
                        column: x => x.ava_autor_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_avaliacoes_ava_alvo_id",
                table: "avaliacoes",
                column: "ava_alvo_id");

            migrationBuilder.CreateIndex(
                name: "IX_avaliacoes_ava_autor_id",
                table: "avaliacoes",
                column: "ava_autor_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "avaliacoes");
        }
    }
}
