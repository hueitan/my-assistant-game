# DESIGN.md – UI/UX Documentation

## Overview
The Wikipedia‑centric game now includes a full suite of interactive UI components built on MediaWiki’s **Codex** design system. All components are responsive, accessible, and integrate with the underlying `WikiEngine`.

## Components
| Component | File | Purpose |
|----------|------|---------|
| **Header** | `src/ui/main.js` (creates dynamically) | Shows Add Link, Tutorial, Audio toggle buttons, and the live score. |
| **Leaderboard Panel** | `src/ui/leaderboardPanel.js` | Collapsible Codex card displaying the top 10 scores with a refresh button and ARIA live updates. |
| **Search‑Assist Sidebar** | `src/ui/searchAssistPanel.js` | Suggests the next best link based on category overlap, shows a short description, and a “Go” button. Includes a loading spinner. |
| **Template Quest** | `src/ui/templateQuest.js` | Progress bar visualising quest completion, confetti animation on finish, and a `+12` badge. |
| **Audio Toggle** | `src/ui/audioToggle.js` | Switch in the header to enable/disable sound feedback; persists state in `localStorage`. |
| **Add‑Link Modal** | `src/ui/addLinkModal.js` | Autocomplete search (via `search.js`), proposal button, and success badge. |
| **Graph Panel** | `src/ui/graphPanel.js` | SVG visualisation of visited nodes and edges, updates on each navigation step. |

## Interaction Flow
1. **Start** – Engine creates a random start/target article; header shows score. 
2. **Navigate** – Click any link button; engine updates path, score, and fires events.
3. **Add Link** – Click *Add Link* → modal appears, search suggestions appear, proposal adds +8 points.
4. **Search Assist** – Sidebar constantly suggests the most promising next link.
5. **Template Quest** – As the player visits articles containing keywords (population, capital, area), the progress bar fills; on completion a confetti burst and `+12` badge appear.
6. **Leaderboard** – When the target is reached, a prompt asks for the player’s name; the score is stored and instantly appears in the leaderboard.
7. **Audio** – Success actions trigger a short beep (if enabled); errors trigger a low‑tone beep. The toggle persists across sessions.

## Accessibility
- All buttons have `aria-label`s describing their action.
- Score updates and leaderboard changes are announced via ARIA live regions.
- Keyboard navigation works for every interactive element (tab order, Enter to activate).
- The modal traps focus while open and restores focus on close.
- Contrast ratios for badge colours meet WCAG 2.1 AA.

## Styling
- Primary styling is provided by the MediaWiki **Codex** CSS.
- Custom badge colours and confetti animation are defined in `src/ui/uiExtras.css`.
- Dark‑mode support inherits Codex variables; the theme toggles via the existing dark‑mode button.

## Future Work
- Add multilingual support for search/labels.
- Persist leaderboard to a remote endpoint (optional).