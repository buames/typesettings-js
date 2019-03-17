// tslint:disable align
import merge from 'deepmerge';
import {
  AdditionalStyles,
  FontFamily,
  LetterCasing,
  Property,
  Variant,
  Typesettings
} from './types';

const px = (n: Property, amount: number = 0) => (
  typeof n === 'number' && n !== 0 ? `${ n.toFixed(amount) }px` : n
);

/*
  Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
  and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
  However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
  weight. For example, nBold.
*/
const getStyleLabel = ({ fontStyle, fontWeight }: Variant) => (
  `${ fontStyle.charAt(0) }${ typeof fontWeight === 'string'
    ? `${ fontWeight.charAt(0).toUpperCase() }${ fontWeight.slice(1) }`
    : fontWeight }`
);

/*
  Returns a property label to append to the style property
  label depending on the lettercasing type
*/
const getTransformLabel = (casing: LetterCasing) => (
  (casing === 'uppercase') ? '_caps'  : (casing === 'lowercase') ? '_lower' : ''
);

/*
  Returns a normalized FontFamily name where names with
  a space are automatically wrapped in quotes
*/
const getFamilyName = (family: FontFamily) => (
  /\s/g.test(family) ? `'${ family }'` : family
);

/*
  Generates a map of typesettings. We do not return emotionjs classes
  as it would not work with media queries properly.
*/
export const generateFonts = (typesettings: Typesettings, styles?: AdditionalStyles) => {
  const { variants, family, fallbacks } = typesettings;
  const fontFamily = [
    getFamilyName(family),
    fallbacks && fallbacks.map(name => getFamilyName(name))
  ].filter(Boolean).join(', ');

  const settings = variants.map((variant) => {
    const styleLabel = getStyleLabel(variant);
    const style = {
      fontFamily,
      fontStyle: variant.fontStyle,
      fontWeight: variant.fontWeight,
      ...styles || { }
    };

    const sets = ['normalcase', 'uppercase', 'lowercase'].map((casing) => {
      const sizes = variant[casing];

      if (!sizes) return { };

      const transformLabel = getTransformLabel(casing);
      return Object.keys(sizes).reduce((acc, size) => {
        const { characterSpacing, lineHeight } = sizes[size];

        acc[`s${ size }`] = { };
        acc[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
          ...style,
          fontSize: px(parseFloat(size)),
          letterSpacing: characterSpacing && px(characterSpacing, 2),
          lineHeight: lineHeight && px(lineHeight),
          textTransform: casing !== 'normalcase' ? casing : 'none'
        };

        return acc;
      }, { });
    });

    return merge.all(sets.filter(Boolean));
  });

  return merge.all(settings);
};
