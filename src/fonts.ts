// tslint:disable align
import deepmerge from 'deepmerge';
import {
  AdditionalStyles,
  FontFamily,
  GenerateFontsResult,
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
const getTransformLabel = (lettercasing: LetterCasing) => {
  switch (lettercasing) {
    case 'uppercase': return '_caps';
    case 'lowercase': return '_lower';
    default: return '';
  }
};

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
const generate = ({
  casing,
  family,
  fallbacks,
  variant,
  styles
}: {
  casing: LetterCasing;
  family: FontFamily;
  fallbacks?: FontFamily[];
  variant: Variant;
  styles?: AdditionalStyles;
}) => {
  const sizes = variant[casing];

  if (!sizes) {
    return { };
  }

  const transformLabel = getTransformLabel(casing);

  const fontFamily = [
    getFamilyName(family),
    fallbacks && fallbacks.map(name => getFamilyName(name))
  ].filter(Boolean);

  return Object.keys(sizes).reduce((acc, size) => {
    const { characterSpacing, lineHeight } = sizes[size];
    const styleLabel = getStyleLabel(variant);

    acc[`s${ size }`] = { };
    acc[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
      fontFamily: fontFamily.join(', '),
      fontSize: px(parseFloat(size)),
      fontStyle: variant.fontStyle,
      fontWeight: variant.fontWeight,
      letterSpacing: characterSpacing && px(characterSpacing, 2),
      lineHeight: lineHeight && px(lineHeight),
      textTransform: casing !== 'normalcase' ? casing : 'normal',
      ...styles || { }
    };

    return acc;
  }, { });
};

export const generateFonts = (
  typesettings: Typesettings,
  styles?: AdditionalStyles
): GenerateFontsResult => {
  const { family, fallbacks, variants } = typesettings;
  const settings = variants.map((variant) => {
    const sets = ['normalcase', 'uppercase', 'lowercase'].map(casing => (
      variant[casing] && generate({ casing, family, fallbacks, variant, styles })
    ));

    return deepmerge.all(sets.filter(Boolean));
  });

  return deepmerge.all<GenerateFontsResult>(settings);
};
