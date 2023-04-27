/// <reference types="cypress" />

describe("UserStory: Reset Cart State", () => {
  // State machine info:
  // X 1 A 2 2 4 B 15 B

  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it("Reset_2: Reset App State from Cart Page", () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.addItemToCart("#add-to-cart-sauce-labs-bike-light");
    cy.checkNumCartItems(2);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();

    cy.resetAppState();

    cy.checkNumCartItems(0);
    // Ensure on same page
    cy.ensureOnCartPage();
  });
});
