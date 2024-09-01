// ====================================================
// Utility Commands
// ====================================================

/**
 * Returns the list of to-do items for further actions
 */
Cypress.Commands.add('getTodoListItems', () => {
    return cy.get('[data-testid="todo-list"] li')
})


// ====================================================
// Task creation
// ====================================================

Cypress.Commands.add('addTasks', (tasks) => {
    tasks.forEach(task => {
        cy.get('[data-testid="text-input"]')
            .type(`${task}{enter}`)
    })
})


// ====================================================
// Task state management
// ====================================================

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


// ====================================================
// Task editing
// ====================================================



/**
 * Finds the specified task and updates its text to the provided new value
 * By default, the existing text will be cleared before typing the new one
 * To keep the current text and append the new one, pass { clear: false } in the options
 */
Cypress.Commands.add('editTask', (taskText, newText, options = { clear: true }) => {
    cy.getTodoListItems()
        .contains(taskText)
        .dblclick()

    cy.get('[data-testid="todo-item"] [data-testid="text-input"]')
        .as('input')

    if (options.clear) {
        cy.get('@input').clear()
    }

    cy.get('@input')
        .type(`${newText}{enter}`)
})


// ====================================================
// Task deletion
// ====================================================

Cypress.Commands.add('deleteTask', (taskText) => {
    cy.getTodoListItems()
        .contains(taskText)
        // TODO this hover doesn't always work correctly, need to think about other solution
        .realHover({ position: "center" })
        .wait(300)
        .parents('li')
        .find('[data-testid="todo-item-button"]')
        .should('be.visible')
        .click()
})

Cypress.Commands.add('deleteAllCompletedTasks', () => {
    cy.get('.clear-completed')
        .contains('Clear completed')
        .click()
})


// ====================================================
// Task filtering
// ====================================================

Cypress.Commands.add('filterBy', (filter) => {
    cy.get('[data-testid="footer-navigation"]')
        .contains(filter)
        .click()
})
