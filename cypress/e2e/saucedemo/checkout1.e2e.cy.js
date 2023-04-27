/// <reference types="cypress" />

describe("UserStory: Checkout", () => {
  // State machine info:
  // X 1 A 2 3
  let loginData;

  before(async () => {
    loginData = await cy.fixture("logindata.json");
  });

  it(`TestCase_1: Add one item to cart, remove it, add it again`, () => {
    cy.login(loginData.userName, loginData.password).ensureOnInventoryPage();
    cy.checkNumCartItems(0);
    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");

    cy.checkNumCartItems(1);

    cy.removeItemFromCart("#remove-sauce-labs-backpack");
    cy.checkNumCartItems(0);

    cy.addItemToCart("#add-to-cart-sauce-labs-backpack");
    cy.checkNumCartItems(1);
  });
});
