import {} from 'cypress'

describe('Modal Ingredint', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", "ingredients", { fixture: "ingredients" });
        cy.visit("http://localhost:5173")
    })

    it('should open modal on click', ()=>{
        cy.get('[data-testid=ingredient-1]').click()
        cy.get('#modals')
    })

    it('should open the ingredient modal and close it by overlay', ()=>{
        cy.get('[data-testid=ingredient-1]').click()
        cy.get('[data-testid=modal-overlay]').click({ force: true })
        cy.location("pathname").should('eq', '/')
    })

    it('should open the ingredient modal and close it by icon', ()=>{
        cy.get('[data-testid=ingredient-1]').click()
        cy.get('[data-testid=modal-icon-close]').click({ force: true })
        cy.location("pathname").should('eq', '/')
    })
})