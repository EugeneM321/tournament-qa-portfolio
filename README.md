# Tournament QA Portfolio

[![Tournament QA CI](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml/badge.svg?branch=main)](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml?query=branch%3Amain)

This independent portfolio uses a small tournament scoring demo to show how a release risk becomes a manual test, a Postman/Newman check, a Cypress regression, and CI evidence. All data is synthetic.

The test strategy and manual coverage were authored for this portfolio. The demo, Postman/Newman API tests, Cypress JavaScript tests, and GitHub Actions workflow were created for it.

## Quick Review

| Time | Evidence |
| --- | --- |
| 1 minute | [Test strategy](docs/test-strategy.md), [12 manual cases](docs/manual-test-cases.md), and the [completed manual run](docs/test-runs/2026-11-24-step-2.md#browser-rerun) |
| 1 minute | [R-03 → M05 → A04 → UI-04](docs/risk-and-traceability.md#flagship-traceability). Follow an invalid score through manual, API, and browser coverage. |
| 1 minute | [Postman/Newman collection](api/postman/tournament.collection.json), [Cypress UI-04 spec](cypress/e2e/ui-04-reject-invalid-score.cy.js), and [GitHub Actions workflow](.github/workflows/qa.yml) |
| 1 minute | [Failure investigation](docs/failure-investigation.md). See the controlled assertion failure, Cypress screenshot, and passing retest. |

| Verification | Result |
| --- | --- |
| Manual | 12 Pass, 0 Fail, 0 Blocked |
| Newman | 31 requests, 87 assertions, 0 failures |
| Cypress | 5 passed, 0 failed, 0 skipped |
| CI | Passing on `main` |

## Run locally

Use Node.js 24, the version used in CI. Run `npm ci` if you plan to run the test suites. If installation skipped the Cypress desktop binary, run `npx cypress install`.

- **Demo:** Run `node demo/server.mjs` and open <http://127.0.0.1:3000>. The seeded match starts at 2–1. Apply the Organizer role to publish a score. **Reset demo to seeded state** restores the result and Viewer role.
- **API:** Run `npm run test:api`. The runner starts and stops its own demo. Newman resets each scenario and verifies saved state through separate Match and Standings requests.
- **UI:** With the demo running on port 3000, run `npm run test:ui` in a separate terminal. Cypress resets the demo before each test. To run just the flagship regression, use `npm run test:ui -- --spec cypress/e2e/ui-04-reject-invalid-score.cy.js`.
