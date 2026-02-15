/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    cadastrarUsuario(usuario: any): Chainable<void>;
  }
}
