/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State Machine:
  // X 1 A 2 4 B 6 C <incomplete cust info> <should see error>
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`TestCase_4: Should error out when customer information is missing`, () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.checkNumCartItems(1);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(1);

    cy.clickOnCheckoutFromCartPage();

    cy.ensureOnCheckoutStep1Page();
    cy.checkNumCartItems(1);

    cy.fillInCustomerInfo("", "Doe", "90210");

    cy.clickOnContinueFromCheckoutStep1();
    cy.validateCustomerSeesErrorOnCheckoutStep1();
  });
});
