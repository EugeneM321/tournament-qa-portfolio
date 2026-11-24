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
