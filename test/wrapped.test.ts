import { css } from '@emotion/core';
import { Helvetica } from './fixtures/a';

it('returns @font-face declaration when cssFn is undefined', () => {
  const { fontFace } = Helvetica({
    fontFaceStyles: {
      fontDisplay: 'swap',
      MozFontFeatureSettings: '"tnum", "liga"',
    },
  });
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration when cssFn is set', () => {
  const { fontFace } = Helvetica({
    cssFn: css,
    fontFaceStyles: {
      fontDisplay: 'swap',
    },
  });
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration with local sources only', () => {
  const { fontFace } = Helvetica({
    eot: false,
    woff: false,
    woff2: false,
    ttf: false,
  });
  expect(fontFace).toMatchSnapshot();
});

it('returns font styles when cssFn is undefined', () => {
  const { fonts } = Helvetica({
    fontStyles: {
      color: 'tomato',
    },
  });
  expect(fonts).toMatchSnapshot();
});

it('returns font styles when cssFn is set', () => {
  const { fonts } = Helvetica({
    cssFn: css,
    fontStyles: {
      color: 'tomato',
    },
  });
  expect(fonts).toMatchSnapshot();
});
