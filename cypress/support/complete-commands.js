Cypress.Commands.add('completeTask', (taskIndex) => {
    cy.get('[data-testid="todo-item-toggle"]')
        .eq(taskIndex)
        .check()
})

Cypress.Commands.add('completeAllTasks', () => {
    cy.get('[data-testid="toggle-all"]')
        .check()
})

// Verify that specified tasks are completed and others are not
Cypress.Commands.add('verifyCompletionState', (...completedIndexes) => {
    const checkAll = completedIndexes.includes('all')

    cy.get('[data-testid="todo-list"] li')
        .each((task, index) => {
            if (checkAll || completedIndexes.includes(index)) {
                cy.wrap(task)
                    .should('have.class', 'completed');
            } else {
                cy.wrap(task)
                    .should('not.have.class', 'completed');
            }
        })
})
