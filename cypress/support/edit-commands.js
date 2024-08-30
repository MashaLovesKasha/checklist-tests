// This command finds the specified task and updates its text to the specified new one
// By default, it'll clear the current text before typing the new one
// If you don't want the text to be cleared, pass { clear: false } in the options
Cypress.Commands.add('editTask', (taskIndex, newText, options = { clear: true }) => {
    cy.get('[data-testid="todo-list"] li')
        .eq(taskIndex)
        .as('task')
        .dblclick()
    cy.get('@task')
        .find('[data-testid="text-input"]')
        .as('input')

    // Clear the existing text if 'clear' option is true
    if (options.clear) {
        cy.get('@input').clear()
    }

    cy.get('@input')
        .type(`${newText}{enter}`)
})

Cypress.Commands.add('verifyTaskText', (taskIndex, expectedText) => {
    cy.get('[data-testid="todo-list"] li')
        .eq(taskIndex)
        .should('have.text', expectedText)
})
