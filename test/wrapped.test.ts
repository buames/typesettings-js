/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import { css } from '@emotion/core';
import { Helvetica } from './fixtures/a';
import { FontFaceOptions, FontStyleOptions } from '../src';

interface ExtendedStyles {
  WebkitFontSmoothing?: 'antialiased';
}

interface FontFaceStyles extends ExtendedStyles, FontFaceOptions { }

interface FontStyles extends ExtendedStyles, FontStyleOptions { }

test('Should return @font-face declaration as snapshots', (t) => {
  const { fontFace: a } = Helvetica({
    fontFaceStyles: <FontFaceStyles>{
      fontDisplay: 'swap',
      WebkitFontSmoothing: 'antialiased',
      MozFontFeatureSettings: '"tnum", "liga"',
    },
  });
  t.snapshot(a, '@font-face declaration when cssFn is undefined');

  const { fontFace: b } = Helvetica({
    cssFn: css,
    fontFaceStyles: <FontFaceStyles>{
      fontDisplay: 'swap',
      WebkitFontSmoothing: 'antialiased',
    },
  });
  t.snapshot(b, '@font-face declaration when cssFn is set');

  const { fontFace: c } = Helvetica({
    eot: false, woff: false, woff2: false, ttf: false,
  });
  t.snapshot(c, '@font-face declaration with local sources only');
});

test('Should return font styles as snapshots', (t) => {
  const { fonts: a } = Helvetica({
    fontStyles: {
      color: 'tomato',
    },
  });
  t.snapshot(a, 'Font styles when cssFn is undefined');

  const { fonts: b } = Helvetica({
    cssFn: css,
    fontStyles: <FontStyles>{
      color: 'tomato',
      WebkitFontSmoothing: 'antialiased',
    },
  });
  t.snapshot(b, 'Font styles when cssFn is set');
});
