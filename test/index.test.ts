import { build } from './fixtures/a';
import { createFontFace, createFonts } from '../src';

it('returns @font-face declaration as a string', () => {
  const a = createFontFace(build());
  expect(typeof a === 'string').toBe(true);
});

it('returns @font-face declaration as snapshots', () => {
  const a = createFontFace(build({ family: 'Helvetica' }));
  expect(a).toMatchSnapshot(
    '@font-face declaration without the family wrapped in quotes',
  );

  const b = createFontFace(build({ family: 'Helvetica Neue' }));
  expect(b).toMatchSnapshot(
    '@font-face declaration with the family wrapped in quotes',
  );

  const c = createFontFace(build(), {
    fontFaceStyles: {
      fontDisplay: 'swap',
      MozFontFeatureSettings: '"tnum", "liga"',
    },
  });
  expect(c).toMatchSnapshot(
    '@font-face declaration with additional fontFace styles',
  );
});

it('returns font styles as an object', () => {
  const a = createFonts(build());
  expect(typeof a === 'object').toBe(true);
});

it('returns font styles as snapshots', () => {
  const a = createFonts(build());
  expect(a).toMatchSnapshot('Font styles as objects with fallback families');

  const b = createFontFace(build({ fallbacks: undefined }));
  expect(b).toMatchSnapshot('Font styles as objects without fallback families');

  const c = createFonts(build(), {
    fontStyles: { textRendering: 'optimizeLegibility' },
  });
  expect(c).toMatchSnapshot('Font styles with additional font styles');
});

it('returns font-family without quotes', () => {
  const a = createFonts(build());
  expect(a.s20.n500.fontFamily).toBe(
    'Helvetica, -apple-system, BlinkMacSystemFont',
  );
});

it('returns font-family without a fallback', () => {
  const a = createFonts(build({ fallbacks: undefined }));
  expect(a.s20.n500.fontFamily).toBe('Helvetica');
});

it('returns font-family with quotes', () => {
  const a = createFonts(build({ family: 'Helvetica Neue' }));
  expect(a.s20.n500.fontFamily).toBe(
    "'Helvetica Neue', -apple-system, BlinkMacSystemFont",
  );
});

it('returns font-style as italic', () => {
  const a = createFonts(build());
  expect(a.s14.i400.fontStyle).toBe('italic');
});

it('returns font-style as normal', () => {
  const a = createFonts(build());
  expect(a.s14.n400.fontStyle).toBe('normal');
});

it('returns font-size in px', () => {
  const a = createFonts(build());
  expect(a.s20.n500.fontSize).toBe('20px');
});

it('returns font-size in rem', () => {
  const a = createFonts(build());
  expect(a.s20.nBold.fontSize).toBe('20rem');
});

it('returns font-weight as a number', () => {
  const a = createFonts(build());
  expect(a.s20.n500.fontWeight).toBe(500);
});

it('returns font-weight as a string', () => {
  const a = createFonts(build());
  expect(a.s20.nBold.fontWeight).toBe('bold');
});

it('returns letter-spacing as initial', () => {
  const a = createFonts(build());
  expect(a.s14.n400.letterSpacing).toBe('initial');
});

it('returns letter-spacing in px', () => {
  const a = createFonts(build());
  expect(a.s20.n500.letterSpacing).toBe('0.29px');
});

it('returns letter-spacing in em', () => {
  const a = createFonts(build());
  expect(a.s20.nBold.letterSpacing).toBe('0.29em');
});

it('returns line-height in px', () => {
  const a = createFonts(build());
  expect(a.s20.n500.lineHeight).toBe('22px');
});

it('returns line-height in em', () => {
  const a = createFonts(build());
  expect(a.s20.nBold.lineHeight).toBe('22em');
});

it('returns line-height as normal', () => {
  const a = createFonts(build());
  expect(a.s20.n500_lower.lineHeight).toBe('normal');
});

it('returns text-transform as undefined', () => {
  const a = createFonts(build());
  expect(a.s20.n500.textTransform).toBeUndefined();
});

it('returns text-transform as uppercase', () => {
  const a = createFonts(build());
  expect(a.s20.n500_caps.textTransform).toBe('uppercase');
});

it('returns text-transform as lowercase', () => {
  const a = createFonts(build());
  expect(a.s20.n500_lower.textTransform).toBe('lowercase');
});
