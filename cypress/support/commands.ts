/// <reference types="cypress" />

import { SELECTORS_DROP_CONTAINER_INGREDIENT, SELECTORS_INGREDIENT_1 } from "./selectors";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  "dropElement",
  (queryElement: string, queryContainer: string) => {
    cy.get(queryElement).trigger("dragstart");
    cy.get(queryContainer).trigger("drop");
  }
);

Cypress.Commands.add("auth", (visitNext?: string) => {
  const email = "test@mail.ru";

  cy.visit("/login");
  cy.get("[data-testid=input-auth-email]").type(`${email}{enter}`);

  if (visitNext) {
    cy.visit(visitNext);
  }
});

Cypress.Commands.add("createOrder", () => {
  cy.dropElement(SELECTORS_INGREDIENT_1, SELECTORS_DROP_CONTAINER_INGREDIENT);
  cy.dropElement("[data-testid=ingredient-4]", SELECTORS_DROP_CONTAINER_INGREDIENT);

  cy.get("[data-testid=create-order-btn]").click();
});
