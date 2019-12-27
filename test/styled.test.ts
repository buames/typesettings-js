import styled from '@emotion/styled';
import { css, Interpolation, SerializedStyles } from '@emotion/core';
import { create } from './fixtures/a';
import { generateFonts, generateFontFace } from '../src';

type StyledCssFn = (...args: Interpolation[]) => SerializedStyles;

test('Should return @font-face declaration as the return type of a cssFn', () => {
  const a = generateFontFace<StyledCssFn>(create(), { cssFn: css });
  const b = generateFontFace(create());
  expect(a.styles).toEqual(b);
});

test('Should return @font-face declaration snapshots', () => {
  const a = generateFontFace(create());
  expect(a).toMatchSnapshot('@font-face declaration when cssFn is undefined');

  const b = generateFontFace<StyledCssFn>(create(), { cssFn: css });
  expect(b).toMatchSnapshot('@font-face declaration when cssFn is set');
});

test('Should return font style as the return type of a cssFn', () => {
  const a = generateFonts<StyledCssFn>(create({ fallbacks: undefined }), {
    cssFn: css,
  });
  expect(a.s14.i400.styles).toBe(
    'font-family:Helvetica;font-style:italic;font-weight:400;font-size:14px;letter-spacing:initial;line-height:18px;',
  );
});

test('Should return font style snapshots', () => {
  const a = generateFonts(create());
  expect(a).toMatchSnapshot(
    'Font styles default return type when cssFn is undefined',
  );

  const a1 = styled('p')`
    ${a.s14.n400} color: tomato;
  `;
  expect(a1).toMatchSnapshot(
    '`styled` Interpolation font styles when cssFn is undefined',
  );

  const a2 = styled('p')(a.s14.n400, { color: 'tomato' });
  expect(a2).toMatchSnapshot(
    '`styled` ObjectInterpolation font styles when cssFn is undefined',
  );

  const a3 = styled('p')({ ...a.s14.n400, color: 'tomato' });
  expect(a3).toMatchSnapshot(
    '`styled` ObjectInterpolation font styles (spread) when cssFn is undefined',
  );

  const a4 = styled('p')([a.s14.n400, { color: 'tomato' }]);
  expect(a4).toMatchSnapshot(
    '`styled` ArrayInterpolation font styles when cssFn is undefined',
  );

  const b = generateFonts<StyledCssFn>(create(), { cssFn: css });
  expect(b).toMatchSnapshot(
    'Font styles default return type when cssFn is set',
  );

  const b1 = styled('p')`
    ${b.s14.n400} color: tomato;
  `;
  expect(b1).toMatchSnapshot(
    '`styled` Interpolation font styles when cssFn is set',
  );

  const b2 = styled('p')(b.s14.n400, { color: 'tomato' });
  expect(b2).toMatchSnapshot(
    '`styled` ObjectInterpolation font styles when cssFn is set',
  );

  const b3 = styled('p')({ ...b.s14.n400, color: 'tomato' });
  expect(b3).toMatchSnapshot(
    '`styled` ObjectInterpolation font styles (spread) when cssFn is set',
  );

  const b4 = styled('p')([b.s14.n400, { color: 'tomato' }]);
  expect(b4).toMatchSnapshot(
    '`styled` ArrayInterpolation font styles when cssFn is set',
  );
});