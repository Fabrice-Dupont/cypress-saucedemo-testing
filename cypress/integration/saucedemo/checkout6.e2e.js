/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State machine info:
  // Testing states 10, 11: CartIcon from CheckoutStep2, Cancel from CheckoutStep2
  // X 1 A 2 2 2 4 B 6 C 17 9 D 10 B 6 C 17 9 D 11
  // ...A 4 B 6 C 17 9 D 12 E
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });
  it("TestCase_6: Testing CartIcon from CheckoutStep2, Cancel from CheckoutStep2", () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-bolt-t-shirt");
    cy.checkNumCartItems(1);
    cy.addItemToCart("#add-to-cart-sauce-labs-fleece-jacket");
    cy.checkNumCartItems(2);
    cy.addItemToCart("#add-to-cart-sauce-labs-onesie");
    cy.checkNumCartItems(3);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(3);
    cy.clickOnCheckoutFromCartPage();

    cy.ensureOnCheckoutStep1Page();
    cy.fillInCustomerInfo("Jane", "Doe", "90210");
    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(3);

    // State 10: Go back to Cart from CheckoutStep2
    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(3);
    // Continue checkout
    cy.clickOnCheckoutFromCartPage();
    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(3);
    cy.fillInCustomerInfo("Jane", "Doe", "90210");
    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(3);
    // State 11: Cancel2
    cy.clickOnCancel2FromCheckoutStep2Page();

    // Now we're back on Inventory page
    // Do a single file walk through to checkout
    cy.ensureOnInventoryPage();
    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.clickOnCheckoutFromCartPage();
    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(3);
    cy.fillInCustomerInfo("Hello", "World", "90000");
    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(3);
    cy.clickOnFinishFromCheckoutStep2Page();

    cy.ensureOnCheckoutCompletePage();
    cy.checkNumCartItems(0);
  });
});
