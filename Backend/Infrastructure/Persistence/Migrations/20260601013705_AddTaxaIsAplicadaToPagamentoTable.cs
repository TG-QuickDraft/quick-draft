using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTaxaIsAplicadaToPagamentoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "pag_is_taxa_aplicada",
                table: "pagamentos",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_created_at",
                value: new DateTime(2026, 6, 1, 1, 37, 3, 142, DateTimeKind.Utc).AddTicks(1111));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pag_is_taxa_aplicada",
                table: "pagamentos");

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_created_at",
                value: new DateTime(2026, 5, 9, 12, 21, 48, 291, DateTimeKind.Utc).AddTicks(2808));
        }
    }
}
