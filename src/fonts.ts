import {
  fontCasings,
  FontSetting,
  FontVariant,
  StyledObject,
  Typesettings,
  TypesettingOptions,
} from './types';
import { getFontStack } from './fontFamilies';
import { parseSize, px } from './units';

export type Fonts = {
  [size: string]: {
    [weight: string]: StyledObject;
  };
};

/**
 * Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
 * and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
 * However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
 * weight. For example, nBold.
 */
const getStyleLabel = ({ fontStyle, fontWeight }: FontVariant) =>
  `${fontStyle.charAt(0)}${
    typeof fontWeight === 'string'
      ? `${fontWeight.charAt(0).toUpperCase()}${fontWeight.slice(1)}`
      : fontWeight
  }`;

/**
 * Create fonts from a typesettings object
 * */
export const createFonts = (
  typesettings: Typesettings,
  options: TypesettingOptions = {},
): Fonts => {
  const { family, fallbacks, variants } = typesettings;
  const fontFamily = getFontStack(family, fallbacks);

  const styles = variants.reduce((acc, variant) => {
    const { fontStyle, fontWeight, sources, ...casings } = variant;

    const styleLabel = getStyleLabel(variant);

    // Loop over each casing (ie. normalcase, uppercase, lowercase)
    (Object.keys(casings) as (keyof typeof casings)[]).forEach((casing) => {
      const transformLabel = fontCasings[casing];
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
            ...(casing !== 'normalcase' && {
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
  }, {} as Fonts);

  return styles;
};
