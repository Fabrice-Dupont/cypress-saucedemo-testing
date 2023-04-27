/// <reference types="cypress" />

describe("UserStory: Reset Cart State", () => {
  // State machine info:
  // X 1 A 2 2 15 A

  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it("Reset_1: Reset App State from InventoryPage", () => {
    cy.login(loginData.userName, loginData.password);
    cy.ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.addItemToCart("#add-to-cart-sauce-labs-bike-light");
    cy.checkNumCartItems(2);
    cy.resetAppState();

    cy.checkNumCartItems(0);
    // Ensure on same page
    cy.ensureOnInventoryPage();
  });
});
