beforeEach(() => {
    cy.visit('/')
    cy.addTasks(['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'])
})

describe('Completes tasks', () => {
    it('Marks some tasks as completed one by one', () => {
        cy.log('Marks the second task as completed. Result: 4 active tasks, 1 completed')
        cy.completeTask(1)
        cy.verifyAllTasksState('completed', 1)
        cy.verifyTodoListCounter(4)

        cy.log('Marks the 5th task as completed. Result: 3 active tasks, 2 completed')
        cy.completeTask(4)
        cy.verifyAllTasksState('completed', 1, 4)
        cy.verifyTodoListCounter(3)
    })

    it('Marks all tasks as completed', () => {
        cy.completeAllTasks()
        cy.verifyAllTasksState( 'completed', 'all')
        cy.verifyTodoListCounter(0)
    })
})

describe('Activates tasks', () => {
    beforeEach(() => {
        cy.completeAllTasks()
    })

    it('Marks some tasks as active one by one', () => {
        cy.log('Marks the first task as active. Result: 4 completed tasks, 1 active')
        cy.activateTask(0)
        cy.verifyAllTasksState('active', 0)
        cy.verifyTodoListCounter(1)

        cy.log('Marks the 4th task as active. Result: 3 completed tasks, 2 active')
        cy.activateTask(3)
        cy.verifyAllTasksState('active', 0, 3)
        cy.verifyTodoListCounter(2)
    })

    it('Marks all tasks as active', () => {
        cy.activateAllTasks()
        cy.verifyAllTasksState('active', 'all')
        cy.verifyTodoListCounter(5)
    })
})
