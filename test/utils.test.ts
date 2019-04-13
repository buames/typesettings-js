import test from 'ava';
import { config } from './fixtures/b';
import {
  getFontStack,
  getValue,
  normalizeFamily,
  parseSize,
  px,
} from '../src/utils';

test('getValue()', (t) => {
  t.is(getValue(config, 'foo'), null, 'Should return null');
  t.is(getValue(config, 'family'), 'Helvetica', 'Should return a value');
  t.is(getValue(config, 'variants.0.fontStyle'), 'italic', 'Should return a nested value');
  t.deepEqual(getValue<string[]>(config, 'variants.0.sources.locals'), ['Helvetica Regular', 'Helvetica-Regular'], 'Should return a nested array');
  t.truthy(Array.isArray(getValue(config, 'variants')), 'Should return an array of objects');
});

test('getFontStack()', (t) => {
  t.is(getFontStack('Helvetica'), 'Helvetica', 'Should return a font stack without fallbacks and no quotes');
  t.is(getFontStack('Helvetica', ['Arial']), 'Helvetica, Arial', 'Should return a font stack with fallbacks and no quotes');
  t.is(getFontStack('Helvetica Neue', ['Arial', 'Comic Sans']), '\'Helvetica Neue\', Arial, \'Comic Sans\'', 'Should return a font stack with fallbacks and quotes');
});

test('px()', (t) => {
  t.is(px(8), '8px', 'Should convert value to pixels');
  t.is(px('8px'), '8px', 'Should convert value to pixels');
  t.is(px('8em'), '8em', 'Should not convert value to pixels');
});

test('parseSize()', (t) => {
  t.is(parseSize('12'), '12', 'Should return the size when given a size without a unit');
  t.is(parseSize('12px'), '12', 'Should return the size when given a size with a unit');
  t.is(parseSize('s12'), 's12', 'Should return the given value when there is no unit matched');
  t.is(parseSize(12), 12, 'Should return the given value when the value is not a string');
});

test('normalizeFamily()', (t) => {
  t.is(normalizeFamily('Helvetica'), 'Helvetica', 'Should return a family name without quotes');
  t.is(normalizeFamily('Helvetica, -apple-system, BlinkMacSystemFont'), '\'Helvetica, -apple-system, BlinkMacSystemFont\'', 'Should return a family name without quotes');
  t.is(normalizeFamily('Helvetica Neue'), '\'Helvetica Neue\'', 'Should return a family name with quotes');
  t.is(normalizeFamily('Helvetica Neue, Comic Sans'), '\'Helvetica Neue, Comic Sans\'', 'Should return a family name with quotes');
});
