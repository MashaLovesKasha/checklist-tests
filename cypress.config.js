const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://todomvc.com/examples/react/dist/#',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)
    }
  },
})