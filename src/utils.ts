import { FontFamilyProperty, FontSizeProperty } from 'csstype';
import { StyledValue, Typesettings } from './types';

/**
 * Converts a given value to a `pixel` unit
* */
export const px = (n: StyledValue) => (
  typeof n === 'number' && n !== 0 ? `${n}px` : n
);

/**
  * Parses a number and unit string, returning only the number used
* */
export const parseSize = (str: FontSizeProperty<StyledValue>) => {
  if (typeof str !== 'string') return str;

  const match = str.trim().match(/([\d.\-+]*)\s*(.*)/);
  return (match && match[1]) || str;
};

/**
  * Returns the font stack from a given family and array of fallbacks
* */
export const getFontStack = (family: FontFamilyProperty, fallbacks?: FontFamilyProperty[]) => ([
  normalizeFamily(family),
  fallbacks && (fallbacks.map(normalizeFamily).join(', ')),
].filter(Boolean).join(', '));

/**
  * Returns a value from a given Typesettings obj and a path to the value's key
* */
export const getValue = <T = StyledValue>(typesettings: Typesettings, ...paths: any[]): T => (
  paths.reduce((_, path) => {
    if (path in typesettings) return typesettings[path];
    return path.split('.').reduce((acc: any, key: string) => (
      acc && acc[key] ? acc[key] : null
    ), typesettings);
  }, null)
);

/**
  * Returns a normalized FontFamily name where names with
  * a space are automatically wrapped in quotes
* */
export const normalizeFamily = (family: FontFamilyProperty) => (
  /\s/g.test(family) ? `'${family}'` : family
);
