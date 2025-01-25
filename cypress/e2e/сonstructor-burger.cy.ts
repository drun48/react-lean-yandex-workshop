import {} from 'cypress'
import {} from '../support/cypress'

describe("Constructor Burger", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("/");
  });

  it("should include two buns on top and bottom", () => {
    cy.dropElement(
      "[data-testid=ingredient-1]",
      "[data-testid=container-drop]"
    );
    cy.get(
      "[data-testid=constructor-element-bun-up] .constructor-element__text"
    ).should("have.text", "Булка 1 (верх)");
    cy.get(
        "[data-testid=constructor-element-bun-down] .constructor-element__text"
      ).should("have.text", "Булка 1 (вниз)");
  });

  it("should drag the bun and replace if it was already in the designer", () => {
    cy.dropElement(
      "[data-testid=ingredient-1]",
      "[data-testid=container-drop]"
    );
    cy.get(
      "[data-testid=constructor-element-bun-up] .constructor-element__text"
    ).should("have.text", "Булка 1 (верх)");

    cy.dropElement(
      "[data-testid=ingredient-2]",
      "[data-testid=container-drop]"
    );
    cy.get(
      "[data-testid=constructor-element-bun-up] .constructor-element__text"
    ).should("have.text", "Булка 2 (верх)");
  });

  it("should include duplicate ingredients", () => {
    cy.dropElement(
      "[data-testid=ingredient-4]",
      "[data-testid=container-drop]"
    );
    cy.get("[data-testid=constructor-element-4]").should("have.length", 1);

    cy.dropElement(
      "[data-testid=ingredient-4]",
      "[data-testid=container-drop]"
    );
    cy.get("[data-testid=constructor-element-4]").should("have.length", 2);
  });
});
