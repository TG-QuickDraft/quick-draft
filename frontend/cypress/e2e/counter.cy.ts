describe("Counter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    Cypress.on("uncaught:exception", () => false);
  });

  it("Should increment counter when clicking", () => {
    cy.get("#oh").should("have.text", "count is 0");
    cy.get("#oh").click();
    cy.get("#oh").should("have.text", "count is 1");
  });
});
