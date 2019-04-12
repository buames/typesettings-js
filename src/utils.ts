/* eslint-disable import/no-unresolved, import/extensions */
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
export const px = (n: StyledValue) => (
  typeof n === 'number' && n !== 0 ? `${n}px` : n
);

/*
  Parses a number and unit string and returns the size
*/
export const parseSize = (str: StyledValue) => {
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
