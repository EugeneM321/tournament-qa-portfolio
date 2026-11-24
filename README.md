# Tournament QA Portfolio

This project shows how a QA engineer turns tournament scoring risks into a test strategy, manual coverage, and a plan for API checks, Cypress regression tests, and CI.

It is an independent portfolio implementation using synthetic data only. The QA planning artifacts document the requirements, risks, and test coverage.

- [Test strategy](docs/test-strategy.md)
- [Scope and requirements](docs/scope-and-requirements.md)
- [12 manual test cases](docs/manual-test-cases.md)
- [Risk and traceability](docs/risk-and-traceability.md)

## Run the local demo

From the repository root, run `node demo/server.mjs` with Node.js 20 or newer, then open <http://127.0.0.1:3000>. The demo starts as Viewer with North Owls leading River Foxes 2–1. Select Organizer and apply the role to publish a score. Open Standings to see the points. Use **Reset demo to seeded state** to restore the 2–1 result and Viewer role.

The role selector simulates permissions for local testing. The score is shared across tabs in one server process and resets when the process restarts. The demo uses Node's built-in HTTP server and needs no dependencies.

## Run the API checks

Install the locked development dependencies once with `npm ci`. From the repository root, run:

```sh
npm run test:api
```

The command starts a fresh demo on an available loopback port, runs the [Postman collection](api/postman/tournament.collection.json) in Newman, and stops the demo afterward. Each scenario resets the match and Viewer role. Organizer scenarios switch roles through the demo form, with Newman carrying the returned cookie. Writes are checked for their HTTP status and then verified with separate reads of Match and Standings. These endpoints return HTML.

The collection covers the seeded result (A01), a denied Viewer update (A02), a valid Organizer update (A03), and invalid scores that leave stored state intact (A04, linked to [R-03 and M05](docs/risk-and-traceability.md#flagship-traceability)).

## Run the UI checks

Use Node.js 20.1+ (20.x), 22.x, or 24+. Run `npm ci` and, if the Cypress desktop binary was skipped, run `npx cypress install`. Start the demo with `node demo/server.mjs`. In a separate terminal, run `npm run test:ui` to run all five Cypress specs, or run one spec by passing its path:

```sh
npm run test:ui -- --spec cypress/e2e/ui-04-reject-invalid-score.cy.js
```

Cypress resets its browser context and sends `POST /reset` before each test to restore the seeded score and Viewer role. Use a dedicated local demo instance because the app's in-memory score is shared across clients. Score submissions, navigation, reloads, and assertions all use the browser UI. See [UI-04](cypress/e2e/ui-04-reject-invalid-score.cy.js) for the browser regression tied to R-03, M05, and A04.
