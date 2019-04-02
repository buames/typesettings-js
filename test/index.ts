import test from 'ava';
import typesettings from './fixtures/typesettings';
import { generateFonts, generateFontFace, Typesettings } from '../src';

const config = typesettings as Typesettings;

test('generateFontFace()', (t) => {
  t.snapshot(generateFontFace(config), 'with fontFamily wrapped in quotes');

  const b = { ...config, family: 'Helvetica' };
  t.snapshot(generateFontFace(b), 'without fontFamily wrapped in quotes');
});

test('generateFontFace(): Should throw error when there are no file sources.', (t) => {
  const a = {
    family: 'Helvetica Neue',
    fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
    variants: [
      {
        fontWeight: 400,
        normalcase: [{
          fontSize: 12
        }]
      }
    ]
  };

  const error = t.throws(() => (generateFontFace(a)), Error);

  t.is(error.message, 'Missing font file sources');
});

test('generateFonts()', (t) => {
  t.snapshot(generateFonts(config), 'with fallback family');

  // tslint:disable-next-line: max-line-length
  t.snapshot(generateFonts(config, { fontStyles: { textRendering: 'optimizeLegibility' } }), 'with additional styles');

  delete config.fallbacks;
  t.snapshot(generateFonts(config), 'without fallback family');
});

test('config options', (t) => {
  const fn = opts => ({
    family: 'Helvetica Neue',
    fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
    variants: [
      {
        fontStyle: 'normal',
        fontWeight: 400,
        sources: {
          locals: ['Helvetica Regular', 'Helvetica-Regular'],
          woff: opts.woff && 'file_path'
        },
        normalcase: [
          {
            fontSize: 14,
            letterSpacing: null,
            lineHeight: 18
          },
          {
            fontSize: 20,
            letterSpacing: null,
            lineHeight: 22
          }
        ]
      }
    ]
  });

  t.snapshot(generateFontFace(fn({ woff: false })), 'without woff');
});
