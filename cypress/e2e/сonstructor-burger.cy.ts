import {} from "cypress";
import {} from "../support/cypress";
import {
  SELECTORS_BUN_DOWN_NAME,
  SELECTORS_BUN_UP_NAME,
  SELECTORS_DROP_CONTAINER_INGREDIENT,
  SELECTORS_INGREDIENT_1,
} from "../support/selectors";

describe("Constructor Burger", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("/");
  });

  it("should include two buns on top and bottom", () => {
    cy.dropElement(SELECTORS_INGREDIENT_1, SELECTORS_DROP_CONTAINER_INGREDIENT);
    cy.get(SELECTORS_BUN_UP_NAME).should("have.text", "Булка 1 (верх)");
    cy.get(SELECTORS_BUN_DOWN_NAME).should("have.text", "Булка 1 (вниз)");
  });

  it("should drag the bun and replace if it was already in the designer", () => {
    cy.dropElement(SELECTORS_INGREDIENT_1, SELECTORS_DROP_CONTAINER_INGREDIENT);
    cy.get(SELECTORS_BUN_UP_NAME).should("have.text", "Булка 1 (верх)");

    cy.dropElement(
      "[data-testid=ingredient-2]",
      SELECTORS_DROP_CONTAINER_INGREDIENT
    );
    cy.get(SELECTORS_BUN_UP_NAME).should("have.text", "Булка 2 (верх)");
  });

  it("should include duplicate ingredients", () => {
    cy.dropElement(
      "[data-testid=ingredient-4]",
      SELECTORS_DROP_CONTAINER_INGREDIENT
    );
    cy.get("[data-testid=constructor-element-4]").should("have.length", 1);

    cy.dropElement(
      "[data-testid=ingredient-4]",
      SELECTORS_DROP_CONTAINER_INGREDIENT
    );
    cy.get("[data-testid=constructor-element-4]").should("have.length", 2);
  });
});
