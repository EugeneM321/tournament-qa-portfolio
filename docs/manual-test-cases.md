# Manual test cases

All cases are planned. Start each case from the seeded North Owls 2–1 River Foxes result unless the procedure specifies a change.

| ID | Requirement | Role and procedure | Expected result |
| --- | --- | --- | --- |
| M01 | R-01 | Open the seeded match as Viewer. | Both teams, 2–1, and the published result status appear. |
| M02 | R-02 | Open the match as Viewer and inspect the available controls. | The result is visible and the publish control is absent. |
| M03 | R-02 | As Viewer, attempt to publish 1–2 through the planned local demo API. Read back the result and standings. | The request is rejected. The 2–1 result and original standings remain. |
| M04 | R-04 | As Organizer, publish 1–2. Open the standings. | The match shows 1–2. River Foxes have three points and North Owls have zero. |
| M05 | R-03 | As Organizer, note the saved 2–1 result and standings. Enter 100–1 and submit. Reload the match and standings views. | Validation identifies the above-limit field. The saved score remains 2–1 and standings remain North Owls three points, River Foxes zero. |
| M06 | R-03 | As Organizer, submit −1–1 (home score −1, away score 1). | The negative value is rejected and the saved result stays 2–1. |
| M07 | R-03 | As Organizer, submit 1.5–1. | The fractional value is rejected and the saved result stays 2–1. |
| M08 | R-03 | As Organizer, clear the home score and submit. | Feedback identifies the required home field and the saved score stays 2–1. |
| M09 | R-04 | As Organizer, publish home 0 and away 99. | Both boundary values are accepted and the saved score is 0–99. |
| M10 | R-04 | As Organizer, publish 1–2, open standings, then reload. | Standings still match 1–2 and award River Foxes three points. |
| M11 | R-04 | As Organizer, publish 1–2 twice. | Standings reflect one match result, with one River Foxes win and three points. |
| M12 | R-05 | As Organizer, use only the keyboard to navigate the score form and attempt to submit invalid input. | Controls are reachable in a logical order and the invalid field and feedback are discoverable by keyboard. |
