import { expectMatch } from '../support/tournament'

it('UI-02 — lets the Viewer see the score without publish controls', () => {
  cy.get('#role').should('have.value', 'viewer')
  expectMatch('2–1')
  cy.contains('button', /^Publish score$/).should('not.exist')
  cy.get('#home, #away').should('not.exist')
})
