describe('Edits tasks', () => {
    const tasks = ['Task 1', 'Task 2']

    beforeEach(() => {
        cy.visit('/')
        cy.addTasks(tasks)
    })

    it('Edits an active task, replacing the text', () => {
        const updatedText = 'Updated task text'

        cy.editTask(tasks[0], updatedText)
        cy.verifyTaskText(0, updatedText)
        cy.verifySingleTaskState('active', updatedText)
    })

    it('Edits a completed task, appending new text', () => {
        const appendedText = ' - appended text'

        cy.completeTask(tasks[1])
        cy.editTask(tasks[1], appendedText, { clear: false })
        cy.verifyTaskText(1, `${tasks[1]}${appendedText}`)
        cy.verifySingleTaskState('completed', `${tasks[1]}${appendedText}`)
    })
})
