Cypress.Commands.add("ensureOnInventoryPage", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/inventory.html");

  // case insensitive match
  cy.get(".title").should(($el) => {
    let text = $el.text().toLowerCase();
    expect(text).to.match(/Products/i);
  });
});
