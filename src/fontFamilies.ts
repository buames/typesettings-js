import { FontFamilyProperty } from 'csstype';

const genericFamilyKeywords = [
  'initial',
  'inherit',
  'unset',
  'serif',
  'sans-serif',
  'cursive',
  'fantasy',
  'monospace',
  'system-ui',
];

/**
 * Checks whether or not a font family name is a generic font family keyword
 *
 * When a generic family keyword keyword is wrapped in quotes, the browser will not interpret
 * them as keywords. Instead it looks for a font by that name (e.g. "sans-serif" font),
 * which is likley not what you actually want.
 *
 * @see https://mathiasbynens.be/notes/unquoted-font-family
 */
const isKeyword = (family: FontFamilyProperty) => {
  return genericFamilyKeywords.includes(family.toLowerCase());
};

/**
 * Checks whether or not a font family name is a vendor prefixed system font
 *
 * Quotes should never be used around vendor prefixed system fonts since the browser
 * will not interpret them as keywords
 */
const isSystemFont = (family: FontFamilyProperty) => {
  return family.startsWith('-apple-') || family === 'BlinkMacSystemFont';
};

/**
 * Checks whether or not a font family name should be wrapped in quotes
 *
 * It is recommended to quote font family names that contain white space, digits, or
 * punctuation characters other than hyphens.
 *
 * @see https://www.w3.org/TR/CSS2/fonts.html#font-family-prop
 */
const isCharactersOnly = (family: FontFamilyProperty) => {
  return /^[-a-zA-Z]+$/.test(family);
};

/**
 * Normalizes quotations for a given font family name or string of font family names.
 */
export const normalizeFontFamily = (value: FontFamilyProperty) => {
  return value
    .split(',')
    .map((raw: FontFamilyProperty) => {
      // Clean the family name, includes its quotes
      const family = raw.trim().replace(/^['"]|['"]$/g, '');

      if (
        isKeyword(family) ||
        isSystemFont(family) ||
        isCharactersOnly(family)
      ) {
        return family;
      }

      return `'${family}'`;
    }, [])
    .join(', ');
};

/**
 * Returns the font stack from a given family and array of fallbacks
 * */
export const getFontStack = (
  family: FontFamilyProperty,
  fallbacks?: FontFamilyProperty[],
) => {
  const stack = [
    normalizeFontFamily(family),
    fallbacks?.map(normalizeFontFamily).join(', '),
  ];

  return stack.filter(Boolean).join(', ');
};
