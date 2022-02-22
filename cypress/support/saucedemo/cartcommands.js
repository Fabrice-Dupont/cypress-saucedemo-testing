Cypress.Commands.add("addItemToCart", (id_name) => {
  // TODO: Use data-test id's; More robust
  // Add a product to cart by clicking ADD TO CART button next to the item
  cy.get(`${id_name}`).click();

  // TODO: Get name of this item and store it for later
  // const elItem1Name = await elItem1.previousElement();
  // await elItem1Name.toHaveElementClassContaining('inventory_item_label');
});

Cypress.Commands.add("removeItemFromCart", (id_name) => {
  cy.get(`${id_name}`).click();
});

// This is the html if cart has items
// <a class="shopping_cart_link">
//   <span class="shopping_cart_badge">1</span>
// </a>
// This is the html if cart has no items, <span> is missing
// <a class="shopping_cart_link">
// </a>
Cypress.Commands.add("checkNumCartItems", (num) => {
  if (num === 0) {
    cy.get(".shopping_cart_badge").should("not.exist");
    return;
  }

  cy.get(".shopping_cart_badge")
    .invoke("text")
    .then(parseFloat)
    .should("equal", num);
});
