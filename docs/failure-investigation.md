# UI-04 controlled failure investigation

I deliberately changed one Cypress expectation on `evidence/controlled-ui04-failure` to test CI's failure reporting and artifact capture. This was a portfolio exercise. The demo code stayed the same, and the failing commit was never merged into `main`.

| Run | Commit | Result |
| --- | --- | --- |
| [Controlled failure](https://github.com/EugeneM321/tournament-qa-portfolio/actions/runs/45414758350) | `d59367a` | UI-04 failed, the other four Cypress tests passed, and Newman passed. CI exited with code 1. |
| [Passing retest](https://github.com/EugeneM321/tournament-qa-portfolio/actions/runs/45415146548) | `a4f8edb` | UI-04 and the other four Cypress tests passed. Newman passed all 87 assertions. |

## From failure to fix

1. **What failed.** UI-04 submitted `100–1` and reached the visible North Owls field error. Cypress reported `Timed out retrying after 4000ms` at the text assertion. The assertion expected “North Owls: Enter a whole number from 0 to 98.” The page showed “North Owls: Enter a whole number from 0 to 99.”
2. **Evidence.** The [CI artifact](https://github.com/EugeneM321/tournament-qa-portfolio/actions/runs/45414758350/artifacts/14932201703) contains a Cypress screenshot and the demo startup log. The [saved screenshot](evidence/ui-04-controlled-failure.png) shows both the assertion mismatch and the visible error alongside the preserved `2–1` result.
3. **Diagnosis and retest.** The screenshot matched the approved 0–99 rule. The failing comparison came from the deliberate `98` expectation, and the test stopped at that comparison. I restored the expected value to `99` and reran the same workflow. The retest passed the validation and the subsequent saved-result and standings checks after reload.

## How to classify a failure

| Type | Where the evidence points |
| --- | --- |
| Product defect | The application violates a requirement, such as saving an out-of-range score. |
| Automation defect | The test expectation or setup is wrong, as in this exercise. |
| Environment or infrastructure failure | A dependency or runner prevents execution, such as the [initial browser connection blocker](test-runs/2026-11-24-step-2.md#initial-execution). |
