import { WikiEngine } from "../src/engine.js";
import * as mwApi from "../src/mwApi.js";

jest.mock("../src/mwApi.js", () => ({
  getRandom: jest.fn().mockResolvedValue("StartArticle"),
  getSummary: jest.fn().mockResolvedValue({ title: "StartArticle", extract: "" }),
  getLinks: jest.fn().mockResolvedValue([{ title: "NextArticle" }]),
  getCategories: jest.fn().mockResolvedValue([]),
  getReferences: jest.fn().mockResolvedValue([]),
  isVandalized: jest.fn().mockResolvedValue(false)
}));

test('proposeLink adds proposal and bonus', async () => {
  const engine = new WikiEngine();
  // initial state created with start article
  await engine.selectLink("NextArticle"); // move to next
  const beforeScore = engine.state.score;
  await engine.proposeLink("NextArticle", "SomeOther");
  expect(engine.state.proposals.length).toBe(1);
  expect(engine.state.score).toBe(beforeScore + 8); // linkCreationBonus
});
