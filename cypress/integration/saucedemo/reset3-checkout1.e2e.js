/// <reference types="cypress" />

describe("UserStory: Reset Cart State", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  // State machine info:
  // X 1 A 2 4 B 6 C 17 15 C 8 B
  it("Reset_3: Reset App State from CheckoutStep1", () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.checkNumCartItems(1);
    cy.clickOnCartIcon();
    cy.ensureOnCartPage();

    cy.checkNumCartItems(1);
    cy.clickOnCheckoutFromCartPage();

    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(1);
    cy.fillInCustomerInfo("Jane", "Doe", "90210");

    cy.resetAppState();

    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(0);

    // extra step, go back to Cart Page and check items there too
    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(0);
  });
});
