declare namespace Cypress {
    interface Chainable<Subject = any> {
        getTodoListItems(): Cypress.Chainable<JQuery<HTMLElement>>
        addTasks(tasks: string[]): void
        completeTask(taskText: string): void
        completeAllTasks(): void
        activateTask(taskText: string): void
        activateAllTasks(): void
        editTask(taskText: string, newText: string, options?: { clear: boolean }): void
        deleteTask(taskText: string): void
        deleteAllCompletedTasks(): void
        filterBy(filterName: 'All' | 'Active' | 'Completed'): void
        verifyTaskText(taskIndex: number, expectedText: string): void
        verifyTaskIsInList(taskText: string): void
        verifyTaskIsNotInList(taskText: string): void
        verifyTodoListLength(expectedLength: number): void
        verifyTodoListTextOrder(tasks: string[]): void
        verifyTodoListIsHiddenAndEmpty(): void
        verifyActiveTaskCounter(expectedCount: number): void
        verifyAllTasksState(expectedState: 'completed' | 'active', ...taskTexts: (string | 'all')[]): void
        verifySingleTaskState(expectedState: 'completed' | 'active', taskText: string): void
    }
}