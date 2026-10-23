/**
 * Length bounds for titles and descriptions. Separate from `seo.ts` so the content schema can use
 * them without importing the site config.
 */

/** Google truncates by pixel width (about 600px); these bounds keep titles whole on mobile. */
export const TITLE_MIN = 30;
export const TITLE_MAX = 65;
/** Snippets are cut around 160 characters; below 70 there is too little to choose from. */
export const DESCRIPTION_MIN = 70;
export const DESCRIPTION_MAX = 160;
