/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import { css, Interpolation, SerializedStyles } from '@emotion/core';
import { create } from './fixtures/b';
import { generateFontFace, generateFonts } from '../src';

type StyledCssFn = (...args: Interpolation[]) => SerializedStyles;

const a = generateFontFace<StyledCssFn>(create(), { cssFn: css });
const b = generateFonts<StyledCssFn>(create(), { cssFn: css });

test('Should return @font-face declaration as the return type of a cssFn', (t) => {
  const b = generateFontFace(create());
  t.is(a.styles, b);
});

test('Should return @font-face declaration as snapshots of the cssFn return type using generateFontFace()', (t) => {
  t.snapshot(a, '@font-face declaration when cssFn is set');
});

test('Should return font styles as the return type of a cssFn', (t) => {
  t.truthy(typeof b === 'object');
});

test('Should return font styles as snapshots of the cssFn return type using generateFonts()', (t) => {
  t.snapshot(b, 'Font styles when cssFn is set');
});
