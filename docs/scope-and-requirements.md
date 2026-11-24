# Scope and requirements

The planned demo has one tournament, two fictional teams (North Owls and River Foxes), and one match with a seeded result of 2–1. A tournament groups the teams and match. A match identifies the two participants and their current result. A score is the pair of values saved for that match. Standings show each team's win, draw, and loss counts and points, derived from the saved result.

| Role | Permissions |
| --- | --- |
| Viewer | View the match result and standings. |
| Organizer | View the match result and standings and publish a replacement score. |

The demo uses locally selected synthetic roles, two views (match and standings), and resettable seeded state. A valid score contains two required whole numbers, each from 0 through 99 inclusive. Ties are valid. A win earns three points, a draw earns one point per team, and a loss earns zero. Republishing replaces the previous result for the same match.

| ID | Requirement |
| --- | --- |
| R-01 | The match view shows both teams, the saved score, and result status. Both roles can view the result and standings. |
| R-02 | Only the Organizer can publish scores. A Viewer has no publish control and a Viewer update request is rejected without a state change. |
| R-03 | An invalid score is rejected without changing the last saved result or the standings. The Organizer receives validation feedback identifying the invalid or missing field. |
| R-04 | Valid publication replaces the saved result and recalculates standings once. The match and standings reflect the saved result after reload. |
| R-05 | The Organizer can navigate the score form by keyboard and locate validation feedback after rejection. |
