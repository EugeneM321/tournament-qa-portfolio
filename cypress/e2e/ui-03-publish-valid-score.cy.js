import { expectMatch, expectStandings, publishScore } from '../support/tournament'

it('UI-03 — saves a valid Organizer result through a match reload', () => {
  publishScore('1', '2')
  expectMatch('1–2')
  cy.reload()
  expectMatch('1–2')

  cy.contains('nav a', /^Standings$/).click()
  expectStandings('River Foxes', 'North Owls')
})
