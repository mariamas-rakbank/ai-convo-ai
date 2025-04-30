const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Conversational AI - APIs Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: "https://rakbank-digital-assistant-genai.azurewebsites.net/",
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      config.fixturesFolder = "cypress/fixtures"; 
      config.specPattern = 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'; 


      on('before:run', details => {
        reporter?.writeEnvironmentInfo({
          info: {
            os: details.system.osName,
            osVersion: details.system.osVersion,
            ...config.env
          },
        }); 
  
        reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' });
      });
      
      return config;
    },
  },
});