Cypress.Commands.add("ensureOnCheckoutStep2Page", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/checkout-step-two.html");

  // case insensitive match
  cy.get(".title").should(($el) => {
    let text = $el.text().toLowerCase();
    expect(text).to.match(/CHECKOUT: OVERVIEW/i);
  });
});

Cypress.Commands.add("clickOnFinishFromCheckoutStep2Page", () => {
  cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add("clickOnCancel2FromCheckoutStep2Page", () => {
  cy.get('[data-test="cancel"]').click();
});
