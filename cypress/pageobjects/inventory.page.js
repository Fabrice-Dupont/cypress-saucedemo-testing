/// <reference types="cypress" />

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get secondaryTitle() {
        return cy.get('.title')
    }

    async ensureOnPage(){
        let expectedUrl = "https://www.saucedemo.com/inventory.html";

        cy.url().then((actualUrl)=>{
            if (actualUrl !== expectedUrl)
                throw Error(`InventoryPage.ensureOnPage: Expecting to be on ${expectedUrl}, actually on ${actualUrl}`)
        })
        
        let expectedTitle = 'PRODUCTS';
        this.secondaryTitle.then((actualTitle)=>{
            const text = actualTitle.text();
            console.log(text)
            if (text.toLowerCase() !== expectedTitle.toLowerCase())
                throw Error(`InventoryPage.ensureOnPage: title ${text} does not match expected title ${expectedTitle}`)

        })  
    }
}

module.exports = new InventoryPage();
