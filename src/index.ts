/* eslint-disable no-nested-ternary */
import {
  FontFamilyProperty,
  FontFaceFontDisplayProperty,
  FontFaceFontFeatureSettingsProperty,
  FontFaceFontStretchProperty,
  FontFaceFontStyleProperty,
  FontFaceFontVariantProperty,
  FontFeatureSettingsProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  Properties,
} from 'csstype';

export type StyledValue = string | number | undefined | null;

export enum FontCasingTypes {
    normalcase = 'normalcase',
    uppercase = 'uppercase',
    lowercase = 'lowercase'
  }

export enum FontSourceTypes {
    locals = 'locals',
    woff2 = 'woff2',
    woff = 'woff',
    ttf = 'ttf',
    otf = 'opentype',
    eot = 'embedded-opentype'
  }

export interface Typesettings {
  family: FontFamilyProperty;
  fallbacks?: FontFamilyProperty[];
  variants: FontVariant[];
}

export interface FontVariant {
  fontStyle: FontStyleProperty;
  fontWeight: FontWeightProperty;
  sources: FontSources;
  normalcase?: FontSetting[];
  uppercase?: FontSetting[];
  lowercase?: FontSetting[];
}

export type FontSources = {
    [K in keyof typeof FontSourceTypes]?: string | string[] | NodeRequireFunction | false
  };

export interface FontSetting extends FontStyles {
  fontSize: FontSizeProperty<StyledValue>;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
}

export interface TypesettingOptions<A = CssFn, B = FontStyles, C = FontFaceStyles> {
  [k: string]: any;
  cssFn?: A;
  fontStyles?: B;
  fontFaceStyles?: C;
}

export type CssFn<T = (style: any) => any> = T;

export interface FontStyles extends Properties<StyledValue> {}

export interface FontFaceStyles extends FontStyles {
  fontDisplay?: FontFaceFontDisplayProperty;
  fontFeatureSettings?: FontFaceFontFeatureSettingsProperty;
  fontStretch?: FontFaceFontStretchProperty;
  fontStyle?: FontFaceFontStyleProperty;
  fontVariant?: FontFaceFontVariantProperty;
  fontVariationSettings?: FontFaceFontVariantProperty;
  MozFontFeatureSettings?: FontFeatureSettingsProperty;
}

export type TypesettingResults = {
  [size: string]: { [weight: string]: FontStyles };
};

/*
  Returns a pixel value or the raw css value
*/
const px = (n: StyledValue) => (
  typeof n === 'number' && n !== 0 ? `${n}px` : n
);

/*
  Parses a number and unit string and returns the size
*/
const parseSize = (str: StyledValue) => {
  if (typeof str !== 'string') return str;

  const match = str.trim().match(/([\d.\-+]*)\s*(.*)/);
  return (match && match[1]) || str;
};

/*
  Returns the font stack
*/
export const getFontStack = (family: FontFamilyProperty, fallbacks?: FontFamilyProperty[]) => ([
  normalizeFamily(family),
  fallbacks && fallbacks.map(normalizeFamily),
].filter(Boolean).join(', '));

/*
  Returns a StyledValue from a given Typesettings obj and a path to the key
*/
export const getValue = <T = StyledValue>(typesettings: Typesettings, ...paths: any[]): T => (
  paths.reduce((_, path) => path.split('.').reduce((acc: any, key: string) => (acc && acc[key] ? acc[key] : null), typesettings), null)
);

/*
  Returns a normalized FontFamily name where names with
  a space are automatically wrapped in quotes
*/
export const normalizeFamily = (family: FontFamilyProperty) => (
  /\s/g.test(family) ? `'${family}'` : family
);

/*
  Generates a map of typesettings
*/
export const generateFonts = (
  typesettings: Typesettings,
  options: TypesettingOptions = { },
): TypesettingResults => {
  /*
    Returns a weight property label‚ prefixed with 'n' for normal, 'i' for italics,
    and 'o' for oblique. For example, n700 equals 'normal' with a weight of '700'.
    However, if the weight is a string (ie 'bold'), this returns the prefix + a capitalized
    weight. For example, nBold.
  */
  const getStyleLabel = ({ fontStyle, fontWeight }: FontVariant) => (
    `${fontStyle.charAt(0)}${typeof fontWeight === 'string'
      ? `${fontWeight.charAt(0).toUpperCase()}${fontWeight.slice(1)}`
      : fontWeight}`
  );

  /*
  Returns a property label to append to the style property
  label depending on the lettercasing type
  */
  const getTransformLabel = (casing: FontCasingTypes | string) => (
    (casing === FontCasingTypes.uppercase) ? '_caps'
      : (casing === FontCasingTypes.lowercase) ? '_lower'
        : ''
  );

  const { family, fallbacks, variants } = typesettings;
  const fontFamily = getFontStack(family, fallbacks);

  const styles = variants.reduce((acc, variant) => {
    const {
      fontStyle, fontWeight, sources, ...casings
    } = variant;
    const styleLabel = getStyleLabel(variant);

    // Loop over each casing (ie. normalcase, uppercase, lowercase)
    Object.keys(casings).forEach((casing) => {
      const transformLabel = getTransformLabel(casing);

      // Now loop over each style object
      variant[casing].forEach((setting: FontSetting) => {
        const sizeLabel = `s${parseSize(setting.fontSize)}`;
        const weightLabel = `${styleLabel}${transformLabel}`;

        acc[sizeLabel] = acc[sizeLabel] || { };
        acc[sizeLabel][weightLabel] = {
          fontFamily,
          fontStyle,
          fontWeight,
          fontSize: px(setting.fontSize),
          letterSpacing: setting.letterSpacing && px(setting.letterSpacing),
          lineHeight: setting.lineHeight ? px(setting.lineHeight) : 'initial',
          textTransform: casing !== FontCasingTypes.normalcase ? casing : 'none',
          ...options.fontStyles || { },
        };

        if (options.cssFn) {
          acc[sizeLabel][weightLabel] = options.cssFn(acc[sizeLabel][weightLabel]);
        }
      });
    });

    return acc;
  }, { });

  return styles;
};

/*
  Generates a fontFace declaration from a typesettings obj
*/
export const generateFontFace = (
  typesettings: Typesettings,
  options: TypesettingOptions = { },
): string => {
  const { family, variants } = typesettings;

  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    const srcs = Object.keys(sources).map((key) => (
      sources[key] && (Array.isArray(sources[key])
        ? sources[key].map((n: string) => (`local('${n}')`))
        : `url(${sources[key]}) format('${FontSourceTypes[key]}')`)
    )).filter(Boolean);

    const styles = {
      fontStyle,
      fontWeight,
      fontFamily: normalizeFamily(family),
      src: srcs.join(', '),
      ...options.fontFaceStyles,
    };

    const face = Object.entries(styles).reduce((acc, [key, value]) => {
      const propName = key.replace(/([A-Z])/g, ((match) => `-${match[0].toLowerCase()}`));
      return `${acc}${propName}: ${value};`;
    }, '');

    return `@font-face { ${face} }`;
  });

  const fontFace = declaration.join(' ');
  return options.cssFn ? options.cssFn(fontFace) : fontFace;
};

/*
  Convenience func
*/
export const generate = (
  typesettings: Typesettings,
  options?: TypesettingOptions,
): { fontFace: string; fonts: TypesettingResults } => ({
  fontFace: generateFontFace(typesettings, options),
  fonts: generateFonts(typesettings, options),
});
