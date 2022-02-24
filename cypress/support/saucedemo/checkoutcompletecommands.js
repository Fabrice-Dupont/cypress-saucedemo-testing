Cypress.Commands.add("ensureOnCheckoutCompletePage", () => {
  cy.url().should("eq", Cypress.config().baseUrl + "/checkout-complete.html");

  // case insensitive match
  cy.get(".title").should(($el) => {
    let text = $el.text().toLowerCase();
    expect(text).to.match(/CHECKOUT: COMPLETE!/i);
  });
  cy.get("h2").should(($h2) => {
    let text = $h2.text().toLowerCase();
    expect(text).to.match(/THANK YOU FOR YOUR ORDER/i);
  });
});

Cypress.Commands.add("clickOnBackHomeFromCheckoutCompletePage", () => {
  cy.get('[data-test="back-to-products"').click();
});
