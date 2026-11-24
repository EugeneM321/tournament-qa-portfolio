# Risk and traceability

| Risk | Impact | Requirement | Manual coverage |
| --- | --- | --- | --- |
| Incorrect match details or status | High | R-01 | M01 |
| Unauthorized result publication | Critical | R-02 | M02, M03 |
| Invalid input corrupts the result or standings | Critical | R-03 | M05–M08 |
| Valid updates, reloads, or repeats produce inconsistent standings | High | R-04 | M04, M09–M11 |
| Keyboard users lose access to validation feedback | Medium | R-05 | M12 |

## Flagship traceability

**R-03 → M05 → planned API A04 → planned Cypress UI-04 → planned CI evidence**

1. **Requirement and risk:** Reject scores outside 0–99 without changing the saved result or standings. A visible rejection could mask an unintended state change.
2. **Manual M05:** Record the seeded score and standings, submit 100–1 as Organizer, verify field feedback, and compare both views after reload.
3. **Planned API A04:** Send the invalid score to the local demo API, assert rejection, and independently read back the result and standings for comparison.
4. **Planned Cypress UI-04:** Exercise the score form and verify both the visible validation and the preserved score and standings after reload.
5. **Planned CI evidence:** Link to the Newman and Cypress results when CI exists. A controlled failure walkthrough will point to the relevant assertion, artifact, and passing retest.
