import { expectMatch, expectStandings, publishScore } from '../support/tournament'

it('UI-04 (R-03 / M05 / A04) — rejects an invalid score and preserves saved state', () => {
  expectMatch('2–1')
  publishScore('100', '1')
  cy.get('#home-error').should('be.visible')
    .and('have.text', 'North Owls: Enter a whole number from 0 to 99.')
  cy.get('#home').should('have.attr', 'aria-invalid', 'true')
  expectMatch('2–1')

  // Return to the saved Match view before reload to avoid replaying the rejected POST.
  cy.contains('nav a', /^Match$/).click()
  cy.location('pathname').should('eq', '/')
  cy.reload()
  expectMatch('2–1')

  cy.contains('nav a', /^Standings$/).click()
  expectStandings('North Owls', 'River Foxes')
  cy.reload()
  expectStandings('North Owls', 'River Foxes')
})
