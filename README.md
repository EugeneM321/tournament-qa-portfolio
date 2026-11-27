# Tournament QA Portfolio

[![Tournament QA CI](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml/badge.svg?branch=main)](https://github.com/EugeneM321/tournament-qa-portfolio/actions/workflows/qa.yml?query=branch%3Amain)

An independent QA case study for a synthetic tournament scoring demo. An invalid score must leave the last saved match result and standings intact. Valid results must accept both inclusive boundaries, award the correct draw points, and avoid accumulating points when an organizer republishes the same score.

**How it is verified:** Postman/Newman submits URL-encoded forms, checks HTML responses, and independently reads the match and standings after writes. Cypress checks the same business risk in the browser. The keyboard scenario tabs to Publish, activates it with Space, checks HTTP 422, and verifies that focus moves to the field with its associated error. Roles are synthetic and state is in memory.

## Verified results

| Verification | Result |
| --- | --- |
| Manual | 12 Pass, 0 Fail, 0 Blocked |
| Newman | 49 requests, 181 passing assertions, 0 failures |
| Cypress | 6 specs passed on Ubuntu. Local Windows Cypress was blocked at runner startup. |
| CI | [Passing Ubuntu run on `main`](https://github.com/EugeneM321/tournament-qa-portfolio/actions/runs/46077658866) · JUnit reports |

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

| Start with | What to look for |
| --- | --- |
| [Postman/Newman collection](api/postman/tournament.collection.json) · [Risk traceability](docs/risk-and-traceability.md#flagship-traceability) | Independent read-back after invalid inputs, accepted score limits, draws, and repeated publication. |
| [Cypress UI-04](cypress/e2e/ui-04-reject-invalid-score.cy.js) · [Keyboard UI-06](cypress/e2e/ui-06-keyboard-validation.cy.js) | The invalid result leaves the saved score intact. Space activation returns HTTP 422 and focuses the invalid field. |
| [GitHub Actions workflow](.github/workflows/qa.yml) · [Controlled failure run](https://github.com/EugeneM321/tournament-qa-portfolio/actions/runs/46076125123) · [Failure investigation](docs/failure-investigation.md) | Follow JUnit output, screenshots, server logs, and the documented retest. |
| [Strategy](docs/test-strategy.md) · [12 manual cases](docs/manual-test-cases.md) · [Manual run](docs/test-runs/2026-11-24-step-2.md#browser-rerun) | Review risk coverage and the historical manual and browser execution record. |


The demo, test strategy, manual cases, automation, and CI were created for this independent synthetic portfolio.
