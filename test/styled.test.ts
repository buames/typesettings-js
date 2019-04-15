/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import styled from '@emotion/styled';
import { css, Interpolation, SerializedStyles } from '@emotion/core';
import { create } from './fixtures/a';
import { generateFonts, generateFontFace } from '../src';

type StyledCssFn = (...args: Interpolation[]) => SerializedStyles;

test('Should return @font-face declaration as the return type of a cssFn', (t) => {
  const a = generateFontFace<StyledCssFn>(create(), { cssFn: css });
  const b = generateFontFace(create());
  t.is(a.styles, b);
});

test('Should return @font-face declaration snapshots', (t) => {
  const a = generateFontFace(create());
  t.snapshot(a, '@font-face declaration when cssFn is undefined');

  const b = generateFontFace<StyledCssFn>(create(), { cssFn: css });
  t.snapshot(b, '@font-face declaration when cssFn is set');
});

test('Should return font style as the return type of a cssFn', (t) => {
  const a = generateFonts<StyledCssFn>(create({ fallbacks: undefined }), { cssFn: css });
  t.is(a.s14.i400.styles, 'font-family:Helvetica;font-style:italic;font-weight:400;font-size:14px;letter-spacing:initial;line-height:18px;');
});

test('Should return font style snapshots', (t) => {
  const a = generateFonts(create());
  t.snapshot(a, 'Font styles default return type when cssFn is undefined');

  const a1 = styled('p')`${a.s14.n400} color: tomato;`;
  t.snapshot(a1, '`styled` Interpolation font styles when cssFn is undefined');

  const a2 = styled('p')(a.s14.n400, { color: 'tomato' });
  t.snapshot(a2, '`styled` ObjectInterpolation font styles when cssFn is undefined');

  const a3 = styled('p')({ ...a.s14.n400, color: 'tomato' });
  t.snapshot(a3, '`styled` ObjectInterpolation font styles (spread) when cssFn is undefined');

  const a4 = styled('p')([a.s14.n400, { color: 'tomato' }]);
  t.snapshot(a4, '`styled` ArrayInterpolation font styles when cssFn is undefined');

  const b = generateFonts<StyledCssFn>(create(), { cssFn: css });
  t.snapshot(b, 'Font styles default return type when cssFn is set');

  const b1 = styled('p')`${b.s14.n400} color: tomato;`;
  t.snapshot(b1, '`styled` Interpolation font styles when cssFn is set');

  const b2 = styled('p')(b.s14.n400, { color: 'tomato' });
  t.snapshot(b2, '`styled` ObjectInterpolation font styles when cssFn is set');

  const b3 = styled('p')({ ...b.s14.n400, color: 'tomato' });
  t.snapshot(b3, '`styled` ObjectInterpolation font styles (spread) when cssFn is set');

  const b4 = styled('p')([b.s14.n400, { color: 'tomato' }]);
  t.snapshot(b4, '`styled` ArrayInterpolation font styles when cssFn is set');
});
