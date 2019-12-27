import { create } from './fixtures/a';
import {
  generateFontFace,
  generateFonts,
  getFontStack,
  normalizeFamily,
  parseSize,
  px,
} from '../src';

it('returns @font-face declaration as a string', () => {
  const a = generateFontFace(create());
  expect(typeof a === 'string').toBe(true);
});

it('returns @font-face declaration as snapshots', () => {
  const a = generateFontFace(create({ family: 'Helvetica' }));
  expect(a).toMatchSnapshot(
    '@font-face declaration without the family wrapped in quotes',
  );

  const b = generateFontFace(create({ family: 'Helvetica Neue' }));
  expect(b).toMatchSnapshot(
    '@font-face declaration with the family wrapped in quotes',
  );

  const c = generateFontFace(create(), {
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
  const a = generateFonts(create());
  expect(typeof a === 'object').toBe(true);
});

it('returns font styles as snapshots', () => {
  const a = generateFonts(create());
  expect(a).toMatchSnapshot('Font styles as objects with fallback families');

  const b = generateFontFace(create({ fallbacks: undefined }));
  expect(b).toMatchSnapshot('Font styles as objects without fallback families');

  const c = generateFonts(create(), {
    fontStyles: { textRendering: 'optimizeLegibility' },
  });
  expect(c).toMatchSnapshot('Font styles with additional font styles');
});

it('returns font-family without quotes', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.fontFamily).toBe(
    'Helvetica, -apple-system, BlinkMacSystemFont',
  );
});

it('returns font-family without a fallback', () => {
  const a = generateFonts(create({ fallbacks: undefined }));
  expect(a.s20.n500.fontFamily).toBe('Helvetica');
});

it('returns font-family with quotes', () => {
  const a = generateFonts(create({ family: 'Helvetica Neue' }));
  expect(a.s20.n500.fontFamily).toBe(
    "'Helvetica Neue', -apple-system, BlinkMacSystemFont",
  );
});

it('returns font-style as italic', () => {
  const a = generateFonts(create());
  expect(a.s14.i400.fontStyle).toBe('italic');
});

it('returns font-style as normal', () => {
  const a = generateFonts(create());
  expect(a.s14.n400.fontStyle).toBe('normal');
});

it('returns font-size in px', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.fontSize).toBe('20px');
});

it('returns font-size in rem', () => {
  const a = generateFonts(create());
  expect(a.s20.nBold.fontSize).toBe('20rem');
});

it('returns font-weight as a number', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.fontWeight).toBe(500);
});

it('returns font-weight as a string', () => {
  const a = generateFonts(create());
  expect(a.s20.nBold.fontWeight).toBe('bold');
});

it('returns letter-spacing as initial', () => {
  const a = generateFonts(create());
  expect(a.s14.n400.letterSpacing).toBe('initial');
});

it('returns letter-spacing in px', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.letterSpacing).toBe('0.29px');
});

it('returns letter-spacing in em', () => {
  const a = generateFonts(create());
  expect(a.s20.nBold.letterSpacing).toBe('0.29em');
});

it('returns line-height in px', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.lineHeight).toBe('22px');
});

it('returns line-height in em', () => {
  const a = generateFonts(create());
  expect(a.s20.nBold.lineHeight).toBe('22em');
});

it('returns line-height as normal', () => {
  const a = generateFonts(create());
  expect(a.s20.n500_lower.lineHeight).toBe('normal');
});

it('returns text-transform as undefined', () => {
  const a = generateFonts(create());
  expect(a.s20.n500.textTransform).toBeUndefined();
});

it('returns text-transform as uppercase', () => {
  const a = generateFonts(create());
  expect(a.s20.n500_caps.textTransform).toBe('uppercase');
});

it('returns text-transform as lowercase', () => {
  const a = generateFonts(create());
  expect(a.s20.n500_lower.textTransform).toBe('lowercase');
});

describe('getFontStack', () => {
  it('returns a font stack with fallbacks and no quotes', () => {
    expect(getFontStack('Helvetica')).toBe('Helvetica');
  });

  it('returns a font stack with fallbacks and quotes', () => {
    expect(getFontStack('Helvetica Neue', ['Arial', 'Comic Sans'])).toBe(
      "'Helvetica Neue', Arial, 'Comic Sans'",
    );
  });
});

describe('px()', () => {
  it('converts number value to pixels', () => {
    expect(px(8)).toBe('8px');
  });

  it('converts string value to pixels', () => {
    expect(px('8px')).toBe('8px');
  });

  it('does not convert value to pixels', () => {
    expect(px('8em')).toBe('8em');
  });
});

describe('parseSize()', () => {
  it('returns the size when given a size without a unit', () => {
    expect(parseSize('12')).toBe('12');
  });

  it('returns the size when given a size with a px unit', () => {
    expect(parseSize('12px')).toBe('12');
  });

  it('returns the size when given a size with an em unit', () => {
    expect(parseSize('12em')).toBe('12');
  });

  it('returns the given value when there is no unit matched', () => {
    expect(parseSize('s12')).toBe('s12');
  });

  it('returns the given value when the value is not a string', () => {
    expect(parseSize(12)).toBe(12);
  });
});

describe('normalizeFamily()', () => {
  it('returns a family name without quotes', () => {
    expect(normalizeFamily('Helvetica')).toBe('Helvetica');
  });

  it('returns multiple family names without quotes', () => {
    expect(
      normalizeFamily('Helvetica, -apple-system, BlinkMacSystemFont'),
    ).toBe("'Helvetica, -apple-system, BlinkMacSystemFont'");
  });

  it('returns a family name with quotes', () => {
    expect(normalizeFamily('Helvetica Neue')).toBe("'Helvetica Neue'");
  });

  it('returns multiple family names with quotes', () => {
    expect(normalizeFamily('Helvetica Neue, Comic Sans')).toBe(
      "'Helvetica Neue, Comic Sans'",
    );
  });
});
