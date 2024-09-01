describe('Filters tasks',{ tags: ['medium-priority'] }, () => {
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
            cy.log('Filters by active tasks and verifies all tasks are active')
            cy.filterBy('Active')
            cy.verifyAllTasksState('active', 'all')
            cy.verifyTodoListLength(initialTaskCount)

            cy.log('Completes all tasks. The active task list is hidden and empty');
            cy.completeAllTasks()
            cy.verifyTodoListIsHiddenAndEmpty()

            cy.log('Filters by completed tasks to verify all tasks are now in this list and marked as completed')
            cy.filterBy('Completed')
            cy.verifyAllTasksState('completed', 'all')
            cy.verifyTodoListLength(initialTaskCount)
        })

        it('Activates the only task on "Completed" tab', () => {
            cy.log('Marks the third task as completed, filters by completed tasks. The task list has only 1 task')
            cy.completeTask(tasks[2])
            cy.filterBy('Completed')
            cy.verifyTodoListLength(initialTaskCount - 2)

            cy.log('Activates the only completed task. The completed task list is hidden and empty')
            cy.activateTask(tasks[2])
            cy.verifyTodoListIsHiddenAndEmpty()

            cy.log('Filters by active tasks to verify the third task now in this list')
            cy.filterBy('Active')
            cy.verifyTaskIsInList(tasks[2])
            cy.verifySingleTaskState('active', tasks[2])
            cy.verifyTodoListLength(initialTaskCount)
        })
    })
})
