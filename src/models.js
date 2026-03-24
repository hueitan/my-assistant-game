/**
 * Data model definitions for Wiki Sprint Champion.
 * These are JSDoc type annotations used for documentation.
 */

/**
 * @typedef {Object} Article
 * @property {string} title
 * @property {string} extract
 * @property {Link[]} links
 * @property {Category[]} categories
 */

/** @typedef {Object} Link @property {string} title */
/** @typedef {Object} Category @property {string} title */

/**
 * @typedef {Object} PlayerState
 * @property {string} startTitle
 * @property {string} targetTitle
 * @property {string[]} path               // visited article titles
 * @property {number} score
 * @property {number} startTime           // epoch ms
 * @property {number} elapsed
 */
