/// <reference types="cypress" />

describe("UserStory: Login", () => {
  // State Machine:
  // A Z
  it("LoginError_2: accessing a valid page without being logged in should show correct Error message", async () => {
    const subPath = "inventory.html";
    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false, // gives a 404, we want to continue checking the error message
    });
    cy.checkIfOnErroredLogoutPage(`/${subPath}`);
  });
});
