# Wiki Sprint Champion

A browser‑only game that turns Wikipedia navigation into a competitive challenge.

## Overview
Players start on a random Wikipedia article and must reach a target article **using only internal links**. Points are awarded for:
- Shortest path (fewest clicks)
- Visiting valuable **categories**
- Clicking high‑quality **references**
- **Repairing** pages flagged as vandalized
- **Proposing** new links (link‑creation bonus)
- Completing **template quests** (infobox field checklists)

The game runs entirely in the browser, using the public MediaWiki REST API.

## New Features
- **Leaderboard** – Persistent local leaderboard with name entry, score, and timestamp.
- **Search‑Assist** – Sidebar that suggests the best next link based on category overlap.
- **Template Quest** – Dynamic progress bar, confetti celebration, and bonus when all quest fields are collected.
- **Audio Feedback** – Success and error beeps with a header toggle to enable/disable.
- **Add‑Link Modal** – Autocomplete search to propose new links (+8 points).
- **Graph View** – SVG visualization of the traversal path.
- **Responsive, Codex‑styled UI** – Mobile‑friendly layout, dark‑mode support, and WCAG‑AA accessible components.

## Architecture
- **src/models.js** – Data‑model definitions for Article, Link, Category, Reference, Revision, Proposal, PlayerState (includes quest progress).
- **src/mwApi.js** – Thin wrapper around MediaWiki REST endpoints (`summary`, `links`, `categories`, `references`, `opensearch`, `random`).
- **src/engine.js** – `WikiEngine` class handling game state, navigation, link proposals, scoring, quest checking, leaderboard integration, and audio cues.
- **src/score.js** – Bonus calculations for categories, references, repairs, link creation, and template quests.
- **src/leaderboard.js** – LocalStorage‑based leaderboard utilities.
- **src/searchAssist.js** – Category‑overlap link suggestion.
- **src/templateQuestManager.js** – Quest definition, progress tracking, and bonus handling.
- **src/audio.js** – Simple Web Audio API tones.
- **src/ui/** – UI components built with Codex: main entry, Add‑Link modal, Leaderboard panel, Search‑Assist sidebar, Template Quest UI, Graph view, Audio toggle, and tutorial flow.
- **src/ui/uiExtras.css** – Additional styling for progress bar, confetti, and toggle.
- **test/** – Jest test suite covering engine, leaderboard, and search‑assist logic.

## How to Play
1. Open `index.html` in a modern browser.
2. The engine selects a random start and target article.
3. Use the link buttons to navigate toward the target.
4. Click **Add Link** to propose new connections (adds points).
5. Watch the **Search Assist** sidebar for the recommended next step.
6. Complete the **Template Quest** by visiting articles that contain the required keywords.
7. When you reach the target, enter your name to record the score on the leaderboard.
8. Use the **Audio** toggle in the header to enable/disable sound feedback.

## Development
- **Install dependencies** (if you want to run tests):
```bash
npm install jest
```
- **Run tests**:
```bash
npm test
```
- **Local development** – edit files under `src/` and refresh the page.

## License
MIT © Your Name
