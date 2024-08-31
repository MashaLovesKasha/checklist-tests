Cypress.Commands.add('addTasks', (tasks) => {
    tasks.forEach(task => {
        cy.get('[data-testid="text-input"]')
            .type(`${task}{enter}`)
    })
})
