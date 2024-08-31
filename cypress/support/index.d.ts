// TODO define types better
declare namespace Cypress {
    interface Chainable<Subject = any> {
        addTask(task: string): void
        addTasks(tasks: string[]): void
        completeTask(taskIndex: any): void
        completeAllTasks(): void
        verifyAllTasksState(expectedState: 'completed' | 'active', ...taskIndexes: (number | 'all')[]): void
        verifySingleTaskState(expectedState: any, taskIndex: any): void
        activateTask(taskIndex: any): void
        activateAllTasks(): void
        editTask(taskIndex: any, newText: any, options?: { clear: boolean }): void
        verifyTaskText(taskIndex: any, expectedText: any): void
        deleteTask(taskIndex: any): void
        deleteAllCompletedTasks(): void
        verifyTaskNotInList(taskText: any): void
        verifyTaskInList(taskText: any): void
        filterBy(filterName: 'All' | 'Active' | 'Completed'): void
        verifyTodoListLength(expectedLength: any): void
        verifyTodoListContent(tasks: string | string[]): void
        verifyActiveTaskCounter(expectedCount: any): void
        verifyTodoList(tasks: string | string[]): void
    }
}