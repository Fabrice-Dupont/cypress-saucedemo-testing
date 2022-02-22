Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
})

Cypress.Commands.add('logout', ()=> {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click({timeout: 8000});
    
    cy.url().should('eq', Cypress.config().baseUrl + '/');
})
