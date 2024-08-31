Cypress.Commands.add('deleteTask', (taskIndex) => {
    // TODO need to save this selector as global variable
    cy.get('[data-testid="todo-list"] li')
        .eq(taskIndex)
        // this hover doesn't always work correct, need to think about other solution
        .realHover({ position: "center" })
        .wait(200)
        .find('[data-testid="todo-item-button"]')
        .should('be.visible')
        .click()
})

Cypress.Commands.add('deleteAllCompletedTasks', () => {
    cy.get('.clear-completed')
        .click()
})

Cypress.Commands.add('verifyTaskNotInList', (taskText) => {
    cy.get('[data-testid="todo-list"] li')
        .should('not.contain.text', taskText)
})
