import { FontFamilyProperty } from 'csstype';

import {
  AdditionalStyles,
  LetterCasing,
  Typesettings,
  TypesettingProperty,
  TypesettingResults,
  TypesettingVariant,
  TypesettingOptions
} from './types';

import {
  getFontStack,
  parseSize
} from './utils';

/*
  Returns a pixel value or the raw css value
*/
const px = (n: TypesettingProperty) => (
  typeof n === 'number' && n !== 0 ? `${ n }px` : n
);

/*
  Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
  and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
  However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
  weight. For example, nBold.
*/
const getStyleLabel = ({ fontStyle, fontWeight }: TypesettingVariant) => (
  `${ fontStyle.charAt(0) }${ typeof fontWeight === 'string'
    ? `${ fontWeight.charAt(0).toUpperCase() }${ fontWeight.slice(1) }`
    : fontWeight }`
);

/*
  Returns a property label to append to the style property
  label depending on the lettercasing type
*/
const getTransformLabel = (casing: LetterCasing | string) => (
  (casing === LetterCasing.uppercase) ? '_caps'
    : (casing === LetterCasing.lowercase) ? '_lower'
    : ''
);

/*
  Variant reducer
*/
const create = (
  fontFamily: FontFamilyProperty,
  styles: AdditionalStyles = { }
) => (
  acc: any,
  variant: TypesettingVariant
) => {
  const { fontStyle, fontWeight, sources, ...casings } = variant;
  const styleLabel = getStyleLabel(variant);
  Object.keys(casings).forEach((casing) => {
    const transformLabel = getTransformLabel(casing);

    variant[casing].forEach((setting: TypesettingOptions) => {
      const sizeLabel = `s${ parseSize(setting.fontSize) }`;

      acc[sizeLabel] = acc[sizeLabel] || { };
      acc[sizeLabel][`${ styleLabel }${ transformLabel }`] = {
        fontFamily,
        fontStyle,
        fontWeight,
        fontSize: px(setting.fontSize),
        letterSpacing: setting.letterSpacing && px(setting.letterSpacing),
        lineHeight: setting.lineHeight && px(setting.lineHeight),
        textTransform: casing !== 'normalcase' ? casing : 'none',
        ...styles
      };
    });
  });

  return acc;
};

/*
  Generates a map of typesettings
*/
export const generateFonts = (
  typesettings: Typesettings,
  styles?: AdditionalStyles
): TypesettingResults => {
  const { family, fallbacks, variants } = typesettings;
  const fontFamily = getFontStack(family, fallbacks);
  return variants.reduce(create(fontFamily, styles), { });
};
