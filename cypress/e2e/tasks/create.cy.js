describe('Creates tasks', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Checks the initial state', () => {
        cy.contains('h1', 'todos')

        cy.log('Input field is visible, empty and has the correct placeholder')
        cy.get('[data-testid="text-input"]')
            .should('be.visible')
            .and('have.value', '')
            .and('have.attr', 'placeholder', 'What needs to be done?')

        cy.log('To-do list is not visible and empty')
        cy.get('[data-testid="todo-list"]')
            .should('not.be.visible')
        cy.getTodoListItems()
            .should('have.length', 0)
    })

    it('Adds a single task', () => {
        const task = ['Task 1']

        cy.addTasks(task)
        cy.verifyTodoListLength(task.length)
        cy.verifyTodoListTextOrder(task)
        cy.verifyActiveTaskCounter(task.length)
    })

    it('Adds multiple tasks', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3']

        cy.addTasks(tasks)
        cy.verifyTodoListLength(tasks.length)
        cy.verifyTodoListTextOrder(tasks)
        cy.verifyActiveTaskCounter(tasks.length)
    })
})
