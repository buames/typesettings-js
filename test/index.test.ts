/* eslint-disable import/extensions,import/no-unresolved  */
import test from 'ava';
import { css, Interpolation, SerializedStyles } from '@emotion/core';
import {
  generate,
  getValue,
  Typesettings,
  TypesettingOptions,
  FontStyles,
  FontFaceStyles,
  StyledValue,
} from '../src';

type CssFn = (...args: Interpolation[]) => SerializedStyles;

interface ExtendedFontFaceStyles extends FontFaceStyles {
  WebkitFontSmoothing: string;
}

interface Options extends TypesettingOptions<CssFn, FontStyles, ExtendedFontFaceStyles> {
  eot?: boolean;
  woff?: boolean;
  woff2?: boolean;
  ttf?: boolean;
  family?: string;
  fallbacks?: string[];
}

const defaults = {
  eot: true,
  woff: true,
  woff2: true,
  ttf: true,
  family: 'Helvetica Neue',
  fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
};

const create = (opts?: Options) => {
  const options = { ...defaults, ...opts };

  const config: Typesettings = {
    family: options.family,
    fallbacks: options.fallbacks,
    variants: [
      {
        fontStyle: 'italic',
        fontWeight: 400,
        sources: {
          locals: ['Helvetica Regular', 'Helvetica-Regular'],
        },
        normalcase: [
          {
            fontSize: 14,
            letterSpacing: null,
            lineHeight: 18,
          },
        ],
      },
      {
        fontStyle: 'normal',
        fontWeight: 400,
        sources: {
          locals: ['Helvetica Regular', 'Helvetica-Regular'],
        },
        normalcase: [
          {
            fontSize: 14,
            letterSpacing: null,
            lineHeight: 18,
          },
        ],
      },
      {
        fontStyle: 'normal',
        fontWeight: 500,
        sources: {
          locals: ['Helvetica Medium', 'Helvetica-Medium'],
          eot: options.eot && './font-file.eot',
          woff: options.woff && './font-file.woff',
          woff2: options.woff2 && './font-file.woff2',
          ttf: options.ttf && './font-file.ttf',
        },
        normalcase: [
          {
            fontSize: 20,
            letterSpacing: 0.29,
            lineHeight: 22,
          },
        ],
        lowercase: [
          {
            fontSize: 20,
            letterSpacing: null,
            lineHeight: null,
          },
        ],
        uppercase: [
          {
            fontSize: 20,
            letterSpacing: 1,
            lineHeight: 1,
          },
        ],
      },
      {
        fontStyle: 'normal',
        fontWeight: 'bold',
        sources: {
          locals: ['Helvetica Bold', 'Helvetica-Bold'],
          eot: options.eot && './font-file.eot',
          woff: options.woff && './font-file.woff',
          woff2: options.woff2 && './font-file.woff2',
          ttf: options.ttf && './font-file.ttf',
        },
        normalcase: [
          {
            fontSize: '20rem',
            letterSpacing: '0.29em',
            lineHeight: '22em',
          },
          {
            fontSize: 'FooBar',
            letterSpacing: '0.29em',
            lineHeight: '22em',
          },
        ],
      },
    ],
  };

  const { fonts, fontFace } = generate(config, opts);

  const get = <T = StyledValue>(...paths: any[]) => (
    getValue<T>(config, paths.join('.'))
  );

  return { fonts, fontFace, get };
};

test('generateFontFace()', (t) => {
  const a = create();
  t.snapshot(a.fontFace, 'Returns a font-face declaration with the family wrapped in quotes');

  const b = create({ family: 'Helvetica' });
  t.snapshot(b.fontFace, 'Returns a font-face declaration without the family wrapped in quotes');

  const c = create({ fontFaceStyles: { fontDisplay: 'swap', WebkitFontSmoothing: 'antialiased', MozFontFeatureSettings: '"tnum", "liga"' } });
  t.snapshot(c.fontFace, 'Returns a font-face declaration with additional styles');

  const d = create({
    eot: false, woff: false, woff2: false, ttf: false,
  });
  t.snapshot(d.fontFace, 'Returns a font-face declaration with only local sources');

  const e = create({ cssFn: css });
  t.snapshot(e.fontFace, 'Returns a font-face declaration using cssFn');
});

