// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) => {
//   originalFn(url, {
//     onBeforeLoad(win) {
//       cy.stub(win.alert);
//     },
//     ...options,
//   });
// });
// Game.vue
Cypress.Commands.add("registerElements", () => {
  cy.get("[data-cy='width']").as("input-width")
  cy.get("[data-cy='height']").as("input-height")
  cy.get("[data-cy='complexity']").as("input-complexity")

  cy.get("[data-cy='fillArea']").as("button-fillArea")
  cy.get("[data-cy='showMines']").as("button-showMines")
  cy.get("[data-cy='showMinesAround']").as("button-showMinesAround")
})

Cypress.Commands.add("fillArea", (rows, columns) => {
  cy.get("@input-width").clear().type(rows)
  cy.get("@input-height").clear().type(columns)
  cy.get("@button-fillArea").click()
})


Cypress.Commands.add("setComplexity", (complexity) => {
  cy.get("@input-complexity").clear().type(complexity)
})
