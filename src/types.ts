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

export type TypesettingProperty = string | 0 | number;

export type TypesettingLetterCasing = 'normalcase' | 'uppercase' | 'lowercase' | string;

export type AdditionalStyles = { [k: string]: TypesettingProperty };

export interface Typesettings {
  family: FontFamilyProperty;
  fallbacks?: FontFamilyProperty[];
  variants?: TypesettingVariant[];
}

export interface TypesettingVariant {
  fontWeight?: FontWeightProperty;
  fontStyle?: FontStyleProperty;
  sources?: {
    locals?: string[];
    eot?: string;
    woff?: string;
    woff2?: string;
    ttf?: string;
  };
  normalcase?: { [k: string]: TypesettingOptions };
  uppercase?: { [k: string]: TypesettingOptions };
  lowercase?: { [k: string]: TypesettingOptions };
}

export interface TypesettingOptions {
  characterSpacing?: LetterSpacingProperty<TypesettingProperty>;
  lineHeight?: LineHeightProperty<TypesettingProperty>;
  paragraphSpacing?: TypesettingProperty;
}

export interface TypesettingResult extends AdditionalStyles {
  fontFamily?: FontFamilyProperty;
  fontStyle?: FontStyleProperty;
  fontSize?: FontSizeProperty<TypesettingProperty>;
  fontWeight?: FontWeightProperty;
  letterSpacing?: LetterSpacingProperty<TypesettingProperty>;
  lineHeight?: LineHeightProperty<TypesettingProperty>;
  textTransform?: TextTransformProperty;
}
