Cypress.Commands.add('completeTask', (taskIndex) => {
    cy.get('[data-testid="todo-item-toggle"]')
        .eq(taskIndex)
        .check()
})

Cypress.Commands.add('completeAllTasks', () => {
    cy.get('[data-testid="toggle-all"]')
        .check()
})

Cypress.Commands.add('activateTask', (taskIndex) => {
    cy.get('[data-testid="todo-item-toggle"]')
        .eq(taskIndex)
        .uncheck()
})

Cypress.Commands.add('activateAllTasks', () => {
    cy.get('[data-testid="toggle-all"]')
        .uncheck()
})

// Verify the state of specified tasks (completed or active) and ensure that all other tasks are in the opposite state
Cypress.Commands.add('verifyTaskState', (expectedState, ...taskIndexes) => {
    const completed = expectedState === 'completed'
    const checkAll = taskIndexes.includes('all')

    cy.get('[data-testid="todo-list"] li')
        .each((task, index) => {
            if (checkAll || taskIndexes.includes(index)) {
                cy.wrap(task).should(completed ? 'have.class' : 'not.have.class', 'completed')
            } else {
                cy.wrap(task).should(completed ? 'not.have.class' : 'have.class', 'completed')
            }
        })
})
