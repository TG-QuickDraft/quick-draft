describe('Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    Cypress.on("uncaught:exception", () => false);
  });

  it('deve cadastrar um novo cliente', () => {
    const usuario = {
      nome: 'João Silva',
      cpf: '12345678900',
      email: 'joao.silva@example.com',
      senha: '12345678',
      confirmarSenha: '12345678',
      tipoUsuario: 'Cliente',
      fotoPerfilUrl: "fotoPerfil.png"
    };

    cy.cadastrarUsuario(usuario);
  })

  it('deve cadastrar um novo freelancer', () => {
    const usuario = {
      nome: 'Maria Souza',
      cpf: '00987654321',
      email: 'maria.souza@example.com',
      senha: '12345678',
      confirmarSenha: '12345678',
      tipoUsuario: 'Freelancer',
      fotoPerfilUrl: "fotoPerfil.png"
    };

    cy.cadastrarUsuario(usuario);
  })
})