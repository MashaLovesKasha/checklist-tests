describe('Changes tasks state', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']
    const initialTaskCount = tasks.length

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    describe('Completes tasks', () => {
        it('Marks some tasks as completed one by one', () => {
            cy.log('Marks the second task as completed. Result: 4 active tasks, 1 completed')
            cy.completeTask(tasks[1])
            cy.verifyAllTasksState('completed', tasks[1])
            cy.verifyActiveTaskCounter(initialTaskCount - 1)

            cy.log('Marks the 5th task as completed. Result: 3 active tasks, 2 completed')
            cy.completeTask(tasks[4])
            cy.verifyAllTasksState('completed', tasks[1], tasks[4])
            cy.verifyActiveTaskCounter(initialTaskCount - 2)
        })

        it('Marks all tasks as completed', () => {
            cy.completeAllTasks()
            cy.verifyAllTasksState( 'completed', 'all')
            cy.verifyActiveTaskCounter(initialTaskCount - 5)
        })
    })

    describe('Activates tasks', () => {
        beforeEach(() => {
            cy.completeAllTasks()
        })

        it('Marks some tasks as active one by one', () => {
            cy.log('Marks the first task as active. Result: 4 completed tasks, 1 active')
            cy.activateTask(tasks[0])
            cy.verifyAllTasksState('active', tasks[0])
            cy.verifyActiveTaskCounter(initialTaskCount - 4)

            cy.log('Marks the 4th task as active. Result: 3 completed tasks, 2 active')
            cy.activateTask(tasks[3])
            cy.verifyAllTasksState('active', tasks[0], tasks[3])
            cy.verifyActiveTaskCounter(initialTaskCount - 3)
        })

        it('Marks all tasks as active', () => {
            cy.activateAllTasks()
            cy.verifyAllTasksState('active', 'all')
            cy.verifyActiveTaskCounter(initialTaskCount)
        })
    })
})
