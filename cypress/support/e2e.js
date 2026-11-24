beforeEach(() => {
  cy.request({
    method: 'POST',
    url: '/reset',
    followRedirect: false,
  }).its('status').should('eq', 303)
  cy.visit('/')
})
