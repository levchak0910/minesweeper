/// <reference types="Cypress" />

describe("Testing app", () => {
  // Router
  // if correct url
  //  it should stay at this page
  // if wrong url
  //  it should redirect to page "Game"

  it("should stay at this page if url correct", () => {
    cy.visit("/game")

    cy.url().should("include", "/game")
  })

  it("should redirect to page 'Game' if url is wrong", () => {
    cy.visit("/")

    cy.url().should("include", "/game")
  })
})
