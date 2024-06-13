context('Application', () => {
  beforeEach(() => {
    cy.log('Starting...')
  })

  it('is running', () => {
    cy.visit('/')
    cy.get('icon-base[id="some headline"]').should('exist')
  })
})
