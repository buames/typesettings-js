import test from 'ava';
import typesettings from './fixtures/typesettings';
import { generateFonts, generateFontFace, Typesettings } from '../src';

const config = typesettings as Typesettings;

test('generateFontFace()', (t) => {
  t.snapshot(generateFontFace(config), 'with fontFamily wrapped in quotes');

  const a = { ...config, family: 'Helvetica' };
  t.snapshot(generateFontFace(a), 'without fontFamily wrapped in quotes');
});

test('generateFontFace(): Should throw error when there are no file sources.', (t) => {
  const error = t.throws(() => {
    delete config.variants[0].sources;
    return generateFontFace(config);
  // tslint:disable-next-line: align
  }, Error);

  t.is(error.message, 'Missing font file sources');
});

test('generateFonts()', (t) => {
  t.snapshot(generateFonts(config), 'with fallback family');

  // tslint:disable-next-line: max-line-length
  t.snapshot(generateFonts(config, { textRendering: 'optimizeLegibility' }), 'with additional styles');

  delete config.fallbacks;
  t.snapshot(generateFonts(config), 'without fallback family');
});
