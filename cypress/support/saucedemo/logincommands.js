Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");

  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add("logout", () => {
  cy.get("#react-burger-menu-btn").click();
  cy.get("#logout_sidebar_link").click({ timeout: 8000 });

  cy.url().should("eq", Cypress.config().baseUrl + "/");
});

// This is failing as the application is not logging out the user after 10 mins; Webdriver.io works, Cypress is failing
// Needs to be investigated
Cypress.Commands.add("checkIfOnErroredLogoutPage", (error_url) => {
  cy.url().should("eq", Cypress.config().baseUrl + "/");

  cy.get('[data-test="error"]').should(($elErr) => {
    let text = $elErr.text().toLowerCase();
    let expectedText =
      `Epic sadface: You can only access '${error_url}' when you are logged in.`.toLowerCase();

    expect(text).to.equal(expectedText);
  });
});

Cypress.Commands.add("resetAppState", () => {
  // Open burger menu
  cy.get("#react-burger-menu-btn").click();
  // Click on Reset App State
  cy.get("#reset_sidebar_link").click({ timeout: 8000 });
  // Close Menu
  cy.get("#react-burger-cross-btn").click();
});
