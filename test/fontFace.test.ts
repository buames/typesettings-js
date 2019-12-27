import { build } from './fixtures/a';
import { createFontFace } from '../src';

it('returns @font-face declaration as a string', () => {
  const fontFace = createFontFace(build());
  expect(typeof fontFace === 'string').toBeTruthy();
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration without the family wrapped in quotes', () => {
  const fontFace = createFontFace(build({ family: 'Helvetica' }));
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration with the family wrapped in quotes', () => {
  const fontFace = createFontFace(build({ family: 'Helvetica Neue' }));
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration without fallback families', () => {
  const fontFace = createFontFace(build({ fallbacks: undefined }));
  expect(fontFace).toMatchSnapshot();
});

it('returns @font-face declaration with additional fontFace styles', () => {
  const fontFace = createFontFace(build(), {
    fontFaceStyles: {
      fontDisplay: 'swap',
      MozFontFeatureSettings: '"tnum", "liga"',
    },
  });
  expect(fontFace).toMatchSnapshot();
});
