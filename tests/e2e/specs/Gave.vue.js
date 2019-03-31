/// <reference types="Cypress" />

describe("Testing user stories", () => {
  beforeEach(() => {
    cy.visit("/game")
    cy.registerElements()
  })

  it("should redirect to game", () => {
    cy.visit("/")

    cy.url().should("include", "/game")
  })

  it("should make the area", () => {
    cy.setComplexity(1)
    cy.fillArea(3, 3)

    cy.get("[data-cy='totalBombAmount']").as("info-totalBombAmount")

    cy.get("td").should("have.length", 9)
    cy
      .get("@info-totalBombAmount")
      .should("contain", 9)
      .should("be.visible")
  })

  it("should click on clear cell then open this cell", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)

    cy
      .get("td").first()
      .click()
      .should("not.have.text")
      .should("have.class", "white")
  })

  it("should double click on clear space then open all clear cells", () => {
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

  it("should click on cell then exlode", () => {
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

  it("should mark a cell as a flag", () => {
    cy.fillArea(2, 2)

    cy
      .get("td").first()
      .trigger("contextmenu")
      .should("have.class", "red")
  })

  it("should show all bombs", () => {
    cy.setComplexity(1)
    cy.fillArea(2, 2)

    cy
      .get("@button-showMines")
      .click()

    cy.get("td").each((td) => {
      expect(td).to.have.class("green")
    })
  })

  it("should show amount of bobms around cell", () => {
    cy.setComplexity(0)
    cy.fillArea(2, 2)

    cy
      .get("@button-showMinesAround")
      .click()

    cy.get("td").each((td) => {
      expect(td).text("0")
    })
  })

  // click
  // - if bomb
  // -- it("should explode", () => {})
  // - if not a bomb
  // -- it("should show nothing if no bombs around", () => {})
  // -- it("should show number of amount bombs around", () => {})

  // right click
  //  it("should toggle red class", () => {})

  // double click
  //  if there no bombs around
  //    it("should correctly open aria", () => {})
  //  if there are bombs around
  //    if flag != bomb around
  //      it("should deny opening surround cells", () => {})
  //    if flag == bomb around
  //      if flag are settled correctly
  //        it("should open surround cells", () => {})
  //      if flag are settled incorrectly
  //        it("should explode", () => {})
})
