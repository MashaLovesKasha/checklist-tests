Cypress.Commands.add('addTask', (task) => {
    cy.get('[data-testid="text-input"]')
        .type(`${task}{enter}`)
})

Cypress.Commands.add('addTasks', (tasks) => {
    tasks.forEach(task => {
        cy.addTask(task)
    })
})

Cypress.Commands.add('verifyTodoListLength', (expectedLength) => {
    cy.get('[data-testid="todo-list"] li')
        .should('have.length', expectedLength)
})

Cypress.Commands.add('verifyTodoListContent', (tasks) => {
    // If a single task is passed as a string, convert it to an array
    if (typeof tasks === 'string') {
        tasks = [tasks]
    }
    tasks.forEach((task, index) => {
        cy.get('[data-testid="todo-list"] li')
            .eq(index)
            .should('have.text', task)
    })
})

Cypress.Commands.add('verifyTodoListCounter', (expectedCount) => {
    const itemText = expectedCount === 1 ? 'item' : 'items'
    cy.get('.todo-count')
        .should('have.text', `${expectedCount} ${itemText} left!`)
})

Cypress.Commands.add('verifyTodoList', (tasks) => {
    // If a single task is passed as a string, convert it to an array
    if (typeof tasks === 'string') {
        tasks = [tasks]
    }
    cy.verifyTodoListLength(tasks.length)
    cy.verifyTodoListContent(tasks)
    cy.verifyTodoListCounter(tasks.length)
})
