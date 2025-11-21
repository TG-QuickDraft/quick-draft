CREATE TABLE IF NOT EXISTS "usuarios" (
	"usu_id" INTEGER NOT NULL UNIQUE,
	"usu_nome" VARCHAR(255) NOT NULL,
	"usu_cpf" CHAR(11) NOT NULL,
	"usu_email" VARCHAR(255) NOT NULL,
	"usu_foto_perfil_url" VARCHAR(255),
	"usu_hash_senha" TEXT NOT NULL,
	"usu_is_admin" BOOLEAN NOT NULL,
	PRIMARY KEY("usu_id")
);




CREATE TABLE IF NOT EXISTS "freelancers" (
	"fre_id" INTEGER NOT NULL UNIQUE,
	"fre_descricao_perfil" TEXT,
	"fre_titulo" VARCHAR(255),
	PRIMARY KEY("fre_id")
);




CREATE TABLE IF NOT EXISTS "clientes" (
	"cli_id" INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("cli_id")
);




CREATE TABLE IF NOT EXISTS "contas_bancarias" (
	"con_id" INTEGER NOT NULL,
	"con_cpf_titular" VARCHAR(11) NOT NULL,
	"con_nome_titular" VARCHAR(255) NOT NULL,
	"con_banco" VARCHAR(100) NOT NULL,
	"con_agencia" VARCHAR(10) NOT NULL,
	"con_numero_conta" VARCHAR(20) NOT NULL,
	"con_tpc_id" INTEGER NOT NULL,
	"con_fre_id" INTEGER NOT NULL,
	PRIMARY KEY("con_id")
);




CREATE TABLE IF NOT EXISTS "propostas" (
	"pro_id" INTEGER NOT NULL,
	"pro_fre_id" INTEGER NOT NULL,
	"pro_ser_id" INTEGER NOT NULL,
	"pro_valor_por_hora" NUMERIC(5) NOT NULL,
	"pro_orcamento_de_tempo" TIMESTAMPTZ NOT NULL,
	"pro_mensagem" TEXT NOT NULL,
	"pro_itens_propostos" TEXT NOT NULL,
	"pro_valor_total" INTEGER NOT NULL,
	"pro_taxa_sistema_adicionada_ao_total" BOOLEAN NOT NULL,
	PRIMARY KEY("pro_id")
);




CREATE TABLE IF NOT EXISTS "servicos" (
	"ser_id" INTEGER NOT NULL UNIQUE,
	"ser_cli_id" INTEGER NOT NULL,
	"ser_nome" VARCHAR(255) NOT NULL,
	"ser_descricao" TEXT NOT NULL,
	"ser_orcamento" NUMERIC(6,2) NOT NULL,
	"ser_prazo" TIMESTAMPTZ NOT NULL,
	"ser_valor_minimo" NUMERIC(6,2) NOT NULL,
	"ser_proposta_aceita_id" INTEGER,
	PRIMARY KEY("ser_id")
);




CREATE TABLE IF NOT EXISTS "projetos_freelancer" (
	"pjf_id" INTEGER NOT NULL UNIQUE,
	"pjf_fre_id" INTEGER NOT NULL,
	"pjf_nome" VARCHAR(255) NOT NULL,
	"pjf_descricao" TEXT,
	"pjf_imagem_url" VARCHAR(255),
	"pjf_link" VARCHAR(255),
	PRIMARY KEY("pjf_id")
);




CREATE TABLE IF NOT EXISTS "cartoes_credito" (
	"cre_id" INTEGER NOT NULL UNIQUE,
	"cre_nome_impresso" VARCHAR(255) NOT NULL,
	"cre_bcc_id" INTEGER NOT NULL,
	"cre_codigo_seguranca" CHAR(3) NOT NULL,
	"cre_usu_id" INTEGER NOT NULL,
	PRIMARY KEY("cre_id")
);