test('generateFonts()', (t) => {
  const a = create();
  t.snapshot(a.fonts, 'Returns a font styled object with a fallback family');

  const b = create({ fallbacks: undefined });
  t.snapshot(b.fonts, 'Returns a font styled object without a fallback family');

  const c = create({ fontStyles: { textRendering: 'optimizeLegibility' } });
  t.snapshot(c.fonts, 'Returns a font styled object with additional styles');

  const d = create({ cssFn: css });
  t.snapshot(d.fonts, 'Returns a font styled object using cssFn');
});

test('Should return a string', (t) => {
  t.truthy(typeof create().fontFace === 'string');
});

test('Should return an object', (t) => {
  t.truthy(typeof create().fonts === 'object');
});

test('Should return font-family values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontFamily, '\'Helvetica Neue\', -apple-system,BlinkMacSystemFont', 'Should return font-family with quotes');

  const b = create({ family: 'Helvetica' });
  t.is(b.fonts.s20.n500.fontFamily, 'Helvetica, -apple-system,BlinkMacSystemFont', 'Should return font-family without quotes');

  const c = create({ fallbacks: undefined });
  t.is(c.fonts.s20.n500.fontFamily, '\'Helvetica Neue\'', 'Should return font-family without a fallback');
});

test('Should return font-style values', (t) => {
  const a = create();
  t.is(a.fonts.s14.i400.fontStyle, 'italic', 'Should return font-style as italic');
  t.is(a.fonts.s14.n400.fontStyle, 'normal', 'Should return font-style as normal');
});

test('Should return font-size values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontSize, '20px', 'Should return font-size in px');
  t.is(a.fonts.s20.nBold.fontSize, '20rem', 'Should return font-size in rem');
});

test('Should return font-weight values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.fontWeight, 500, 'Should return font-weight as a number');
  t.is(a.fonts.s20.nBold.fontWeight, 'bold', 'Should return font-weight as a string');
});

test('Should return letter-spacing values', (t) => {
  const a = create();
  t.is(a.fonts.s14.n400.letterSpacing, null, 'Should return letter-spacing as null');
  t.is(a.fonts.s20.n500.letterSpacing, '0.29px', 'Should return letter-spacing in px');
  t.is(a.fonts.s20.nBold.letterSpacing, '0.29em', 'Should return letter-spacing in em');
});

test('Should return line-height values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.lineHeight, '22px', 'Should return line-height in px');
  t.is(a.fonts.s20.nBold.lineHeight, '22em', 'Should return line-height in em');
  t.is(a.fonts.s20.n500_lower.lineHeight, 'initial', 'Should return line-height as initial');
});

test('Should return text-transform values', (t) => {
  const a = create();
  t.is(a.fonts.s20.n500.textTransform, 'none', 'Should return text-transform as none');
  t.is(a.fonts.s20.n500_caps.textTransform, 'uppercase', 'Should return text-transform as uppercase');
  t.is(a.fonts.s20.n500_lower.textTransform, 'lowercase', 'Should return text-transform as lowercase');
});

test('Should return values from the typesettings config', (t) => {
  const a = create();
  t.is(a.get('foo'), null, 'Should return null');
  t.is(a.get('family'), 'Helvetica Neue', 'Should return the font family name');
  t.is(a.get('variants', '0', 'fontStyle'), 'italic', 'Should return a nested value');
  t.deepEqual(a.get<string[]>('variants.0.sources.locals'), ['Helvetica Regular', 'Helvetica-Regular'], 'Should return a nested value');
  t.truthy(Array.isArray(a.get('variants')), 'Should return an array of object variants');
});
