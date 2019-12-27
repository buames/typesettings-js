import { px, parseSize } from '../src/units';

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
