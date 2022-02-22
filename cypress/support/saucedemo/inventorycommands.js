Cypress.Commands.add("ensureOnInventoryPage", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/inventory.html");

  let expectedTitle = "Products";
  // TODO: Make this case insensitive
  cy.get(".title").should("have.text", expectedTitle);
});
