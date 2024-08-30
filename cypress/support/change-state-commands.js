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

// Verifies the state of specified tasks (completed or active) and ensures that all other tasks are in the opposite state
Cypress.Commands.add('verifyAllTasksState', (expectedState, ...taskIndexes) => {
    const completedState = expectedState === 'completed'
    const checkAll = taskIndexes.includes('all')

    cy.get('[data-testid="todo-list"] li')
        .each((task, index) => {
            if (checkAll || taskIndexes.includes(index)) {
                cy.wrap(task).should(completedState ? 'have.class' : 'not.have.class', 'completed')
            } else {
                cy.wrap(task).should(completedState ? 'not.have.class' : 'have.class', 'completed')
            }
        })
})

Cypress.Commands.add('verifySingleTaskState', (expectedState, taskIndex) => {
    const completedState = expectedState === 'completed'

    cy.get('[data-testid="todo-list"] li')
        .eq(taskIndex)
        .should(completedState ? 'have.class' : 'not.have.class', 'completed');
})