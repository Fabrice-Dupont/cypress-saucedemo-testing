/// <reference types="cypress" />

describe("UserStory: Logout", () => {
  // This is TestCase_2 modified with an intermediate logout-login from cart page
  // State machine info:
  // X 1 A 2 4 B 14(Logout) Y 1(Login) A 4 B 6 C 17 9 D 12 E
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it("TestCase_9: (TestCase_2 modified) Logout/Login from Cart Page during checkout", async () => {
    cy.login(loginData.userName, loginData.password);
    cy.ensureOnInventoryPage();

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.checkNumCartItems(1);

    cy.clickOnCartIcon();
    cy.ensureOnCartPage();
    cy.checkNumCartItems(1);

    cy.logout(); // ensures on logout page

    // I should be on a login page, but .login does another cy.visit
    cy.login(loginData.userName, loginData.password);

    cy.ensureOnInventoryPage();
    cy.checkNumCartItems(1);
    cy.clickOnCartIcon();
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
  });
});
