/// <reference types="cypress" />

describe("UserStory: Login", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`Login_1: Should be able to login with valid credentials`, function () {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();
  });

  it(`Login_2: Logout after login`, () => {
    cy.logout();
  });
});
