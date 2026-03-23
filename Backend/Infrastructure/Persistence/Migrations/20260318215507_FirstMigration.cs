using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "audit_logs",
                columns: table => new
                {
                    adl_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    adl_entity_name = table.Column<string>(type: "text", nullable: false),
                    adl_datetime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    adl_action = table.Column<string>(type: "text", nullable: false),
                    adl_changes = table.Column<string>(type: "text", nullable: false),
                    adl_user = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_audit_logs", x => x.adl_id);
                });

            migrationBuilder.CreateTable(
                name: "bandeiras_cartao_credito",
                columns: table => new
                {
                    bcc_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    bcc_nome = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bandeiras_cartao_credito", x => x.bcc_id);
                });

            migrationBuilder.CreateTable(
                name: "tipos_conta",
                columns: table => new
                {
                    tpc_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tpc_nome = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipos_conta", x => x.tpc_id);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    usu_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usu_nome = table.Column<string>(type: "text", nullable: false),
                    usu_cpf = table.Column<string>(type: "text", nullable: false),
                    usu_email = table.Column<string>(type: "text", nullable: false),
                    usu_foto_perfil_url = table.Column<string>(type: "text", nullable: true),
                    usu_hash_senha = table.Column<string>(type: "text", nullable: false),
                    usu_is_admin = table.Column<bool>(type: "boolean", nullable: false)
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
                        name: "fk_cli_usu",
                        column: x => x.cli_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "freelancers",
                columns: table => new
                {
                    fre_id = table.Column<int>(type: "integer", nullable: false),
                    fre_descricao_perfil = table.Column<string>(type: "text", nullable: true),
                    fre_titulo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_freelancers", x => x.fre_id);
                    table.ForeignKey(
                        name: "fk_fre_usu",
                        column: x => x.fre_id,
                        principalTable: "usuarios",
                        principalColumn: "usu_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cartoes_credito",
                columns: table => new
                {
                    cre_id = table.Column<int>(type: "integer", nullable: false),
                    cre_nome_impresso = table.Column<string>(type: "text", nullable: false),
                    cre_codigo_seguranca = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    cre_bcc_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cartoes_credito", x => x.cre_id);
                    table.ForeignKey(
                        name: "FK_cartoes_credito_clientes_cre_id",
                        column: x => x.cre_id,
                        principalTable: "clientes",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_cre_bcc",
                        column: x => x.cre_bcc_id,
                        principalTable: "bandeiras_cartao_credito",
                        principalColumn: "bcc_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "contas_bancarias",
                columns: table => new
                {
                    con_id = table.Column<int>(type: "integer", nullable: false),
                    con_cpf_titular = table.Column<string>(type: "text", nullable: false),
                    con_nome_titular = table.Column<string>(type: "text", nullable: false),
                    con_banco = table.Column<string>(type: "text", nullable: false),
                    con_agencia = table.Column<string>(type: "text", nullable: false),
                    con_numero_conta = table.Column<string>(type: "text", nullable: false),
                    con_tpc_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contas_bancarias", x => x.con_id);
                    table.ForeignKey(
                        name: "FK_contas_bancarias_freelancers_con_id",
                        column: x => x.con_id,
                        principalTable: "freelancers",
                        principalColumn: "fre_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_con_tpc",
                        column: x => x.con_tpc_id,
                        principalTable: "tipos_conta",
                        principalColumn: "tpc_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "projetos_freelancer",
                columns: table => new
                {
                    pjf_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    pjf_nome = table.Column<string>(type: "text", nullable: false),
                    pjf_descricao = table.Column<string>(type: "text", nullable: true),
                    pjf_imagem_url = table.Column<string>(type: "text", nullable: true),
                    pjf_link = table.Column<string>(type: "text", nullable: true),
                    pjf_fre_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projetos_freelancer", x => x.pjf_id);
                    table.ForeignKey(
                        name: "fk_prj_fre",
                        column: x => x.pjf_fre_id,
                        principalTable: "freelancers",
                        principalColumn: "fre_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "projetos_destacados_proposta",
                columns: table => new
                {
                    pde_prj_id = table.Column<int>(type: "integer", nullable: false),
                    pde_pro_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projetos_destacados_proposta", x => new { x.pde_prj_id, x.pde_pro_id });
                    table.ForeignKey(
                        name: "fk_pde_prj",
                        column: x => x.pde_prj_id,
                        principalTable: "projetos_freelancer",
                        principalColumn: "pjf_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "propostas",
                columns: table => new
                {
                    pro_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    pro_valor_por_hora = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    pro_prazo_entrega = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    pro_valor_total = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    pro_mensagem = table.Column<string>(type: "text", nullable: false),
                    pro_itens_propostos = table.Column<string>(type: "text", nullable: false),
                    pro_taxa_sistema_adicionada_ao_total = table.Column<bool>(type: "boolean", nullable: false),
                    pro_fre_id = table.Column<int>(type: "integer", nullable: false),
                    pro_ser_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_propostas", x => x.pro_id);
                    table.ForeignKey(
                        name: "fk_pro_fre",
                        column: x => x.pro_fre_id,
                        principalTable: "freelancers",
                        principalColumn: "fre_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "servicos",
                columns: table => new
                {
                    ser_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ser_nome = table.Column<string>(type: "text", nullable: false),
                    ser_descricao = table.Column<string>(type: "text", nullable: false),
                    ser_orcamento_is_aberto = table.Column<bool>(type: "boolean", nullable: false),
                    ser_prazo = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ser_valor_minimo = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    ser_is_entregue = table.Column<bool>(type: "boolean", nullable: false),
                    ser_proposta_aceita_id = table.Column<int>(type: "integer", nullable: true),
                    ser_cli_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_servicos", x => x.ser_id);
                    table.ForeignKey(
                        name: "fk_ser_cli",
                        column: x => x.ser_cli_id,
                        principalTable: "clientes",
                        principalColumn: "cli_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_ser_pro_aceita",
                        column: x => x.ser_proposta_aceita_id,
                        principalTable: "propostas",
                        principalColumn: "pro_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "bandeiras_cartao_credito",
                columns: new[] { "bcc_id", "bcc_nome" },
                values: new object[,]
                {
                    { 1, "Mastercard" },
                    { 2, "Visa" },
                    { 3, "Elo" },
                    { 4, "American Express" },
                    { 5, "Hipercard" }
                });

            migrationBuilder.InsertData(
                table: "tipos_conta",
                columns: new[] { "tpc_id", "tpc_nome" },
                values: new object[,]
                {
                    { 1, "Corrente" },
                    { 2, "Poupança" }
                });

            migrationBuilder.InsertData(
                table: "usuarios",
                columns: new[] { "usu_id", "usu_cpf", "usu_email", "usu_foto_perfil_url", "usu_hash_senha", "usu_is_admin", "usu_nome" },
                values: new object[] { -1, "00000000000", "admin@sistema.com", "uploads/fotos-perfil/fotoADM.jpg", "AQAAAAIAAYagAAAAEHEM/Yc24Gwy0usv3Q4hrhUuLkyawKFjak/+t9BLGQo+9o5ziRkt7Rel7X6oHFVYOw==", true, "Administrador do Sistema" });

            migrationBuilder.CreateIndex(
                name: "IX_cartoes_credito_cre_bcc_id",
                table: "cartoes_credito",
                column: "cre_bcc_id");

            migrationBuilder.CreateIndex(
                name: "IX_contas_bancarias_con_tpc_id",
                table: "contas_bancarias",
                column: "con_tpc_id");

            migrationBuilder.CreateIndex(
                name: "IX_projetos_destacados_proposta_pde_pro_id",
                table: "projetos_destacados_proposta",
                column: "pde_pro_id");

            migrationBuilder.CreateIndex(
                name: "IX_projetos_freelancer_pjf_fre_id",
                table: "projetos_freelancer",
                column: "pjf_fre_id");

            migrationBuilder.CreateIndex(
                name: "IX_propostas_pro_fre_id",
                table: "propostas",
                column: "pro_fre_id");

            migrationBuilder.CreateIndex(
                name: "IX_propostas_pro_ser_id",
                table: "propostas",
                column: "pro_ser_id");

            migrationBuilder.CreateIndex(
                name: "IX_servicos_ser_cli_id",
                table: "servicos",
                column: "ser_cli_id");

            migrationBuilder.CreateIndex(
                name: "IX_servicos_ser_proposta_aceita_id",
                table: "servicos",
                column: "ser_proposta_aceita_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_usu_cpf",
                table: "usuarios",
                column: "usu_cpf",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_usu_email",
                table: "usuarios",
                column: "usu_email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_pde_pro",
                table: "projetos_destacados_proposta",
                column: "pde_pro_id",
                principalTable: "propostas",
                principalColumn: "pro_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_pro_ser",
                table: "propostas",
                column: "pro_ser_id",
                principalTable: "servicos",
                principalColumn: "ser_id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_ser_cli",
                table: "servicos");

            migrationBuilder.DropForeignKey(
                name: "fk_fre_usu",
                table: "freelancers");

            migrationBuilder.DropForeignKey(
                name: "fk_pro_fre",
                table: "propostas");

            migrationBuilder.DropForeignKey(
                name: "fk_ser_pro_aceita",
                table: "servicos");

            migrationBuilder.DropTable(
                name: "audit_logs");

            migrationBuilder.DropTable(
                name: "cartoes_credito");

            migrationBuilder.DropTable(
                name: "contas_bancarias");

            migrationBuilder.DropTable(
                name: "projetos_destacados_proposta");

            migrationBuilder.DropTable(
                name: "bandeiras_cartao_credito");

            migrationBuilder.DropTable(
                name: "tipos_conta");

            migrationBuilder.DropTable(
                name: "projetos_freelancer");

            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "freelancers");

            migrationBuilder.DropTable(
                name: "propostas");

            migrationBuilder.DropTable(
                name: "servicos");
        }
    }
}
