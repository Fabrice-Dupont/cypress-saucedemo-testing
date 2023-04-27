/// <reference types="cypress" />

// NOT WORKING! App doesn't log the user out
describe("UserStory: Login", function () {
  // Increase total timeout for this test from the default
  // The above describe should have a function as second arg, not a fat arrow
  // https://stackoverflow.com/questions/23492043/change-default-timeout-for-mocha/45220192#45220192
  this.timeout(700000);

  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`LoginTimeout_1: Logged in user should be kicked out after 10 minutes`, async () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();
    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");

    cy.wait(10 * 60 * 1000 + 5000);
    cy.checkIfOnErroredLogoutPage("/inventory.html");
  });
});
