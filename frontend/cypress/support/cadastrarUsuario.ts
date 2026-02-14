Cypress.Commands.add('cadastrarUsuario', (usuario) => { 
    cy.visit('http://localhost:5173/cadastrarUsuario');

    cy.get('input[name="nome"]').type(usuario.nome);
    cy.get('input[name="cpf"]').type(usuario.cpf);
    cy.get('input[name="email"]').type(usuario.email);
    cy.get('input[name="senha"]').type(usuario.senha);
    cy.get('input[name="confirmarSenha"]').type(usuario.confirmarSenha);
    cy.get(`input[type="radio"][value="${usuario.tipoUsuario}"]`).check();
    cy.get('input[name="foto"]').attachFile(usuario.fotoPerfilUrl);

    cy.intercept('POST', '**/usuario').as('criarUsuario');
    cy.intercept('POST', '**/login').as('login');
    cy.intercept('POST', '**/upload*').as('upload');

    cy.contains('Salvar').click();

    cy.wait('@criarUsuario');
    cy.wait('@login');
    cy.wait('@upload');
})