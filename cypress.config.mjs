import { defineConfig } from 'cypress'

export default defineConfig({
  ...(process.env.QA_REPORT_DIR && {
    reporter: 'junit',
    reporterOptions: { mochaFile: process.env.QA_REPORT_DIR + '/cypress-[hash].xml', toConsole: true },
  }),
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    testIsolation: true,
  },
})
