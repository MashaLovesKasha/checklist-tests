const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://todomvc.com/examples/react/dist/#/',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}"
  },
})