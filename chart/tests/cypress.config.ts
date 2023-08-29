import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    videoCompression: false,
    env: {
      url: "https://tempo.bigbang.dev"
    },
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});