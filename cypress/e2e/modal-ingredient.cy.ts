import {} from "cypress";

describe("Modal Ingredint", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("/");
  });

  it("should modal ingredient should open when click on ingredient", () => {
    cy.get("[data-testid=ingredient-1]").click();
    cy.get("[data-testid=name-ingredient]").should("have.text", "Булка 1");
    cy.get("[data-testid=info-ingredient-calories]").should("have.text", "420");
    cy.get("[data-testid=info-ingredient-proteins]").should("have.text", "80");
    cy.get("[data-testid=info-ingredient-fat]").should("have.text", "24");
    cy.get("[data-testid=info-ingredient-carbohydrates]").should("have.text", "53");
  });

  it("should open the ingredient modal and close it by overlay", () => {
    cy.get("[data-testid=ingredient-1]").click();
    cy.get("[data-testid=modal-overlay]").click({ force: true });
    cy.location("pathname").should("eq", "/");
  });

  it("should open the ingredient modal and close it by icon", () => {
    cy.get("[data-testid=ingredient-1]").click();
    cy.get("[data-testid=modal-icon-close]").click({ force: true });
    cy.location("pathname").should("eq", "/");
  });
});
