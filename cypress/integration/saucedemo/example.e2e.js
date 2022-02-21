const LoginPage = require('../../pageobjects/login.page');
const InventoryPage = require('../../pageobjects/inventory.page');

describe('UserStory: Login', () => {
    before(function () {
        cy.fixture('logindata.json').then(function (data){
            this.loginData = data;
        })
    })
    it(`Login_1: Should be able to login with valid credentials`, function(){
        LoginPage.open();
        LoginPage.login(this.loginData.userName, this.loginData.password);
        InventoryPage.ensureOnPage();
    })    
});

describe(`UserStory: Login`, ()=>{
    before(function () {
        cy.fixture('logindata.json').then(function (data){
            this.loginData = data;
        })
    })
    it(`Login_2: Should be able to login, then logout`, function(){
    
        LoginPage.open();
        LoginPage.login(this.loginData.userName, this.loginData.password);
        
        InventoryPage.ensureOnPage();
        
        LoginPage.logout();
    })
})

