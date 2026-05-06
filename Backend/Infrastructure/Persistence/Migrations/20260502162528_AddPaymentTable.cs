using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pagamentos",
                columns: table => new
                {
                    pag_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    pag_cre_id = table.Column<int>(type: "integer", nullable: false),
                    pag_ser_id = table.Column<int>(type: "integer", nullable: false),
                    pag_valor = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pagamentos", x => x.pag_id);
                    table.ForeignKey(
                        name: "fk_pag_cre",
                        column: x => x.pag_cre_id,
                        principalTable: "cartoes_credito",
                        principalColumn: "cre_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_pag_ser",
                        column: x => x.pag_ser_id,
                        principalTable: "servicos",
                        principalColumn: "ser_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_cpf",
                value: "000.000.000-00");

            migrationBuilder.CreateIndex(
                name: "IX_pagamentos_pag_cre_id",
                table: "pagamentos",
                column: "pag_cre_id");

            migrationBuilder.CreateIndex(
                name: "IX_pagamentos_pag_ser_id",
                table: "pagamentos",
                column: "pag_ser_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pagamentos");

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_cpf",
                value: "00000000000");
        }
    }
}
