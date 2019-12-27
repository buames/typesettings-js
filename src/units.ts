import { FontSizeProperty } from 'csstype';
import { StyledValue } from './types';

/**
 * Converts a given value to a `pixel` unit
 * */
export const px = (n: StyledValue) =>
  typeof n === 'number' && n !== 0 ? `${n}px` : n;

/**
 * Parses a number and unit string, returning only the number used
 * */
export const parseSize = (str: FontSizeProperty<StyledValue>) => {
  if (typeof str !== 'string') return str;

  const match = str.trim().match(/([\d.\-+]*)\s*(.*)/);
  return (match && match[1]) || str;
};
