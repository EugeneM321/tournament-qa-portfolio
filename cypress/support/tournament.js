export function publishScore(home, away) {
  cy.get('#role').select('Organizer')
  cy.contains('button', /^Apply role$/).click()
  cy.get('#home').clear().type(home)
  cy.get('#away').clear().type(away)
  cy.contains('button', /^Publish score$/).click()
}

export function expectMatch(score) {
  cy.contains('main p', `North Owls ${score} River Foxes`).should('be.visible')
}

export function expectStandings(winner, loser) {
  cy.contains('h1', /^Standings$/).should('be.visible')
  cy.get('tbody tr').should('have.length', 2).and('be.visible')

  cy.contains('tbody th[scope="row"]', winner).parent('tr').should('be.visible')
    .find('td').should(($cells) => {
      expect($cells.toArray().map((cell) => cell.textContent.trim()))
        .to.deep.equal(['1', '0', '0', '3'])
    })

  cy.contains('tbody th[scope="row"]', loser).parent('tr').should('be.visible')
    .find('td').should(($cells) => {
      expect($cells.toArray().map((cell) => cell.textContent.trim()))
        .to.deep.equal(['0', '0', '1', '0'])
    })
}
