CREATE TABLE IF NOT EXISTS "usuarios" (
	"usu_id" INTEGER NOT NULL UNIQUE,
	"usu_nome" VARCHAR(255) NOT NULL,
	"usu_cpf" CHAR(11) NOT NULL,
	"usu_email" VARCHAR(255) NOT NULL,
	"usu_foto_perfil" MACADDR8,
	"usu_senha" MACADDR8 NOT NULL,
	PRIMARY KEY("usu_id")
);




CREATE TABLE IF NOT EXISTS "freelancers" (
	"fre_id" INTEGER NOT NULL UNIQUE,
	"fre_descricao" TEXT,
	"fre_titulo" VARCHAR(255),
	"fre_ranking" INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("fre_id")
);




CREATE TABLE IF NOT EXISTS "clientes" (
	"cli_id" INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("cli_id")
);




CREATE TABLE IF NOT EXISTS "propostas" (
	"pro_id" INTEGER NOT NULL,
	"pro_fre_id" INTEGER NOT NULL,
	"pro_ser_id" INTEGER NOT NULL,
	"pro_valor_por_hora" NUMERIC(5) NOT NULL,
	"pro_mensagem" TEXT NOT NULL,
	"pro_itens_propostos" TEXT NOT NULL,
	"pro_valor_total" INTEGER NOT NULL,
	"pro_taxa_sistema_adicionada_ao_total" BOOLEAN NOT NULL,
	"pro_contraproposta" TEXT,
	PRIMARY KEY("pro_id")
);




CREATE TABLE IF NOT EXISTS "servicos" (
	"ser_id" INTEGER NOT NULL UNIQUE,
	"ser_cli_id" INTEGER NOT NULL,
	"ser_descricao" TEXT NOT NULL,
	"ser_orcamento" MACADDR8,
	"ser_prazo" TIMESTAMPTZ NOT NULL,
	"ser_valor_minimo" NUMERIC(6,2) NOT NULL,
	PRIMARY KEY("ser_id")
);




CREATE TABLE IF NOT EXISTS "projetos_freelancer" (
	"prj_id" INTEGER NOT NULL UNIQUE,
	"prj_fre_id" INTEGER NOT NULL,
	"prj_nome" VARCHAR(255) NOT NULL,
	"prj_descricao" TEXT,
	"prj_imagem" MACADDR8,
	"prj_link" VARCHAR(255),
	PRIMARY KEY("prj_id")
);




CREATE TABLE IF NOT EXISTS "cartoes_credito" (
	"cre_id" INTEGER NOT NULL UNIQUE,
	"cre_nome_impresso" VARCHAR(255) NOT NULL,
	"cre_bandeira" MACADDR8 NOT NULL,
	"cre_codigo_seguranca" CHAR(3) NOT NULL,
	"cre_usu_id" INTEGER NOT NULL,
	PRIMARY KEY("cre_id")
);




CREATE TABLE IF NOT EXISTS "avaliacoes_cliente" (
	"avc_id" INTEGER NOT NULL UNIQUE,
	"avc_cli_id" INTEGER NOT NULL,
	"avc_nota_estrelas" INTEGER NOT NULL,
	"avc_comentario" TEXT,
	"avc_comunicacao" INTEGER NOT NULL,
	"avc_necessidade_retrabalho" INTEGER NOT NULL,
	"avc_profissionalismo" INTEGER NOT NULL,
	PRIMARY KEY("avc_id")
);




CREATE TABLE IF NOT EXISTS "avaliacoes_freelancer" (
	"avf_id" INTEGER NOT NULL UNIQUE,
	"avf_fre_id" INTEGER NOT NULL,
	"avf_nota_estrelas" INTEGER NOT NULL,
	"avf_comentario" TEXT,
	"avf_qualidade_trabalho" INTEGER NOT NULL,
	"avf_agilidade" INTEGER NOT NULL,
	"avf_desenvoltura" INTEGER NOT NULL,
	PRIMARY KEY("avf_id")
);




CREATE TABLE IF NOT EXISTS "projetos_destacados_proposta" (
	"pdp_prj_id" INTEGER NOT NULL,
	"pdp_pro_id" INTEGER NOT NULL,
	PRIMARY KEY("pdp_prj_id", "pdp_pro_id")
);




CREATE TABLE IF NOT EXISTS "pagamento" (
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
	PRIMARY KEY("mss_id")
);




CREATE TABLE IF NOT EXISTS "denuncias" (
	"den_id" INTEGER NOT NULL UNIQUE,
	"den_usu_id" INTEGER NOT NULL,
	"den_motivo" TEXT NOT NULL,
	"den_comentario" TEXT NOT NULL,
	PRIMARY KEY("den_id")
);



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
ALTER TABLE "projetos_freelancer"
ADD FOREIGN KEY("prj_fre_id") REFERENCES "freelancers"("fre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "projetos_destacados_proposta"
ADD FOREIGN KEY("pdp_prj_id") REFERENCES "projetos_freelancer"("prj_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "projetos_destacados_proposta"
ADD FOREIGN KEY("pdp_pro_id") REFERENCES "propostas"("pro_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "cartoes_credito"
ADD FOREIGN KEY("cre_usu_id") REFERENCES "usuarios"("usu_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "pagamento"
ADD FOREIGN KEY("pag_cre_id") REFERENCES "cartoes_credito"("cre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "pagamento"
ADD FOREIGN KEY("pag_ser_id") REFERENCES "servicos"("ser_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "mensagens_servico"
ADD FOREIGN KEY("mss_ser_id") REFERENCES "servicos"("ser_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "avaliacoes_cliente"
ADD FOREIGN KEY("avc_cli_id") REFERENCES "clientes"("cli_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "avaliacoes_freelancer"
ADD FOREIGN KEY("avf_fre_id") REFERENCES "freelancers"("fre_id")
ON UPDATE NO ACTION ON DELETE NO ACTION;