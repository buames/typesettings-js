import { getFontStack, normalizeFontFamily } from '../src/fontFamilies';

describe('fixFontFamily()', () => {
  it('returns a family name without quotes', () => {
    expect(normalizeFontFamily("'Helvetica")).toBe('Helvetica');
  });

  it('returns multiple family names without quotes', () => {
    expect(
      normalizeFontFamily('Helvetica, -apple-system, BlinkMacSystemFont'),
    ).toBe('Helvetica, -apple-system, BlinkMacSystemFont');
  });

  it('returns a family name with quotes', () => {
    expect(normalizeFontFamily('Helvetica Neue')).toBe("'Helvetica Neue'");
  });

  it('returns multiple family names with quotes', () => {
    expect(normalizeFontFamily('Helvetica Neue, Comic Sans')).toBe(
      "'Helvetica Neue', 'Comic Sans'",
    );
  });
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
