import { getRandom, getSummary, getLinks, getCategories, getReferences, isVandalized } from "./mwApi.js";
import { categoryBonus, referenceBonus, repairBonus, linkCreationBonus, templateQuestBonus } from "./score.js";

/** Simple event emitter */
class EventEmitter {
  constructor() { this.listeners = new Set(); }
  on(cb) { this.listeners.add(cb); }
  emit(data) { for (const cb of this.listeners) cb(data); }
}

export class WikiEngine extends EventEmitter {
  constructor() {
    super();
    const saved = this._load();
    this.state = saved || this._newGame();
  }

  async _newGame() {
    const startTitle = await getRandom();
    const targetTitle = await getRandom();
    const now = Date.now();
    const state = {
      startTitle,
      targetTitle,
      path: [startTitle],
      proposals: [],
      score: 0,
      startTime: now,
      elapsed: 0
    };
    this._save(state);
    return state;
  }

  _save(state) { localStorage.setItem("wikiEngineState", JSON.stringify(state)); }
  _load() { const s = localStorage.getItem("wikiEngineState"); return s ? JSON.parse(s) : null; }

  async loadCurrent() {
    const title = this.state.path[this.state.path.length - 1];
    const [summary, links, categories, refs, vandal] = await Promise.all([
      getSummary(title),
      getLinks(title),
      getCategories(title),
      getReferences(title),
      isVandalized(title)
    ]);
    return { summary, links, categories, refs, vandal };
  }

  async selectLink(linkTitle, options = {}) {
    const { isProposed = false } = options;
    this.state.path.push(linkTitle);
    // compute bonuses based on previous article (now we have left it)
    const prev = await this.loadCurrent();
    this.state.score += categoryBonus(prev.categories);
    this.state.score += referenceBonus(prev.refs);
    if (prev.vandal) this.state.score += repairBonus();
    if (isProposed) this.state.score += linkCreationBonus();
    this._save(this.state);
    this.emit(this.state);
    if (linkTitle === this.state.targetTitle) {
      this.emit({ ...this.state, won: true });
    }
  }

  async proposeLink(sourceTitle, targetTitle) {
    const current = this.state.path[this.state.path.length - 1];
    if (sourceTitle !== current) throw new Error("Source must be the current article");
    const proposal = { sourceTitle, targetTitle, timestamp: Date.now() };
    this.state.proposals.push(proposal);
    this.state.score += linkCreationBonus();
    this._save(this.state);
    this.emit(this.state);
  }

  getGraphData() {
    const nodes = this.state.path.map((title, idx) => ({ title, visited: true, index: idx }));
    const edges = [];
    for (let i = 0; i < this.state.path.length - 1; i++) {
      edges.push({ source: this.state.path[i], target: this.state.path[i + 1] });
    }
    return { nodes, edges };
  }

  async reset() {
    this.state = await this._newGame();
    this.emit(this.state);
  }

  get elapsed() { return Date.now() - this.state.startTime; }
}
