/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State machine info:
  // Testing states 8, 13: CheckoutStep1->CartIcon->CartPage, CheckoutComplete->BackHome->InventoryPage
  // X 1 A 2 2 2 2 2 4 B 6 C [don't fill customer info] 8 B 3 B 6 C 17 9 D 12 E 13 A
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`TestCase_5: Go back to Cart from CheckoutStep1, Go back Home from CheckoutCompletePage`, () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.addItemToCart("#add-to-cart-sauce-labs-bike-light");
    cy.addItemToCart("#add-to-cart-sauce-labs-bolt-t-shirt");
    cy.addItemToCart("#add-to-cart-sauce-labs-fleece-jacket");
    cy.addItemToCart("#add-to-cart-sauce-labs-onesie");
    cy.checkNumCartItems(5);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(5);
    cy.clickOnCheckoutFromCartPage();
    cy.ensureOnCheckoutStep1Page();
    // Don't fill in customer info on CheckoutStep1Page

    // State 8
    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(5);
    cy.removeItemFromCart("#remove-sauce-labs-onesie");
    cy.checkNumCartItems(4);

    cy.clickOnCheckoutFromCartPage();
    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(4);
    cy.fillInCustomerInfo("Jane", "Doe", "90210");

    cy.clickOnContinueFromCheckoutStep1();

    cy.ensureOnCheckoutStep2Page();
    cy.checkNumCartItems(4);
    cy.clickOnFinishFromCheckoutStep2Page();

    cy.ensureOnCheckoutCompletePage();
    cy.checkNumCartItems(0);
    // State 13
    cy.clickOnBackHomeFromCheckoutCompletePage();

    cy.ensureOnInventoryPage();
    cy.checkNumCartItems(0);
  });
});
