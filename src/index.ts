/* eslint-disable no-nested-ternary */
import { FontFamilyProperty, FontSizeProperty } from 'csstype';
import {
  fontCasings,
  fontSources,
  FontFaceOptions,
  FontStyleOptions,
  FontSources,
  FontSetting,
  FontVariant,
  StyledCssFn,
  StyledValue,
  StyledObject,
  Typesettings,
  TypesettingOptions,
  TypesettingsFontsResult,
  TypesettingsFontFaceResult,
} from './types';

export {
  fontCasings,
  fontSources,
  FontFaceOptions,
  FontStyleOptions,
  FontSources,
  FontSetting,
  FontVariant,
  StyledCssFn,
  StyledValue,
  StyledObject,
  Typesettings,
  TypesettingOptions,
  TypesettingsFontsResult,
  TypesettingsFontFaceResult,
};

/**
 * Converts a given value to a `pixel` unit
 * */
export const px = (n: StyledValue) =>
  typeof n === 'number' && n !== 0 ? `${n}px` : n;

/**
 * Parses a number and unit string, returning only the number used
 * */
export const parseSize = (str: FontSizeProperty<StyledValue>) => {
  if (typeof str !== 'string') return str;

  const match = str.trim().match(/([\d.\-+]*)\s*(.*)/);
  return (match && match[1]) || str;
};

/**
 * Returns a normalized FontFamily name where names with
 * a space are automatically wrapped in quotes
 * */
export const normalizeFamily = (family: FontFamilyProperty) =>
  /\s/g.test(family) ? `'${family}'` : family;

/**
 * Returns the font stack from a given family and array of fallbacks
 * */
export const getFontStack = (
  family: FontFamilyProperty,
  fallbacks?: FontFamilyProperty[],
) =>
  [
    normalizeFamily(family),
    fallbacks && fallbacks.map(normalizeFamily).join(', '),
  ]
    .filter(Boolean)
    .join(', ');

/**
 * Generate font styles from a typesettings obj
 * */
export const generateFonts = <T>(
  typesettings: Typesettings,
  options: TypesettingOptions<T> = {},
): TypesettingsFontsResult<T> => {
  /*
    Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
    and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
    However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
    weight. For example, nBold.
  */
  const getStyleLabel = ({ fontStyle, fontWeight }: FontVariant) =>
    `${fontStyle.charAt(0)}${
      typeof fontWeight === 'string'
        ? `${fontWeight.charAt(0).toUpperCase()}${fontWeight.slice(1)}`
        : fontWeight
    }`;

  /*
  Returns a property label to append to the style property
  label depending on the lettercasing type
  */
  const getTransformLabel = (casing: typeof fontCasings | string) =>
    casing === fontCasings.uppercase
      ? '_caps'
      : casing === fontCasings.lowercase
      ? '_lower'
      : '';

  const { family, fallbacks, variants } = typesettings;
  const fontFamily = getFontStack(family, fallbacks);

  const styles = variants.reduce((acc, variant) => {
    const { fontStyle, fontWeight, sources, ...casings } = variant;

    const styleLabel = getStyleLabel(variant);

    // Loop over each casing (ie. normalcase, uppercase, lowercase)
    (Object.keys(casings) as (keyof typeof casings)[]).forEach((casing) => {
      const transformLabel = getTransformLabel(casing);
      const values = variant[casing];

      if (values) {
        values.forEach((setting: FontSetting) => {
          const sizeLabel = `s${parseSize(setting.fontSize)}`;
          const weightLabel = `${styleLabel}${transformLabel}`;

          acc[sizeLabel] = acc[sizeLabel] || {};
          acc[sizeLabel][weightLabel] = {
            fontFamily,
            fontStyle,
            fontWeight,
            fontSize: px(setting.fontSize),
            letterSpacing: setting.letterSpacing
              ? px(setting.letterSpacing)
              : 'initial',
            lineHeight: setting.lineHeight ? px(setting.lineHeight) : 'normal',
            ...(casing !== fontCasings.normalcase && {
              textTransform: casing,
            }),
            ...(options.fontStyles || {}),
          };

          if (typeof options.cssFn === 'function') {
            acc[sizeLabel][weightLabel] = options.cssFn(
              acc[sizeLabel][weightLabel],
            );
          }
        });
      }
    });

    return acc;
  }, {} as TypesettingsFontsResult<StyledObject | StyledCssFn>);

  return (styles as unknown) as TypesettingsFontsResult<T>;
};

/**
 * Generate a @font-face declaration from a typesettings obj
 * */
export const generateFontFace = <T>(
  typesettings: Typesettings,
  options: TypesettingOptions<T> = {},
): TypesettingsFontFaceResult<T> => {
  const { family, variants } = typesettings;

  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    const srcs = (Object.keys(sources) as (keyof typeof sources)[])
      .map((key) => {
        const src = sources[key];
        const format = fontSources[key];

        if (!src) return;

        if (Array.isArray(src) && key === 'locals') {
          return src.map((n: string) => `local('${n}')`);
        }

        if (key === 'eot') {
          return `url(${src}?#iefix) format('${format}')`;
        }

        return `url(${src}) format('${format}')`;
      })
      .filter(Boolean);

    const styles = {
      fontStyle,
      fontWeight,
      fontFamily: normalizeFamily(family),
      src: srcs.join(', '),
      ...options.fontFaceStyles,
    };

    const face = Object.entries(styles).reduce((acc, [key, value]) => {
      const propName = key.replace(
        /([A-Z])/g,
        (match) => `-${match[0].toLowerCase()}`,
      );
      return `${acc}${propName}: ${value};`;
    }, '');

    return `@font-face { ${face} }`;
  });

  const fontFace = declaration.join(' ');

  return typeof options.cssFn === 'function'
    ? options.cssFn(fontFace)
    : fontFace;
};

/**
 * Convenience function to generate font styles and a @font-face declaration
 * */
export const generate = <T>(
  typesettings: Typesettings,
  options?: TypesettingOptions<T>,
) => ({
  fontFace: generateFontFace<T>(typesettings, options),
  fonts: generateFonts<T>(typesettings, options),
});
