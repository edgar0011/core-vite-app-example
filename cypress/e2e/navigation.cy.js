context('Navigation', () => {
  beforeEach(() => {
    cy.log('Starting...')
    cy.visit('/')
  })

  it('contains home link', () => {
    cy.get('[data-testid$="appMenuId0"]').should('exist')
  })

  it('contains findings link', () => {
    cy.get('[data-testid$="appMenuId1"]').should('exist')
  })

  it('contains register link', () => {
    cy.get('[data-testid$="appMenuId2"]').should('exist')
  })

  it('contains chart link', () => {
    cy.get('[data-testid$="appMenuId3"]').should('exist')
  })
})
