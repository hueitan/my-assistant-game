# Wiki Sprint Champion

A browser‑only game that turns Wikipedia navigation into a competitive challenge.

## Overview
Players start on a random Wikipedia article and must reach a target article **using only internal links**. Points are awarded for each navigation step, and a simple alert notifies the player when the target is reached.

The game runs entirely in the browser, using the public MediaWiki REST API.

## Core Features
- Random start and target articles.
- Display of article title, summary, and outbound links.
- Click a link to navigate to the next article.
- Basic score (1 point per click).
- Win detection with an alert showing the final score.
- Reset button to start a new round.

## How to Play
1. Open `index.html` in a modern browser (or visit the GitHub Pages site).
2. The game will load a start article and a list of links.
3. Click a link to move to the next article; the score increments.
4. Continue clicking links until you reach the hidden target article – an alert will appear.
5. Use the **Reset** button to start a new round.

## Architecture
- **src/models.js** – data‑model definitions (Article, Link, Category, PlayerState).
- **src/mwApi.js** – thin wrapper around MediaWiki REST endpoints.
- **src/score.js** – scoring logic (currently a flat 1 point per navigation).
- **src/engine.js** – game engine handling state, navigation, win detection, and event emission.
- **src/ui/** – UI components built with MediaWiki Codex styles.
- **index.html** – loads the Codex stylesheet and the UI entry module.

## Development
- Run `npm test` to execute Jest tests (if added).
- Modify the source files under `src/` to extend functionality (leaderboard, quests, audio, etc.).

## License
MIT © Your Name
