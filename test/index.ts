import test from 'ava';
import { generateFonts, generateFontFace } from '../src';
import { Typesettings } from '../src/types';

const config: Typesettings = {
  family: 'Helvetica Neue',
  fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
  variants: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      sources: {
        locals: ['Helvetica Regular', 'Helvetica-Regular']
      },
      normalcase: {
        12: {
          characterSpacing: null,
          lineHeight: 18,
          paragraphSpacing: 0
        }
      }
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf'
      },
      normalcase: {
        20: {
          characterSpacing: 0.29348573,
          lineHeight: 22,
          paragraphSpacing: 22
        }
      },
      lowercase: {
        20: {
          characterSpacing: null,
          lineHeight: null,
          paragraphSpacing: null
        }
      },
      uppercase: {
        20: {
          characterSpacing: 1,
          lineHeight: 1,
          paragraphSpacing: 1
        }
      }
    },
    {
      fontStyle: 'normal',
      fontWeight: 'bold',
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf'
      },
      normalcase: {
        20: {
          characterSpacing: '0.29em',
          lineHeight: 22,
          paragraphSpacing: 22
        }
      }
    }
  ]
};

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
