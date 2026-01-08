describe('Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    Cypress.on("uncaught:exception", () => false);
  });

  it('deve cadastrar um novo usuário', () => {
    cy.visit('http://localhost:5173/cadastrarUsuario');

    const usuario = {
      nome: 'João Silva',
      cpf: '12345678900',
      email: 'joao.silva@example.com',
      senha: '12345678',
      confirmarSenha: '12345678',
      tipoUsuario: 'Cliente'
    };

    cy.get('input[name="nome"]').type(usuario.nome);
    cy.get('input[name="cpf"]').type(usuario.cpf);
    cy.get('input[name="email"]').type(usuario.email);
    cy.get('input[name="senha"]').type(usuario.senha);
    cy.get('input[name="confirmarSenha"]').type(usuario.confirmarSenha);
    cy.get(`input[type="radio"][value="${usuario.tipoUsuario}"]`).check();
    cy.get('input[name="foto"]').attachFile('fotoPerfil.png');

    cy.get('button').contains('Salvar').click();
  })

  it('deve cadastrar um novo freelancer', () => {
    cy.visit('http://localhost:5173/cadastrarUsuario');

    const usuario = {
      nome: 'Maria Souza',
      cpf: '00987654321',
      email: 'maria.souza@example.com',
      senha: '12345678',
      confirmarSenha: '12345678',
      tipoUsuario: 'Freelancer'
    };

    cy.get('input[name="nome"]').type(usuario.nome);
    cy.get('input[name="cpf"]').type(usuario.cpf);
    cy.get('input[name="email"]').type(usuario.email);
    cy.get('input[name="senha"]').type(usuario.senha);
    cy.get('input[name="confirmarSenha"]').type(usuario.confirmarSenha);
    cy.get(`input[type="radio"][value="${usuario.tipoUsuario}"]`).check();
    cy.get('input[name="foto"]').attachFile('fotoPerfil.png');

    cy.get('button').contains('Salvar').click();
  })
})