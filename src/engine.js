import { getRandom, getSummary, getLinks, getCategories } from "./mwApi.js";
import { linkBonus } from "./score.js";

/** Simple event emitter used by WikiEngine */
class EventEmitter {
  constructor() { this.listeners = new Set(); }
  on(cb) { this.listeners.add(cb); }
  emit(data) { for (const cb of this.listeners) cb(data); }
}

/** WikiEngine – core game logic */
export class WikiEngine extends EventEmitter {
  constructor() {
    super();
    const saved = this._load();
    this.state = saved || this._newGameSync();
    // ensure state is persisted on start
    this._save();
  }

  /** Initialize a new game with random start/target */
  // NOTE: For the initial lightweight implementation we avoid async randomness
  // to keep the constructor simple and avoid a Promise in `this.state`.
  // The game will still load real data for the start article via the API.
  // You can replace the placeholders with `await getRandom()` calls in a future update.
  _newGameSync() {
    const startTitle = "Main Page";
    const targetTitle = "Computer";
    return {
      startTitle,
      targetTitle,
      path: [startTitle],
      score: 0,
      startTime: Date.now(),
      elapsed: 0
    };
  }

  _save() {
    localStorage.setItem('wikiEngineState', JSON.stringify(this.state));
  }

  _load() {
    const raw = localStorage.getItem('wikiEngineState');
    return raw ? JSON.parse(raw) : null;
  }

  /** Load data for the current article (last in path) */
  async loadCurrent() {
    const title = this.state.path[this.state.path.length - 1];
    const [summary, links, categories] = await Promise.all([
      getSummary(title),
      getLinks(title),
      getCategories(title)
    ]);
    return { summary, links, categories };
  }

  /** Navigate to a linked article */
  async selectLink(linkTitle) {
    this.state.path.push(linkTitle);
    this.state.score += linkBonus();
    this._save();
    this.emit(this.state);
    // win detection
    if (linkTitle === this.state.targetTitle) {
      this.emit({ ...this.state, won: true });
    }
  }

  /** Reset the game */
  async reset() {
    this.state = this._newGameSync();
    this._save();
    this.emit(this.state);
  }
}
