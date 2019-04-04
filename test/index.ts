/* tslint:disable max-line-length */
import test from 'ava';
import create from './fixtures/a';

test('generateFontFace()', (t) => {
  const a = create();
  t.snapshot(a.fontFace, 'Returns a font-face declaration with the family wrapped in quotes');

  const b = create({ family: 'Helvetica' });
  t.snapshot(b.fontFace, 'Returns a font-face declaration without the family wrapped in quotes');

  const c = create({ fontFaceStyles: { fontDisplay: 'swap', WebkitFontSmoothing: 'antialiased' } });
  t.snapshot(c.fontFace, 'Returns a font-face declaration with additional styles');

  const d = create({ eot: false, woff: false, woff2: false, ttf: false });
  t.snapshot(d.fontFace, 'Returns a font-face declaration with only local sources');
});

test('generateFonts()', (t) => {
  const a = create();
  t.snapshot(a.fonts, 'Returns a font styled object with a fallback family');

  const b = create({ fallbacks: undefined });
  t.snapshot(b.fonts, 'Returns a font styled object without a fallback family');

  const c = create({ fontStyles: { textRendering: 'optimizeLegibility' } });
  t.snapshot(c.fonts, 'Returns a font styled object with additional styles');
});

test('Should return a string', (t) => {
  t.truthy(typeof create().fontFace === 'string');
});

test('Should return an object', (t) => {
  t.truthy(typeof create().fonts === 'object');
});

test('Should return font-family values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontFamily, '\'Helvetica Neue\', -apple-system,BlinkMacSystemFont', 'Should return font-family with quotes');

  const b = create({ family: 'Helvetica' });
  t.is(b.fonts.s20.n500.fontFamily, 'Helvetica, -apple-system,BlinkMacSystemFont', 'Should return font-family without quotes');

  const c = create({ fallbacks: undefined });
  t.is(c.fonts.s20.n500.fontFamily, '\'Helvetica Neue\'', 'Should return font-family without a fallback');
});

test('Should return font-style values', (t) => {
  const a = create();
  t.is(a.fonts.s14.i400.fontStyle, 'italic', 'Should return font-style as italic');
  t.is(a.fonts.s14.n400.fontStyle, 'normal', 'Should return font-style as normal');
});

test('Should return font-size values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontSize, '20px', 'Should return font-size in px');
  t.is(a.fonts.s20.nBold.fontSize, '20rem', 'Should return font-size in rem');
});

test('Should return font-weight values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontWeight, 500, 'Should return font-weight as a number');
  t.is(a.fonts.s20.nBold.fontWeight, 'bold', 'Should return font-weight as a string');
});

test('Should return letter-spacing values', (t) => {
  const a = create();
  t.is(a.fonts.s14.n400.letterSpacing, null, 'Should return letter-spacing as null');
  t.is(a.fonts.s20.n500.letterSpacing, '0.29px', 'Should return letter-spacing in px');
  t.is(a.fonts.s20.nBold.letterSpacing, '0.29em', 'Should return letter-spacing in em');
});

test('Should return line-height values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.lineHeight, '22px', 'Should return line-height in px');
  t.is(a.fonts.s20.nBold.lineHeight, '22em', 'Should return line-height in em');
  t.is(a.fonts.s20.n500_lower.lineHeight, 'initial', 'Should return line-height as initial');
});

test('Should return text-transform values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.textTransform, 'none', 'Should return text-transform as none');
  t.is(a.fonts.s20.n500_caps.textTransform, 'uppercase', 'Should return text-transform as uppercase');
  t.is(a.fonts.s20.n500_lower.textTransform, 'lowercase', 'Should return text-transform as lowercase');
});
