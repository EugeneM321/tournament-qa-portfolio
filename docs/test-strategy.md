# Test strategy

The first manual run will check the seeded tournament, role boundaries, score validation, and persistence across the match and standings views. Begin each case from the named fixture and role, except where the case explicitly depends on a mutation or replay within that case.

Prioritize unauthorized writes, invalid score rejection, and standings integrity. Smoke coverage includes opening the seeded match and publishing a valid result. Regression adds role restrictions, rejected scores, boundary values, repeated submission, and read-back after reload. Explore keyboard focus and the clarity of error feedback manually.

Record the build, environment, case ID, expected and actual result, outcome, and any defect link when the demo is available. The case matrix defines planned checks. An unauthorized update, corrupted standings, or failed smoke check would block a release review.

Planned Newman checks verify API behavior and independent read-back of saved state. Planned Cypress coverage verifies selected browser flows with stable inputs and objective outcomes. Keyboard navigation and feedback clarity stay in the manual pass. The flagship invalid-score check will tie both automation paths to CI evidence.
