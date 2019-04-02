import { FontFamilyProperty } from 'csstype';
import { StyledValue } from './types';

/*
  Returns a normalized FontFamily name where names with
  a space are automatically wrapped in quotes
*/
export const getFamilyName = (family: FontFamilyProperty) => (
  /\s/g.test(family) ? `'${ family }'` : family
);

/*
  Returns the font stack
*/
export const getFontStack = (family: FontFamilyProperty, fallbacks?: FontFamilyProperty[]) => ([
  getFamilyName(family),
  fallbacks && fallbacks.map(getFamilyName)
].filter(Boolean).join(', '));

/*
  Parses a number and unit string and returns the size
*/
export const parseSize = (str: StyledValue) => {
  if (typeof str !== 'string') return str;

  const match = str.trim().match(/([\d.\-+]*)\s*(.*)/);
  return match && match[1] || str;
};
