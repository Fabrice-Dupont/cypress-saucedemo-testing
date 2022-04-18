/// <reference types="cypress" />

describe("UserStory: Login", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  // State machine:
  // X 1 A 14 1 A
  it("Login_3:should be able to login, logout, login", () => {
    cy.login(loginData.userName, loginData.password);
    cy.ensureOnInventoryPage();

    cy.logout();
    // I should be on login page
    cy.login(loginData.userName, loginData.password);
    cy.ensureOnInventoryPage();
  });
});
