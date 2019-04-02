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

export type StyledValue = string | number | undefined;

export type StyledObject = { [property: string]: StyledValue };

export type FontSources = { [K in FontSourceFormats]?: string | string[] | NodeRequireFunction | false };

export type TypesettingResults = { [size: string]: { [weight: string]: StyledFont } };

export interface TypesettingOptions {
  [k: string]: any;
  cssFn?: (styles: StyledObject | string) => any;
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
  letterSpacing?: LetterSpacingProperty<StyledValue> | null;
  lineHeight?: LineHeightProperty<StyledValue> | null;
}

export interface StyledFont extends StyledObject {
  fontFamily: FontFamilyProperty;
  fontStyle?: FontStyleProperty;
  fontSize?: FontSizeProperty<StyledValue>;
  fontWeight?: FontWeightProperty;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
  textTransform?: TextTransformProperty;
}
