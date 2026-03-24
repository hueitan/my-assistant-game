/** Bonus for categories visited */
export function categoryBonus(categories) {
  let bonus = categories.length * 5;
  if (categories.some(c => c.title.includes("Featured articles"))) bonus += 10;
  return bonus;
}

/** Bonus for references */
export function referenceBonus(refs) {
  const reliable = [/\.gov/, /\.edu/, /\.org/];
  return refs.reduce((sum, r) => {
    const extra = reliable.some(re => re.test(r.href)) ? 5 : 0;
    return sum + 3 + extra;
  }, 0);
}

/** Bonus for repairing a vandalized page */
export function repairBonus() {
  return 15;
}

/** Bonus for proposing a new link */
export function linkCreationBonus() {
  return 8;
}

/** Bonus for completing a template quest */
export function templateQuestBonus() {
  return 12;
}
