describe('Filters tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']
    const initialTaskCount = tasks.length

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    describe('Basic filtering', () => {
        beforeEach(() => {
            cy.completeTask(tasks[1])
        })

        it('Filters by active tasks', () => {
            cy.filterBy('Active')
            cy.url().should('contain', '/active')
            cy.verifyAllTasksState( 'active', 'all')
            cy.verifyTodoListLength(initialTaskCount - 1)
        })

        it('Filters by completed tasks', () => {
            cy.filterBy('Completed')
            cy.url().should('contain', '/completed')
            cy.verifyAllTasksState( 'completed', 'all')
            cy.verifyTodoListLength(initialTaskCount - 2)
        })

        it('Filters by all tasks', () => {
            cy.filterBy('All')
            cy.verifyAllTasksState( 'completed', tasks[1])
            cy.verifyTodoListLength(initialTaskCount)
        })
    })

    describe('Changing task state within filtered tabs', () => {
        it('Completes all tasks on "Active" tab', () => {
            cy.filterBy('Active')
            cy.verifyAllTasksState('active', 'all')
            cy.verifyTodoListLength(initialTaskCount)
            cy.completeAllTasks()
            cy.verifyTodoListLength(initialTaskCount - 3)

            cy.filterBy('Completed')
            cy.verifyAllTasksState('completed', 'all')
            cy.verifyTodoListLength(initialTaskCount)
        })

        it('Activates task on "Completed" tab', () => {
            cy.completeTask(tasks[2])
            cy.filterBy('Completed')
            cy.verifyTodoListLength(initialTaskCount - 2)
            cy.activateTask(tasks[2])
            cy.verifyTodoListLength(initialTaskCount - 3)

            cy.filterBy('Active')
            cy.verifyTaskIsInList(tasks[2])
            cy.verifySingleTaskState('active', tasks[2])
            cy.verifyTodoListLength(initialTaskCount)
        })
    })
})
