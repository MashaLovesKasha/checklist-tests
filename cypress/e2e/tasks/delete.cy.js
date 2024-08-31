describe('Deletes tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    it('Deletes an active task', () => {
        cy.verifyTodoListLength(tasks.length)
        cy.deleteTask(0)

        cy.verifyTodoListLength(tasks.length - 1)
        cy.verifyTaskNotInList(tasks[0])
        cy.verifyActiveTaskCounter(tasks.length - 1)
    })

    it('Deletes a completed task', () => {
        cy.verifyTodoListLength(tasks.length)
        cy.completeAllTasks()
        cy.deleteTask(1)

        cy.verifyTodoListLength(tasks.length - 1)
        cy.verifyTaskNotInList(tasks[1])
        cy.verifyActiveTaskCounter( 0)
    });

    it('Clears all completed tasks', () => {
        //TODO probably we'll need a command to complete and verify several tasks, but not all
        cy.verifyTodoListLength(tasks.length)
        cy.completeTask(1)
        cy.completeTask(2)
        cy.deleteAllCompletedTasks()

        cy.verifyTodoListLength(tasks.length - 2)
        cy.verifyTaskNotInList(tasks[1])
        cy.verifyTaskNotInList(tasks[2])
        cy.verifyActiveTaskCounter( tasks.length - 2)
    });

    it('Deletes an edited task', () => {
        const updatedText = 'Edited Task 2'

        cy.verifyTodoListLength(tasks.length)
        cy.editTask(2, updatedText)
        cy.deleteTask(2)

        cy.verifyTodoListLength(tasks.length - 1)
        cy.verifyTaskNotInList(updatedText)
        cy.verifyActiveTaskCounter( tasks.length - 1)
    })
})
