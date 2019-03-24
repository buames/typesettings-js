import {
  LetterCasing,
  StyledValue,
  Typesettings,
  TypesettingFontsOptions,
  TypesettingResults,
  FontVariant,
  FontSetting
} from './types';

import {
  getFontStack,
  parseSize
} from './utils';

/*
  Returns a pixel value or the raw css value
*/
const px = (n: StyledValue) => (
  typeof n === 'number' && n !== 0 ? `${ n }px` : n
);

/*
  Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
  and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
  However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
  weight. For example, nBold.
*/
const getStyleLabel = ({ fontStyle, fontWeight }: FontVariant) => (
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
  Generates a map of typesettings
*/
export const generateFonts = (
  typesettings: Typesettings,
  options: TypesettingFontsOptions = { }
): TypesettingResults => {
  const { family, fallbacks, variants } = typesettings;
  const fontFamily = getFontStack(family, fallbacks);

  const styles: { } = variants.reduce((acc, variant) => {
    const { fontStyle, fontWeight, sources, ...casings } = variant;
    const styleLabel = getStyleLabel(variant);

    // Loop over each casing (ie. normalcase, uppercase, lowercase)
    Object.keys(casings).forEach((casing) => {
      const transformLabel = getTransformLabel(casing);

      // Now loop over each style object
      variant[casing].forEach((setting: FontSetting) => {
        const sizeLabel = `s${ parseSize(setting.fontSize) }`;
        const weightLabel = `${ styleLabel }${ transformLabel }`;

        acc[sizeLabel] = acc[sizeLabel] || { };
        acc[sizeLabel][weightLabel] = {
          fontFamily,
          fontStyle,
          fontWeight,
          fontSize: px(setting.fontSize),
          letterSpacing: setting.letterSpacing && px(setting.letterSpacing),
          lineHeight: setting.lineHeight && px(setting.lineHeight),
          textTransform: casing !== LetterCasing.normalcase ? casing : 'none',
          ...options.styles || { }
        };

        if (options.cssFn) {
          acc[sizeLabel][weightLabel] = options.cssFn(acc[sizeLabel][weightLabel]);
        }
      });
    });

    return acc;
  // tslint:disable-next-line: align
  }, { });

  return styles;
};
