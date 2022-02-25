/// <reference types="cypress" />

describe("UserStory: Logout", () => {
  // This is TestCase_2 modified with logout-login from CheckoutComplete page
  // Log back in and make sure there are 0 items in cart
  // State machine info:
  // X 1 A 2 4 B 6 C 17 9 D 12 E 14(Logout) Y 1(Login) A
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it("TestCase_15: (TestCase_2 modified) Login/Logout from CheckoutCompletePage during checkout", async () => {
    cy.login(loginData.userName, loginData.password);
    cy.ensureOnInventoryPage();
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
    cy.clickOnFinishFromCheckoutStep2Page();

    cy.ensureOnCheckoutCompletePage();
    cy.checkNumCartItems(0);

    cy.logout(); // ensures on logout page

    // I should be on a login page, but .login does another cy.visit
    cy.login(loginData.userName, loginData.password);

    cy.ensureOnInventoryPage();
    cy.checkNumCartItems(0);
  });
});
