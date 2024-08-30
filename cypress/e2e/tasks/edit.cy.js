describe('Edits tasks', () => {
    const tasks = ['Task 1', 'Task 2']

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    it('Edits an active task, replacing the text', () => {
        const updatedText = 'Updated task text'

        cy.editTask(0, updatedText)
        cy.verifyTaskText(0, updatedText)
        cy.verifySingleTaskState('active', 0)
    })

    it('Edits a completed task, appending new text', () => {
        const appendedText = ' - appended text'

        cy.completeTask(1)
        cy.editTask(1, appendedText, { clear: false })
        cy.verifyTaskText(1, `${tasks[1]}${appendedText}`)
        cy.verifySingleTaskState('completed', 1)
    })
})
