/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import { create } from './fixtures/a';
import {
  generateFontFace,
  generateFonts,
  getFontStack,
  getValue,
  normalizeFamily,
  parseSize,
  px,
} from '../src';

test('Should return @font-face declaration as a string', (t) => {
  const a = generateFontFace(create());
  t.truthy(typeof a === 'string');
});

test('Should return @font-face declaration as snapshots', (t) => {
  const a = generateFontFace(create({ family: 'Helvetica' }));
  t.snapshot(a, '@font-face declaration without the family wrapped in quotes');

  const b = generateFontFace(create({ family: 'Helvetica Neue' }));
  t.snapshot(b, '@font-face declaration with the family wrapped in quotes');

  const c = generateFontFace(create(), { fontFaceStyles: { fontDisplay: 'swap', MozFontFeatureSettings: '"tnum", "liga"' } });
  t.snapshot(c, '@font-face declaration with additional fontFace styles');
});

test('Should return font styles as an object', (t) => {
  const a = generateFonts(create());
  t.truthy(typeof a === 'object');
});

test('Should return font styles as snapshots', (t) => {
  const a = generateFonts(create());
  t.snapshot(a, 'Font styles as objects with fallback families');

  const b = generateFontFace(create({ fallbacks: undefined }));
  t.snapshot(b, 'Font styles as objects without fallback families');

  const c = generateFonts(create(), { fontStyles: { textRendering: 'optimizeLegibility' } });
  t.snapshot(c, 'Font styles with additional font styles');
});

test('Should return font-family without quotes', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontFamily, 'Helvetica, -apple-system, BlinkMacSystemFont');
});

test('Should return font-family without a fallback', (t) => {
  const a = generateFonts(create({ fallbacks: undefined }));
  t.is(a.s20.n500.fontFamily, 'Helvetica');
});

test('Should return font-family with quotes', (t) => {
  const a = generateFonts(create({ family: 'Helvetica Neue' }));
  t.is(a.s20.n500.fontFamily, '\'Helvetica Neue\', -apple-system, BlinkMacSystemFont');
});

test('Should return font-style as italic', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.i400.fontStyle, 'italic');
});

test('Should return font-style as normal', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.n400.fontStyle, 'normal');
});

test('Should return font-size in px', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontSize, '20px');
});

test('Should return font-size in rem', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.fontSize, '20rem');
});

test('Should return font-weight as a number', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontWeight, 500);
});

test('Should return font-weight as a string', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.fontWeight, 'bold');
});

test('Should return letter-spacing as initial', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.n400.letterSpacing, 'initial');
});

test('Should return letter-spacing in px', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.letterSpacing, '0.29px');
});

test('Should return letter-spacing in em', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.letterSpacing, '0.29em');
});

test('Should return line-height in px', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.lineHeight, '22px');
});

test('Should return line-height in em', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.lineHeight, '22em');
});

test('Should return line-height as normal', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_lower.lineHeight, 'normal');
});

test('Should return text-transform as undefined', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.textTransform, undefined);
});

test('Should return text-transform as uppercase', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_caps.textTransform, 'uppercase');
});

test('Should return text-transform as lowercase', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_lower.textTransform, 'lowercase');
});

test('getValue()', (t) => {
  const config = create();
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
  t.is(parseSize('12px'), '12', 'Should return the size when given a size with a px unit');
  t.is(parseSize('12em'), '12', 'Should return the size when given a size with an em unit');
  t.is(parseSize('s12'), 's12', 'Should return the given value when there is no unit matched');
  t.is(parseSize(12), 12, 'Should return the given value when the value is not a string');
});

test('normalizeFamily()', (t) => {
  t.is(normalizeFamily('Helvetica'), 'Helvetica', 'Should return a family name without quotes');
  t.is(normalizeFamily('Helvetica, -apple-system, BlinkMacSystemFont'), '\'Helvetica, -apple-system, BlinkMacSystemFont\'', 'Should return a family name without quotes');
  t.is(normalizeFamily('Helvetica Neue'), '\'Helvetica Neue\'', 'Should return a family name with quotes');
  t.is(normalizeFamily('Helvetica Neue, Comic Sans'), '\'Helvetica Neue, Comic Sans\'', 'Should return a family name with quotes');
});
