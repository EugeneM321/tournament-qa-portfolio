# Tournament QA Portfolio

[![Tournament QA CI](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml/badge.svg?branch=main)](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml?query=branch%3Amain)

This independent portfolio uses a small tournament scoring demo to show how a release risk becomes a manual test, a Postman/Newman form and HTML HTTP check, a Cypress regression, and CI evidence. All data is synthetic.

**Flagship risk:** An invalid 100–1 score must be rejected and leave the previously saved 2–1 result and standings unchanged. Postman/Newman checks the saved state through the API. Cypress with JavaScript checks the rejection and unchanged result in the browser.

## Verified results

| Verification | Result |
| --- | --- |
| Manual | 12 Pass, 0 Fail, 0 Blocked |
| Newman | 49 requests, 181 assertions, 0 failures locally. The previous main CI run verified 31 requests and 87 assertions. |
| Cypress | 5 passed in the previous main CI run. The branch adds keyboard validation. Local Cypress execution was blocked at runner startup. |
| CI | Passing on `main` |

## Quick start

Use Node.js 24 from the repository root.

```sh
npm ci
npm run test:api
```

Newman starts and stops its own demo, resets each scenario, and verifies the saved result and standings through separate HTTP reads. It submits URL-encoded forms and checks status, redirects, content type, visible text, and standings cell values. Coverage includes accepted limits, draws, and repeated publication. Cypress also checks that keyboard submission focuses the invalid field and links it to visible error feedback.

For API-only use in a POSIX shell, install dependencies without downloading the Cypress binary with `CYPRESS_INSTALL_BINARY=0 npm ci`. You can run Newman immediately afterward.

For browser testing, start the demo and leave it running on port 3000.

```sh
node demo/server.mjs
```

Open <http://127.0.0.1:3000> to try the seeded match. Apply the Organizer role to submit a score. **Reset demo to seeded state** restores the original result and Viewer role.

From another terminal, run Cypress. If the desktop binary is missing, first run `npx cypress install`.

```sh
npm run test:ui
```

Cypress resets the demo before each case. Run just the invalid-score regression with `npm run test:ui -- --spec cypress/e2e/ui-04-reject-invalid-score.cy.js`.

The pull-request and main-branch workflow publishes JUnit reports and a job summary. Cypress failure evidence includes screenshots and the demo log.

## Quick Review

| Time | Evidence |
| --- | --- |
| 1 minute | [Test strategy](docs/test-strategy.md), [12 manual cases](docs/manual-test-cases.md), and the [completed manual run](docs/test-runs/2026-11-24-step-2.md#browser-rerun) |
| 1 minute | [R-03 → M05 → A04 → UI-04](docs/risk-and-traceability.md#flagship-traceability). Follow an invalid score through manual, API, and browser coverage. |
| 1 minute | [Postman/Newman collection](api/postman/tournament.collection.json), [Cypress UI-04 spec](cypress/e2e/ui-04-reject-invalid-score.cy.js), and [GitHub Actions workflow](.github/workflows/qa.yml) |
| 1 minute | [Failure investigation](docs/failure-investigation.md). See the controlled assertion failure, Cypress screenshot, and passing retest. |

The demo, test strategy, manual cases, automation, and CI were created for this independent synthetic portfolio.
