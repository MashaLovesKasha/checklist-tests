describe('Deletes tasks', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']
    const initialTaskCount = tasks.length

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    it('Deletes an active task', () => {
        cy.verifyTodoListLength(initialTaskCount)
        cy.deleteTask(tasks[0])

        cy.verifyTodoListLength(initialTaskCount - 1)
        cy.verifyTaskIsNotInList(tasks[0])
        cy.verifyActiveTaskCounter(initialTaskCount - 1)
    })

    it('Deletes a completed task', () => {
        cy.verifyTodoListLength(initialTaskCount)
        cy.completeAllTasks()
        cy.deleteTask(tasks[1])

        cy.verifyTodoListLength(initialTaskCount - 1)
        cy.verifyTaskIsNotInList(tasks[1])
        cy.verifyActiveTaskCounter( 0)
    })

    it('Clears all completed tasks', () => {
        cy.verifyTodoListLength(initialTaskCount)
        cy.completeTask(tasks[1])
        cy.completeTask(tasks[2])
        cy.deleteAllCompletedTasks()

        cy.verifyTodoListLength(initialTaskCount - 2)
        cy.verifyTaskIsNotInList(tasks[1])
        cy.verifyTaskIsNotInList(tasks[2])
        cy.verifyActiveTaskCounter( initialTaskCount - 2)
    })

    it('Deletes an edited task', () => {
        const updatedText = 'Updated Task 3'

        cy.verifyTodoListLength(initialTaskCount)
        cy.editTask(tasks[2], updatedText)
        cy.deleteTask(updatedText)

        cy.verifyTodoListLength(initialTaskCount - 1)
        cy.verifyTaskIsNotInList(updatedText)
        cy.verifyActiveTaskCounter( initialTaskCount - 1)
    })
})
