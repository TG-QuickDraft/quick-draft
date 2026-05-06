using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCreateAtAttributeForAnalysis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "usu_create_at",
                table: "usuarios",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ser_create_at",
                table: "servicos",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "pjf_create_at",
                table: "projetos_freelancer",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ent_create_at",
                table: "entregas",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "usuarios",
                keyColumn: "usu_id",
                keyValue: -1,
                column: "usu_create_at",
                value: new DateTime(2026, 5, 6, 13, 50, 7, 580, DateTimeKind.Utc).AddTicks(6708));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "usu_create_at",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "ser_create_at",
                table: "servicos");

            migrationBuilder.DropColumn(
                name: "pjf_create_at",
                table: "projetos_freelancer");

            migrationBuilder.DropColumn(
                name: "ent_create_at",
                table: "entregas");
        }
    }
}
