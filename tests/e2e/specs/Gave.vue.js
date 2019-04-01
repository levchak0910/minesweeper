/// <reference types="Cypress" />

describe("Testing user stories", () => {
  beforeEach(() => {
    cy.visit("/game")
    cy.registerElements()
  })


  // BUTTON Fill the area > CLICK
  //  e: it should make the area and show bombs amount

  it("should make the area and show bombs amount", () => {
    cy.setComplexity(1)
    cy.fillArea(3, 3)

    cy.get("[data-cy='totalBombAmount']").as("info-totalBombAmount")

    cy.get("td").should("have.length", 9)
    cy
      .get("@info-totalBombAmount")
      .should("contain", 9)
      .should("be.visible")
  })


  // BUTTON Show all bombs > CLICK
  //  e: it should show all bombs, after hide them

  it("should show all bombs, after hide them", () => {
    cy.setComplexity(1)
    cy.fillArea(2, 2)

    cy
      .get("@button-showMines")
      .click()

    cy.get("td").each((td) => {
      expect(td).to.have.class("green")
    })

    cy
      .get("@button-showMines")
      .click()

    cy.get("td").each((td) => {
      expect(td).not.to.have.class("green")
    })
  })


  // BUTTON Show number of all bombs around > CLICK
  //  e: it should show number of amount bombs around cell, after hide them

  it("should show number of amount bombs around cell, after hide them", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)

    cy
      .get("@button-showMinesAround")
      .click()

    cy.get("td").each((td) => {
      expect(td).text("0")
    })

    cy
      .get("@button-showMinesAround")
      .click()

    cy.get("td").each((td) => {
      expect(td).text("")
    })
  })


  // GAME LOGIC > Win the game
  //  e: it should win the game

  it("should win the game", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)
    const stub = cy.stub()
    cy.on("window:alert", stub)
    cy.clock()

    cy
      .get("td").first()
      .dblclick()
      .tick(500)
      .then(() => {
        expect(stub).to.be.calledWith("You win!")
      })
  })


  // Cell > RIGHT CLICK
  //  if cell is unknown
  //    e: it should toggle red class
  //  if cell is demined
  //    e: it should do nothing

  it("should toggle a cell as a flag if cell is unknown", () => {
    cy.fillArea(2, 2)

    cy
      .get("td").first()
      .trigger("contextmenu")
      .should("have.class", "red")
      .trigger("contextmenu")
      .should("not.have.class", "red")
  })

  it("should do nothing if cell is demined", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)

    cy
      .get("td").first()
      .click()
      .trigger("contextmenu")
      .should("not.have.class", "red")
  })


  // Cell > CLICK
  //  if bomb
  //    e: it should explode
  //  if not a bomb
  //    e: it should show nothing if no bombs around
  //    e: it should show number of amount bombs around cell

  it("should exlode if a cell is a bomb", () => {
    cy.setComplexity(1)
    cy.fillArea(2, 2)
    const stub = cy.stub()
    cy.on("window:alert", stub)

    cy
      .get("td").first()
      .click()
      .then(() => {
        expect(stub).to.be.calledWith("Game over!")
      })
  })

  it("should open a cell if there is no bomb", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)

    cy
      .get("td").first()
      .click()
      .should("not.have.text")
      .should("have.class", "white")
  })


  // Cell > DOUBLE CLICK
  //  if there no bombs around
  //    e: it should correctly open aria
  //  if there are bombs around
  //    if flag != bomb around
  //      u: it should deny opening surround cells
  //    if flag == bomb around
  //      if flag are settled correctly
  //        u: it should open surround cells
  //      if flag are settled incorrectly
  //        u: it should explode

  it("it should correctly open aria if there no bombs around", () => {
    cy.setComplexity(0)
    cy.fillArea(3, 3)

    cy
      .get("td").first()
      .dblclick()

    cy.get("td").each((td) => {
      expect(td).has.class("white")
      expect(td).has.text("")
    })
  })
})
