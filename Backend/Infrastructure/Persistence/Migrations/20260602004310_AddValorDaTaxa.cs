using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddValorDaTaxa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "pag_valor_taxa",
                table: "pagamentos",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_created_at",
                value: new DateTime(2026, 6, 2, 0, 43, 8, 392, DateTimeKind.Utc).AddTicks(7494));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pag_valor_taxa",
                table: "pagamentos");

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_created_at",
                value: new DateTime(2026, 6, 1, 1, 37, 3, 142, DateTimeKind.Utc).AddTicks(1111));
        }
    }
}
