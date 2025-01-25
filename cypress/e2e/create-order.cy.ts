import {} from 'cypress'
import {} from "../support/cypress";

describe("Create Order", () => {
  beforeEach(() => {
    cy.intercept("POST", "login", { fixture: "login" });
    cy.intercept("GET", "user", { fixture: "user" });
    cy.intercept("POST", "orders", { fixture: "orders" }).as("createOrder");
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
  });
  it("should create order and get order number", () => {
    cy.auth("/");
    cy.createOrder();
    cy.wait("@createOrder")
      .its("response.body")
      .then((body) => {
        expect(body.order).to.have.property("number", 666);
      });
  });

  it("should create order without auth and redirect on login page", () => {
    cy.visit("/");
    cy.createOrder();
    cy.location("pathname").should("eq", "/login");
    cy.auth("/");
    cy.createOrder();
    cy.wait("@createOrder")
      .its("response.body")
      .then((body) => {
        expect(body.order).to.have.property("number", 666);
      });
  });

  it('should create order and open modal order', ()=>{
    cy.auth("/");
    cy.createOrder();
    cy.get('[data-testid=order-number]').should('have.text', '000666')
  })
});
