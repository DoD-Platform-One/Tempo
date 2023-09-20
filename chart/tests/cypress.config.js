const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    env: {
      url: "https://tempo.bigbang.dev"
    },
    video: true,
    screenshot: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // Register the 'task' event
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      // implement other node event listeners here
    },
  },
})
