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
  eot = 'eot'
}

export enum LetterCasing {
  normalcase = 'normalcase',
  uppercase = 'uppercase',
  lowercase = 'lowercase'
}

export type AdditionalStyles = { [k: string]: TypesettingProperty };

export type TypesettingProperty = string | 0 | number;

export type TypesettingResults = { [size: string]: { [weight: string]: TypesettingStyles } };

export type FontSources = { [K in FontSourceFormats]?: string | string[] };

export interface Typesettings {
  family: FontFamilyProperty;
  fallbacks?: FontFamilyProperty[];
  variants?: TypesettingVariant[];
}

export interface TypesettingVariant {
  fontWeight?: FontWeightProperty;
  fontStyle?: FontStyleProperty;
  sources?: FontSources;
  normalcase?: TypesettingOptions[];
  uppercase?: TypesettingOptions[];
  lowercase?: TypesettingOptions[];
}

export interface TypesettingOptions {
  fontSize: FontSizeProperty<TypesettingProperty>;
  letterSpacing?: LetterSpacingProperty<TypesettingProperty>;
  lineHeight?: LineHeightProperty<TypesettingProperty>;
  leading?: TypesettingProperty;
}

export interface TypesettingStyles extends AdditionalStyles {
  fontFamily?: FontFamilyProperty;
  fontStyle?: FontStyleProperty;
  fontSize?: FontSizeProperty<TypesettingProperty>;
  fontWeight?: FontWeightProperty;
  letterSpacing?: LetterSpacingProperty<TypesettingProperty>;
  lineHeight?: LineHeightProperty<TypesettingProperty>;
  textTransform?: TextTransformProperty;
}
