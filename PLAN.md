# PLAN – Wiki Sprint Champion Development Roadmap

## Milestone 1 – Core Engine & Navigation (Done)
- **Goal**: Implement the minimal playable game.
- **Files**: `src/models.js`, `src/mwApi.js`, `src/score.js`, `src/engine.js`, `src/ui/main.js`, `src/ui/styles.css`, `index.html`, `README.md`.
- **Acceptance Criteria**:
  - Opening `index.html` (or the GitHub Pages URL) shows a header with a **Reset** button and a **Score** display.
  - A random start article title, summary, and outbound links are displayed.
  - Clicking a link loads the next article, updates the score, and persists state.
  - When the current article equals the target article, an alert shows the final score.
  - The **Reset** button restarts the game with new start/target articles.

## Milestone 2 – Reset & Persistent State (next)
- Add a proper reset implementation and ensure state persists across page reloads.

## Milestone 3 – Scoring Enhancements (future)
- Add category and reference bonuses, repair bonus, etc.

## Milestone 4 – Leaderboard (future)
- Store top scores in `localStorage` and display a leaderboard panel.

## Milestone 5 – Search‑Assist (future)
- Suggest the best next link based on category overlap.

## Milestone 6 – Template Quest (future)
- Implement a quest system with progress bar and bonus.

## Milestone 7 – Audio Feedback (future)
- Add success/error sounds and a toggle.

## Milestone 8 – Responsive & Accessible UI (ongoing)
- Ensure mobile‑friendly layout, keyboard navigation, ARIA live regions.

## Milestone 9 – Automated Tests & CI (ongoing)
- Add Jest tests for engine, scoring, and future modules; set up GitHub Actions.
