import { css } from '@emotion/core';
import { Helvetica } from './fixtures/a';
import { FontFaceOptions, FontStyleOptions } from '../src';

interface ExtendedStyles {
  WebkitFontSmoothing?: 'antialiased';
}

interface FontFaceStyles extends ExtendedStyles, FontFaceOptions {}

interface FontStyles extends ExtendedStyles, FontStyleOptions {}

test('Should return @font-face declaration as snapshots', () => {
  const { fontFace: a } = Helvetica({
    fontFaceStyles: {
      fontDisplay: 'swap',
      WebkitFontSmoothing: 'antialiased',
      MozFontFeatureSettings: '"tnum", "liga"',
    } as FontFaceStyles,
  });
  expect(a).toMatchSnapshot('@font-face declaration when cssFn is undefined');

  const { fontFace: b } = Helvetica({
    cssFn: css,
    fontFaceStyles: {
      fontDisplay: 'swap',
      WebkitFontSmoothing: 'antialiased',
    } as FontFaceStyles,
  });
  expect(b).toMatchSnapshot('@font-face declaration when cssFn is set');

  const { fontFace: c } = Helvetica({
    eot: false,
    woff: false,
    woff2: false,
    ttf: false,
  });
  expect(c).toMatchSnapshot('@font-face declaration with local sources only');
});

test('Should return font styles as snapshots', () => {
  const { fonts: a } = Helvetica({
    fontStyles: {
      color: 'tomato',
    },
  });
  expect(a).toMatchSnapshot('Font styles when cssFn is undefined');

  const { fonts: b } = Helvetica({
    cssFn: css,
    fontStyles: {
      color: 'tomato',
      WebkitFontSmoothing: 'antialiased',
    } as FontStyles,
  });
  expect(b).toMatchSnapshot('Font styles when cssFn is set');
});
