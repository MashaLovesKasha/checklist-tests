describe('Complete Tasks', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'])
    })

    it('Marks some tasks as completed one by one', () => {
        cy.log('Mark the second task as completed. Result: 5 tasks, 1 completed')
        cy.completeTask(1)
        cy.verifyCompletionState(1)
        cy.verifyTodoListCounter(4)

        cy.log('Mark the 4th task as completed. Result: 5 tasks, 2 completed')
        cy.completeTask(3)
        cy.verifyCompletionState(1, 3)
        cy.verifyTodoListCounter(3)
    })

    it('Marks all tasks as completed', () => {
        cy.completeAllTasks()
        cy.verifyCompletionState('all')
        cy.verifyTodoListCounter(0)
    })
})
