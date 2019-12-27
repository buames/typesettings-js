import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { build } from './fixtures/a';
import { createFonts } from '../src';

it('returns font styles as an object', () => {
  const a = createFonts(build(), {});
  expect(typeof a === 'object').toBe(true);
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
  const fonts = createFonts(build());
  expect(fonts.s20.n500_lower.textTransform).toBe('lowercase');
});

it('returns font style as the return type of a cssFn', () => {
  const fonts = createFonts(build({ fallbacks: undefined }), {
    cssFn: css,
  });
  expect(fonts.s14.i400.styles).toBe(
    'font-family:Helvetica;font-style:italic;font-weight:400;font-size:14px;letter-spacing:initial;line-height:18px;',
  );
});

it('returns font styles as objects with fallback families', () => {
  const fonts = createFonts(build());
  expect(fonts).toMatchSnapshot();
});

it('returns font styles with additional font styles', () => {
  const fonts = createFonts(build(), {
    fontStyles: { textRendering: 'optimizeLegibility' },
  });
  expect(fonts).toMatchSnapshot();
});

it('returns font styles default return type when cssFn is undefined', () => {
  const fonts = createFonts(build());
  expect(fonts).toMatchSnapshot();
});

it('returns `styled` Interpolation font styles when cssFn is undefined', () => {
  const fonts = createFonts(build());
  const component = styled('p')`
    ${fonts.s14.n400} color: tomato;
  `;
  expect(component).toMatchSnapshot();
});

it('returns `styled` ObjectInterpolation font styles when cssFn is undefined', () => {
  const fonts = createFonts(build());
  const component = styled('p')(fonts.s14.n400, { color: 'tomato' });
  expect(component).toMatchSnapshot();
});

it('returns `styled` ObjectInterpolation font styles (spread) when cssFn is undefined', () => {
  const fonts = createFonts(build());
  const component = styled('p')({ ...fonts.s14.n400, color: 'tomato' });
  expect(component).toMatchSnapshot();
});

it('returns `styled` ArrayInterpolation font styles when cssFn is undefined', () => {
  const fonts = createFonts(build());
  const component = styled('p')([fonts.s14.n400, { color: 'tomato' }]);
  expect(component).toMatchSnapshot();
});

it('returns font styles when cssFn is set', () => {
  const fonts = createFonts(build(), { cssFn: css });
  expect(fonts).toMatchSnapshot();
});

it('returns `styled` Interpolation font styles when cssFn is set', () => {
  const fonts = createFonts(build(), { cssFn: css });
  const component = styled('p')`
    ${fonts.s14.n400} color: tomato;
  `;
  expect(component).toMatchSnapshot();
});

it('returns `styled` ObjectInterpolation font styles when cssFn is set', () => {
  const fonts = createFonts(build(), { cssFn: css });
  const component = styled('p')(fonts.s14.n400, { color: 'tomato' });
  expect(component).toMatchSnapshot();
});

it('returns `styled` ObjectInterpolation font styles (spread) when cssFn is set', () => {
  const fonts = createFonts(build(), { cssFn: css });
  const component = styled('p')({ ...fonts.s14.n400, color: 'tomato' });
  expect(component).toMatchSnapshot();
});

it('returns `styled` ArrayInterpolation font styles when cssFn is set', () => {
  const fonts = createFonts(build(), { cssFn: css });
  const component = styled('p')([fonts.s14.n400, { color: 'tomato' }]);
  expect(component).toMatchSnapshot();
});
