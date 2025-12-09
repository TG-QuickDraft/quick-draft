using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class EntidadeUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers");

            migrationBuilder.DropColumn(
                name: "fre_nome",
                table: "Freelancers");

            migrationBuilder.RenameTable(
                name: "Freelancers",
                newName: "freelancers");

            migrationBuilder.AlterColumn<int>(
                name: "fre_id",
                table: "freelancers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_freelancers",
                table: "freelancers",
                column: "fre_id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_freelancers_usuarios",
                table: "freelancers",
                column: "fre_id",
                principalTable: "usuarios",
                principalColumn: "usu_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_freelancers_usuarios",
                table: "freelancers");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_freelancers",
                table: "freelancers");

            migrationBuilder.RenameTable(
                name: "freelancers",
                newName: "Freelancers");

            migrationBuilder.AlterColumn<int>(
                name: "fre_id",
                table: "Freelancers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "fre_nome",
                table: "Freelancers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Freelancers",
                table: "Freelancers",
                column: "fre_id");
        }
    }
}
