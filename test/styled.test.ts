/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import styled from '@emotion/styled';
import { css, Interpolation, SerializedStyles } from '@emotion/core';
import { create } from './fixtures/b';
import { generateFonts } from '../src';

type StyledCssFn = (...args: Interpolation[]) => SerializedStyles;

const a = generateFonts(create());
const b = generateFonts<StyledCssFn>(create(), { cssFn: css });

test('Should return `styled` snapshots using generateFonts() when cssFn is undefined', (t) => {
  const a1 = styled('p')`${a.s14.n400} color: tomato;`;
  t.snapshot(a1, 'Interpolation font styles');

  const a2 = styled('p')(a.s14.n400, { color: 'tomato' });
  t.snapshot(a2, 'ObjectInterpolation font styles');

  const a3 = styled('p')({ ...a.s14.n400, color: 'tomato' });
  t.snapshot(a3, 'ObjectInterpolation font styles (spread)');

  const a4 = styled('p')([a.s14.n400, { color: 'tomato' }]);
  t.snapshot(a4, 'ArrayInterpolation font styles');
});

test('Should return `styled` snapshots using generateFonts() when cssFn is set', (t) => {
  const b1 = styled('p')`${b.s14.n400} color: tomato;`;
  t.snapshot(b1, 'Interpolation font styles');

  const b2 = styled('p')(b.s14.n400, { color: 'tomato' });
  t.snapshot(b2, 'ObjectInterpolation font styles');

  const b3 = styled('p')({ ...b.s14.n400, color: 'tomato' });
  t.snapshot(b3, 'ObjectInterpolation font styles (spread)');

  const b4 = styled('p')([b.s14.n400, { color: 'tomato' }]);
  t.snapshot(b4, 'ArrayInterpolation font styles');
});