CREATE TABLE IF NOT EXISTS "avaliacoes" (
	"ava_id" INTEGER NOT NULL UNIQUE,
	"ava_usu_id" INTEGER NOT NULL,
	"ava_nota_estrelas" INTEGER NOT NULL,
	"ava_comentario" TEXT,
	PRIMARY KEY("ava_id")
);




CREATE TABLE IF NOT EXISTS "projetos_destacados_proposta" (
	"pde_prj_id" INTEGER NOT NULL,
	"pde_pro_id" INTEGER NOT NULL,
	PRIMARY KEY("pde_prj_id", "pde_pro_id")
);




CREATE TABLE IF NOT EXISTS "pagamentos" (
	"pag_id" INTEGER NOT NULL UNIQUE,
	"pag_cre_id" INTEGER NOT NULL,
	"pag_ser_id" INTEGER NOT NULL,
	"pag_valor" NUMERIC(6,2) NOT NULL,
	PRIMARY KEY("pag_id")
);




CREATE TABLE IF NOT EXISTS "mensagens_servico" (
	"mss_id" INTEGER NOT NULL UNIQUE,
	"mss_ser_id" INTEGER NOT NULL,
	"mss_data" TIMESTAMPTZ NOT NULL,
	"mss_mensagem" TEXT NOT NULL,
	"mss_remetente_usu_id" INTEGER NOT NULL,
	"mss_destinatario_usu_id" INTEGER NOT NULL,
	PRIMARY KEY("mss_id")
);




CREATE TABLE IF NOT EXISTS "bandeiras_cartao_credito" (
	"bcc_id" INTEGER NOT NULL UNIQUE,
	"bcc_nome" VARCHAR(30) NOT NULL,
	PRIMARY KEY("bcc_id")
);




CREATE TABLE IF NOT EXISTS "tipos_conta" (
	"tpc_id" INTEGER NOT NULL UNIQUE,
	"tpc_nome" VARCHAR(255) NOT NULL,
	PRIMARY KEY("tpc_id")
);



ALTER TABLE "contas_bancarias"
ADD FOREIGN KEY("con_tpc_id") REFERENCES "tipos_conta"("tpc_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mensagens_servico"
ADD FOREIGN KEY("mss_ser_id") REFERENCES "servicos"("ser_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "freelancers"
ADD FOREIGN KEY("fre_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "clientes"
ADD FOREIGN KEY("cli_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "propostas"
ADD FOREIGN KEY("pro_ser_id") REFERENCES "servicos"("ser_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "propostas"
ADD FOREIGN KEY("pro_fre_id") REFERENCES "freelancers"("fre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "servicos"
ADD FOREIGN KEY("ser_cli_id") REFERENCES "clientes"("cli_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "servicos"
ADD FOREIGN KEY("ser_proposta_aceita_id") REFERENCES "propostas"("pro_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "projetos_freelancer"
ADD FOREIGN KEY("pjf_fre_id") REFERENCES "freelancers"("fre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "projetos_destacados_proposta"
ADD FOREIGN KEY("pde_prj_id") REFERENCES "projetos_freelancer"("pjf_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "projetos_destacados_proposta"
ADD FOREIGN KEY("pde_pro_id") REFERENCES "propostas"("pro_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "cartoes_credito"
ADD FOREIGN KEY("cre_usu_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "pagamentos"
ADD FOREIGN KEY("pag_cre_id") REFERENCES "cartoes_credito"("cre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "pagamentos"
ADD FOREIGN KEY("pag_ser_id") REFERENCES "servicos"("ser_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "avaliacoes"
ADD FOREIGN KEY("ava_usu_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "cartoes_credito"
ADD FOREIGN KEY("cre_bcc_id") REFERENCES "bandeiras_cartao_credito"("bcc_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mensagens_servico"
ADD FOREIGN KEY("mss_remetente_usu_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mensagens_servico"
ADD FOREIGN KEY("mss_destinatario_usu_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "contas_bancarias"
ADD FOREIGN KEY("con_fre_id") REFERENCES "freelancers"("fre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;