import { expectMatch, expectStandings, publishScore } from '../support/tournament'

it('UI-05 — keeps standings consistent after reloading the standings view', () => {
  publishScore('1', '2')
  expectMatch('1–2')
  cy.contains('nav a', /^Standings$/).click()
  expectStandings('River Foxes', 'North Owls')

  cy.reload()
  expectStandings('River Foxes', 'North Owls')
  cy.contains('nav a', /^Match$/).click()
  expectMatch('1–2')
})
