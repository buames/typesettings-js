/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import { create } from './fixtures/b';
import { generateFontFace, generateFonts } from '../src';

test('Should return @font-face declaration as a string', (t) => {
  const a = generateFontFace(create());
  t.truthy(typeof a === 'string');
});

test('Should return @font-face declaration as snapshots using generateFontFace()', (t) => {
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

test('Should return font styles as snapshots using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.snapshot(a, 'Font styles as objects with fallback families');

  const b = generateFontFace(create({ fallbacks: undefined }));
  t.snapshot(b, 'Font styles as objects without fallback families');

  const c = generateFonts(create(), { fontStyles: { textRendering: 'optimizeLegibility' } });
  t.snapshot(c, 'Font styles with additional font styles');
});

test('Should return font-family without quotes using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontFamily, 'Helvetica, -apple-system, BlinkMacSystemFont');
});

test('Should return font-family without a fallback using generateFonts()', (t) => {
  const a = generateFonts(create({ fallbacks: undefined }));
  t.is(a.s20.n500.fontFamily, 'Helvetica');
});

test('Should return font-family with quotes using generateFonts()', (t) => {
  const a = generateFonts(create({ family: 'Helvetica Neue' }));
  t.is(a.s20.n500.fontFamily, '\'Helvetica Neue\', -apple-system, BlinkMacSystemFont');
});

test('Should return font-style as italic using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.i400.fontStyle, 'italic');
});

test('Should return font-style as normal using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.n400.fontStyle, 'normal');
});

test('Should return font-size in px using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontSize, '20px');
});

test('Should return font-size in rem using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.fontSize, '20rem');
});

test('Should return font-weight as a number using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.fontWeight, 500);
});

test('Should return font-weight as a string using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.fontWeight, 'bold');
});

test('Should return letter-spacing as initial using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s14.n400.letterSpacing, 'initial');
});

test('Should return letter-spacing in px using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.letterSpacing, '0.29px');
});

test('Should return letter-spacing in em using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.letterSpacing, '0.29em');
});

test('Should return line-height in px using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.lineHeight, '22px');
});

test('Should return line-height in em using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.nBold.lineHeight, '22em');
});

test('Should return line-height as normal using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_lower.lineHeight, 'normal');
});

test('Should return text-transform as undefined using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500.textTransform, undefined);
});

test('Should return text-transform as uppercase using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_caps.textTransform, 'uppercase');
});

test('Should return text-transform as lowercase using generateFonts()', (t) => {
  const a = generateFonts(create());
  t.is(a.s20.n500_lower.textTransform, 'lowercase');
});
