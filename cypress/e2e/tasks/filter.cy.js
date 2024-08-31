describe('Filters tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']

    beforeEach(() => {
        cy.visit('/');
        cy.addTasks(tasks)
    })

    describe('Basic filtering', () => {
        beforeEach(() => {
            cy.completeTask(1)
        })

        it('Filters by active tasks', () => {
            cy.filterBy('Active')
            cy.verifyTaskInList(tasks[0])
            cy.verifyTaskInList(tasks[2])
            cy.verifyAllTasksState( 'active', 'all')
            cy.verifyTodoListLength(tasks.length - 1)
        })

        it('Filters by completed tasks', () => {
            cy.filterBy('Completed')
            cy.verifyTaskInList(tasks[1])
            cy.verifyAllTasksState( 'completed', 'all')
            cy.verifyTodoListLength(tasks.length - 2)
        })

        it('Filters by all tasks', () => {
            cy.filterBy('All')
            cy.verifyAllTasksState( 'completed', 1)
            cy.verifyTodoListLength(tasks.length)
        })
    })

    describe('Changing task state within filtered tabs', () => {
        it('Completes task on "Active" tab', () => {
            cy.filterBy('Active')
            cy.verifyTodoListLength(tasks.length)
            cy.completeTask(0)
            cy.verifyTodoListLength(tasks.length - 1)

            cy.filterBy('Completed')
            cy.verifyTaskInList(tasks[0])
            cy.verifyTodoListLength(tasks.length - 2)
        })

        it('Activates task on "Completed" tab', () => {
            cy.completeTask(2)
            cy.filterBy('Completed')
            cy.verifyTodoListLength(tasks.length - 2)
            cy.activateTask(0)
            cy.verifyTodoListLength(tasks.length - 3)

            cy.filterBy('Active')
            cy.verifyTaskInList(tasks[2])
            cy.verifyTodoListLength(tasks.length)
        })
    })
})
