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
