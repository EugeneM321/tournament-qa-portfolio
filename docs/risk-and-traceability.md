# Risk and traceability

| Risk | Impact | Requirement | Manual coverage |
| --- | --- | --- | --- |
| Incorrect match details or status | High | R-01 | M01 |
| Unauthorized result publication | Critical | R-02 | M02, M03 |
| Invalid input corrupts the result or standings | Critical | R-03 | M05–M08 |
| Valid updates, reloads, or repeats produce inconsistent standings | High | R-04 | M04, M09–M11 |
| Keyboard users lose access to validation feedback | Medium | R-05 | M12 |

## Flagship traceability

**R-03 → M05 → API A04 → Cypress UI-04 → planned CI evidence**

1. **Requirement and risk:** Reject scores outside 0–99 without changing the saved result or standings. A visible rejection could mask an unintended state change.
2. **Manual M05:** Record the seeded score and standings, submit 100–1 as Organizer, verify field feedback, and compare both views after reload.
3. **API A04:** The [Postman collection](../api/postman/tournament.collection.json) verifies field-level rejection and independently reads the saved result and standings after each invalid submission. It includes the M05 score of 100–1.
4. **Cypress UI-04:** The [browser spec](../cypress/e2e/ui-04-reject-invalid-score.cy.js) submits 100–1 as Organizer, checks visible field validation, and verifies the saved 2–1 score and unchanged standings after reload.
5. **Planned CI evidence:** Link to the Newman and Cypress results when CI exists. A controlled failure walkthrough will point to the relevant assertion, artifact, and passing retest.
