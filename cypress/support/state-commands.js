Cypress.Commands.add('completeTask', (taskText) => {
    cy.getTodoListItems()
        .contains(taskText)
        .prev()
        .check()
})

Cypress.Commands.add('completeAllTasks', () => {
    cy.get('[data-testid="toggle-all"]')
        .check()
})

Cypress.Commands.add('activateTask', (taskText) => {
    cy.getTodoListItems()
        .contains(taskText)
        .prev()
        .uncheck()
})

Cypress.Commands.add('activateAllTasks', () => {
    cy.get('[data-testid="toggle-all"]')
        .uncheck()
})
