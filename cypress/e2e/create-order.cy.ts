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
    cy.auth("http://localhost:5173");
    cy.createOrder();
    cy.wait("@createOrder")
      .its("response.body")
      .then((body) => {
        expect(body.order).to.have.property("number", 666);
      });
  });

  it("should create order without auth and redirect on login page", () => {
    cy.visit("http://localhost:5173");
    cy.createOrder();
    cy.location("pathname").should("eq", "/login");
    cy.auth("http://localhost:5173");
    cy.createOrder();
    cy.wait("@createOrder")
      .its("response.body")
      .then((body) => {
        expect(body.order).to.have.property("number", 666);
      });
  });
});
