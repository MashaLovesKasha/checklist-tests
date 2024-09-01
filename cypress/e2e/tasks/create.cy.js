describe('Creates tasks', { tags: ['high-priority'] },() => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Checks the page initial state',() => {
        cy.contains('h1', 'todos')

        cy.log('Input field is visible, empty and has the correct placeholder')
        cy.get('[data-testid="text-input"]')
            .should('be.visible')
            .and('have.value', '')
            .and('have.attr', 'placeholder', 'What needs to be done?')
        cy.verifyTodoListIsHiddenAndEmpty()
    })

    it('Adds a single task', () => {
        const task = ['Task 1']
        const taskCount = task.length

        cy.addTasks(task)
        cy.verifyTodoListLength(taskCount)
        cy.verifyTodoListTextOrder(task)
        cy.verifyActiveTaskCounter(taskCount)
    })

    it('Adds multiple tasks', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3']
        const taskCount = tasks.length

        cy.addTasks(tasks)
        cy.verifyTodoListLength(taskCount)
        cy.verifyTodoListTextOrder(tasks)
        cy.verifyActiveTaskCounter(taskCount)
    })
})
