describe('Creates tasks', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Checks the initial state', () => {
        cy.log('Input field is visible, empty and has the correct placeholder')
        cy.get('[data-testid="text-input"]')
            .should('be.visible')
            .and('have.value', '')
            .and('have.attr', 'placeholder', 'What needs to be done?')

        cy.log('To-do list is not visible and empty')
        cy.get('[data-testid="todo-list"]')
            .as('list')
            .should('not.be.visible')
        cy.get('@list')
            .find('li')
            .should('have.length', 0)
    })

    it('Allows user to add a single task', () => {
        const task = 'Task 1'

        cy.addTask(task)
        cy.verifyTodoList(task)
    })

    it('Allows user to add multiple tasks', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3']

        cy.addTasks(tasks)
        cy.verifyTodoList(tasks)
    })
})
