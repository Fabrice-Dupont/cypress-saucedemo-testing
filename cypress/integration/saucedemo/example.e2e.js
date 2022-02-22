/// <reference types="cypress" />

describe('UserStory: Login', () => {
    before(function () {
        cy.fixture('logindata.json').then(function (data){
            this.loginData = data;
        })
    })
    it(`Login_1: Should be able to login with valid credentials`, function(){
        cy.login(this.loginData.userName, this.loginData.password);
        cy.ensureOnInventoryPage();
    })    
    it(`Login_2: Logout after login`, ()=>{
        cy.logout();
    })
});

