// This command finds the specified task and updates its text to the specified new one
// By default, it'll clear the current text before typing the new one
// If you don't want the text to be cleared, pass { clear: false } in the options
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
