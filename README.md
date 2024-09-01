# Checklist tests
Tests for the checklist https://todomvc.com/examples/react/dist/#/

## Pre-requirements
You need [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to be installed to install proper version of node

## Setup
- `nvm install`
- `nvm use`
- `npm install`

## Usage
### To run tests with visual debugger
- `npm run cy:open`
- choose "E2E Testing"
- choose the browser
- click "Start E2E testing"

There are 5 tests:
- `change-state.cy.js`
- `create.cy.js`
- `delete.cy.js`
- `edit.cy.js`
- `filter.cy.js`

You can run them one by one, test order doesn't matter. When you finish with one test - click "Specs" icon to see 
the list of the tests again

### To run tests in the console

Run all tests:
- `npm run cy:run`

Run only high-priority tests:
- `npm run cy:run-high-priority`

Run only medium-priority tests:
- `npm run cy:run-medium-priority`

If you want to see the report, open `cypress/reports/html/index.html` file

## Things to improve

- Currently, some of my commands operate by task name for better readability. However, if tasks have identical names, 
this could cause issues. I plan to refactor these commands to support both name and index. By default, they will use text, 
but if necessary, I could switch to index-based operation. These changes would apply to the following commands:
  - `verifySingleTaskState`
  - `verifyAllTasksState`
  - `deleteTask`
  - `editTask`
  - `completeTask`
  - `activateTask`


- The `deleteTask` command is currently flaky because of the `.realHover` method. This method is meant to simulate 
how a user hovers to reveal the delete icon, but it doesn't always work consistently. I could use a force-click to bypass this, 
but that might miss a bug where the delete icon doesn’t appear for the user. I need to find a better solution to test this scenario reliably. 
**If this test fails when you run it, please just rerun it.**


- It'd be useful to have commands for completing, activating, and verifying multiple tasks, but not all. While it's not 
necessary at the moment, these commands could become valuable if our tests become more complex in the future.