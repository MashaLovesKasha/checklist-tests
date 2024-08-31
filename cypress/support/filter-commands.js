Cypress.Commands.add('filterBy', (filter) => {
    cy.get('[data-testid="footer-navigation"]')
        .contains(filter)
        .click()
})
