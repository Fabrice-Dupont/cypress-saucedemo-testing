/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State machine info:
  // Testing state 18: CartIcon from Checkout Complete Page
  // X 1 A 2 4 B 6 C 17 9 D 12 E 18 B
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it("TestCase_17: (TestCase_2 modified) CartIcon from CheckoutCompletePage", async () => {
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
    cy.clickOnFinishFromCheckoutStep2Page();

    cy.ensureOnCheckoutCompletePage();
    cy.checkNumCartItems(0);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(0);
  });
});
