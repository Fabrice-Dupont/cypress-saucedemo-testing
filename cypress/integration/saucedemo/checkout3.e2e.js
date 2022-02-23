/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State machine info:
  // Testing states 5, 7:
  // X 1 A 2 2 2 4 B 5 A 3 4 B 6 C 7 B 6 C 17 9 D 12
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`TestCase_3: Test Continue Shopping from Cart and Cancel from CheckoutStep1`, async () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.addItemToCart("#add-to-cart-sauce-labs-bike-light");
    cy.addItemToCart("#add-to-cart-sauce-labs-bolt-t-shirt");
    cy.checkNumCartItems(3);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(3);
    cy.clickOnContinueShoppingFromCartPage();

    cy.ensureOnInventoryPage();

    cy.removeItemFromCart("#remove-sauce-labs-bolt-t-shirt");
    cy.checkNumCartItems(2);
    cy.clickOnCartIcon();

    cy.ensureOnCartPage();
    cy.checkNumCartItems(2);
    cy.clickOnCheckoutFromCartPage();

    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(2);
    cy.clickOnCancel1FromCheckoutStep1();

    cy.ensureOnCartPage();
    cy.checkNumCartItems(2);
    cy.clickOnCheckoutFromCartPage();

    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(2);
    cy.fillInCustomerInfo("Jane", "Doe", "90210");
    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(2);
    cy.clickOnFinishFromCheckoutStep2Page();

    cy.ensureOnCheckoutCompletePage();
    cy.checkNumCartItems(0);
  });
});
