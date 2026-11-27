import { expectMatch } from '../support/tournament'

it('UI-06 (R-05 / M12) — keyboard submission focuses and describes the invalid field', () => {
  cy.get('#role').select('Organizer')
  cy.contains('button', /^Apply role$/).click()
  cy.get('#role').focus()
  cy.press(Cypress.Keyboard.Keys.TAB)
  cy.focused().should('have.text', 'Apply role')
  cy.press(Cypress.Keyboard.Keys.TAB)
  cy.focused().should('have.attr', 'id', 'home')
  cy.focused().clear()
  cy.focused().type('100')
  cy.press(Cypress.Keyboard.Keys.TAB)
  cy.focused().should('have.attr', 'id', 'away')
  cy.press(Cypress.Keyboard.Keys.TAB)
  cy.focused().should('have.text', 'Publish score')
  cy.press(Cypress.Keyboard.Keys.ENTER)

  cy.focused().should($field => {
    expect($field).to.have.attr('id', 'home')
    expect($field).to.have.attr('aria-invalid', 'true')
    expect($field.attr('aria-describedby').split(/\s+/)).to.include.members(['score-rule', 'home-error'])
  })
  cy.get('#home-error').should('be.visible').and('contain.text', 'Enter a whole number from 0 to 99.')
  expectMatch('2–1')
})
