Cypress.Commands.add('getTodoListItems', () => {
    return cy.get('[data-testid="todo-list"] li')
})


// ====================================================
// Verification of to-do list length, content and the active task counter
// ====================================================

Cypress.Commands.add('verifyTodoListLength', (expectedLength) => {
    cy.getTodoListItems()
        .should('have.length', expectedLength)
})

// Verifies that the to-do list contains tasks with expected text in the correct order
Cypress.Commands.add('verifyTodoListTextOrder', (tasks) => {
    tasks.forEach((task, index) => {
        cy.getTodoListItems()
            .eq(index)
            .should('have.text', task)
    })
})

Cypress.Commands.add('verifyTaskText', (taskIndex, expectedText) => {
    cy.getTodoListItems()
        .eq(taskIndex)
        .should('have.text', expectedText)
})

Cypress.Commands.add('verifyActiveTaskCounter', (expectedCount) => {
    const itemText = expectedCount === 1 ? 'item' : 'items'

    cy.get('.todo-count')
        .should('have.text', `${expectedCount} ${itemText} left!`)
})


// ====================================================
// Verification of task presence in the to-do list
// ====================================================

Cypress.Commands.add('verifyTaskIsInList', (taskText) => {
    cy.getTodoListItems()
        .should('contain.text', taskText)
})

Cypress.Commands.add('verifyTaskIsNotInList', (taskText) => {
    cy.getTodoListItems()
        .should('not.contain.text', taskText)
})


// ====================================================
// Verification of task state (active or completed)
// ====================================================

Cypress.Commands.add('verifySingleTaskState', (expectedState, taskText) => {
    const completedState = expectedState === 'completed'

    cy.getTodoListItems()
        .contains(taskText)
        .parents('li')
        .should(completedState ? 'have.class' : 'not.have.class', 'completed')
})

// Verifies the state of specified tasks (completed or active) and ensures that all other tasks are in the opposite state
Cypress.Commands.add('verifyAllTasksState', (expectedState, ...taskTexts) => {
    const completedState = expectedState === 'completed'
    const checkAll = taskTexts.includes('all')

    cy.getTodoListItems()
        .each((task, index) => {
            const shouldCheck = checkAll || taskTexts.includes(task.text())

            if (shouldCheck) {
                cy.wrap(task).should(completedState ? 'have.class' : 'not.have.class', 'completed')
            } else {
                cy.wrap(task).should(completedState ? 'not.have.class' : 'have.class', 'completed')
            }
        })
})
