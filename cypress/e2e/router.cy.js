context('Router', () => {
  beforeEach(() => {
    cy.log('Starting...')
    cy.visit('/')
  })

  it('renders home', () => {
    cy.get('[data-testid$="appMenuId0"]').click()
    cy.get('[data-testid="home"]').should('exist')
  })

  it('renders scan table', () => {
    cy.get('[data-testid$="appMenuId1"]').click()
    cy.get('[data-testid="findings"]').should('exist')
  })

  it('renders register', () => {
    cy.get('[data-testid$="appMenuId2"]').click()
    cy.get('[data-testid="register"]').should('exist')
  })

  it('renders chart', () => {
    cy.get('[data-testid$="appMenuId3"]').click()
    cy.get('[data-testid="chart"]').should('exist')
  })
})
