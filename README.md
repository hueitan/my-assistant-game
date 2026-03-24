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

## Architecture
- **src/models.js** – data‑model definitions for Article, Link, Category, Reference, Revision, Proposal, PlayerState.
- **src/mwApi.js** – thin wrapper around MediaWiki REST endpoints (`summary`, `links`, `categories`, `references`, `opensearch`, `random`).
- **src/engine.js** – `WikiEngine` class handling game state, navigation, link proposals, scoring, and persistence via `localStorage`.
- **src/score.js** – functions that compute bonuses for categories, references, repairs, link creation, and template quests.
- **src/graph.js** – simple SVG renderer that visualises the visited path as a graph.
- **src/search.js** – search‑as‑you‑type helper using the `opensearch` API.
- **src/designer.css** – Codex‑styled badge and UI component definitions (provided by the Designer sub‑agent).
- **src/prototypes.html** – high‑fidelity UI mockups for Add‑Link modal, Graph side‑panel, Template Quest overlay, and tutorial flow.
- **test/** – Jest integration tests for the engine and new features.

## Getting Started
```bash
# clone the repo (already done)
npm install   # if you want to run tests; otherwise just open index.html
npm test      # runs Jest test suite
```
Open `index.html` in a modern browser. The page loads the engine, fetches a random start/target, and renders the UI (designer prototypes). Use the link list to navigate, propose new links via the modal, and watch your score increase.

## Development
- **Add Link API** – call `engine.proposeLink(sourceTitle, targetTitle)`; the engine records the proposal and adds `+8` points.
- **Graph view** – call `renderGraph(container, nodes, edges)` with data from `engine.getGraphData()`.
- **Search** – use `search(query)` to suggest article titles as the user types.
- **Scoring** – bonuses are defined in `src/score.js`. You can adjust the values as needed.

## License
MIT © Your Name
