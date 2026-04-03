using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UniqueProposalByFreelancer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_propostas_pro_ser_id",
                table: "propostas");

            migrationBuilder.CreateIndex(
                name: "IX_propostas_pro_ser_id_pro_fre_id",
                table: "propostas",
                columns: new[] { "pro_ser_id", "pro_fre_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_propostas_pro_ser_id_pro_fre_id",
                table: "propostas");

            migrationBuilder.CreateIndex(
                name: "IX_propostas_pro_ser_id",
                table: "propostas",
                column: "pro_ser_id");
        }
    }
}
