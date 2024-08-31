Cypress.Commands.add('filterBy', (filter) => {
    cy.get('[data-testid="footer-navigation"]')
        .contains(filter)
        .click()
})

Cypress.Commands.add('verifyTaskInList', (taskText) => {
    cy.get('[data-testid="todo-list"] li')
        .should('contain.text', taskText)
})
