const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return cy.get('#user-name');
    }

    get inputPassword() {
        return cy.get('#password');
    }

    get menuButton(){
        return cy.get('#react-burger-menu-btn');
    }

    get logoutLink(){
        return cy.get('#logout_sidebar_link');
    }

    get btnSubmit() {
        return cy.get('#login-button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) {
        this.inputUsername.type(username);
        this.inputPassword.type(password);
        this.btnSubmit.click();
        // console.log(`LoginPage.login, clicked on LOGIN as user ${username}`);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('');
    }

    logout(){
        this.menuButton.click();
        this.logoutLink.click({timeout: 6000});
        this.ensureOnLogoutPage();
    }

    ensureOnLogoutPage(){
        let expectedUrl = "https://www.saucedemo.com/";

            cy.url().then((actualUrl)=>{
                if (actualUrl !== expectedUrl)
                    throw Error(`LoginPage.ensureOnLogoutPage: Expecting to be on ${expectedUrl}, actually on ${actualUrl}`)
            })
    }
}

module.exports = new LoginPage();
