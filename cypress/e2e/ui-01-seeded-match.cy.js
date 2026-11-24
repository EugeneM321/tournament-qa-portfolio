import { expectMatch, expectStandings } from '../support/tournament'

it('UI-01 — shows the seeded match and standings', () => {
  cy.contains('header p', 'Cedar Cup').should('be.visible')
  cy.contains('h1', /^Match$/).should('be.visible')
  cy.contains('main p', 'Result status: Published').should('be.visible')
  expectMatch('2–1')

  cy.contains('nav a', /^Standings$/).click()
  expectStandings('North Owls', 'River Foxes')
})
