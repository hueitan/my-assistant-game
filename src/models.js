// Data models for the WikiSprint game (JSDoc style)
/**
 * @typedef {Object} Article
 * @property {string} title
 * @property {number} pageId
 * @property {string} extract
 * @property {string} url
 * @property {Link[]} links
 * @property {Category[]} categories
 * @property {Reference[]} references
 */
/**
 * @typedef {Object} Link
 * @property {string} title
 */
/**
 * @typedef {Object} Category
 * @property {string} title
 */
/**
 * @typedef {Object} Reference
 * @property {string} href
 * @property {string} title
 * @property {string} [thumbnail]
 */
/**
 * @typedef {Object} Revision
 * @property {number} revid
 * @property {string} timestamp
 * @property {string} user
 * @property {string} comment
 */
/**
 * @typedef {Object} Proposal
 * @property {string} sourceTitle
 * @property {string} targetTitle
 * @property {number} timestamp
 */
/**
 * @typedef {Object} PlayerState
 * @property {string} startTitle
 * @property {string} targetTitle
 * @property {string[]} path
 * @property {Proposal[]} proposals
 * @property {number} score
 * @property {number} startTime
 * @property {number} elapsed
 */
