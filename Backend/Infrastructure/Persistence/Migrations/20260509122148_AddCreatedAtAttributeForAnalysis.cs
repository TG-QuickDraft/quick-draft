using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtAttributeForAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "usu_created_at",
                table: "usuarios",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ser_created_at",
                table: "servicos",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "pjf_created_at",
                table: "projetos_freelancer",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "pag_created_at",
                table: "pagamentos",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ent_created_at",
                table: "entregas",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_created_at",
                value: new DateTime(2026, 5, 9, 12, 21, 48, 291, DateTimeKind.Utc).AddTicks(2808));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "usu_created_at",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "ser_created_at",
                table: "servicos");

            migrationBuilder.DropColumn(
                name: "pjf_created_at",
                table: "projetos_freelancer");

            migrationBuilder.DropColumn(
                name: "pag_created_at",
                table: "pagamentos");

            migrationBuilder.DropColumn(
                name: "ent_created_at",
                table: "entregas");
        }
    }
}
