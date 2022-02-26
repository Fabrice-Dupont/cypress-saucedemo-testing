/// <reference types="cypress" />

describe("UserStory: Reset Cart State", () => {
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  // State machine info:
  // X 1 A 2 4 B 6 C 17 9 D 15 10 B
  it("Reset_4: Reset App State from CheckoutStep2Page", async () => {
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
    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(1);
    cy.resetAppState();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(0);
    cy.ensureOnCheckoutStep2Page();

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(0);
  });
});
