// tslint:disable max-line-length
import {
  FontFamilyProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  TextTransformProperty
} from 'csstype';

export enum FontSourceFormats {
  locals = 'locals',
  woff2 = 'woff2',
  woff = 'woff',
  ttf = 'ttf',
  otf = 'opentype',
  eot = 'embedded-opentype'
}

export enum LetterCasing {
  normalcase = 'normalcase',
  uppercase = 'uppercase',
  lowercase = 'lowercase'
}

export type StyledValue = string | number | undefined | null;

export type StyledObject = { [property: string]: StyledValue };

export type FontSources = { [K in keyof typeof FontSourceFormats]?: string | string[] | NodeRequireFunction | false };

export type TypesettingResults = { [size: string]: { [weight: string]: StyledFont } };

export interface TypesettingOptions<CssFnResult = any> {
  [k: string]: any;
  cssFn?: (styles: StyledObject | string) => CssFnResult;
  fontStyles?: StyledObject;
  fontFaceStyles?: StyledObject;
}

export interface Typesettings {
  family: FontFamilyProperty;
  variants: FontVariant[];
  fallbacks?: FontFamilyProperty[];
}

export interface FontVariant {
  fontStyle: FontStyleProperty;
  fontWeight: FontWeightProperty;
  sources: FontSources;
  normalcase?: FontSetting[];
  uppercase?: FontSetting[];
  lowercase?: FontSetting[];
}

export interface FontSetting {
  fontSize: FontSizeProperty<StyledValue>;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
}

export interface StyledFont extends StyledObject {
  fontFamily: FontFamilyProperty;
  fontStyle?: FontStyleProperty;
  fontSize?: FontSizeProperty<StyledValue>;
  fontWeight?: FontWeightProperty | string;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
  textTransform?: TextTransformProperty | string;
}
