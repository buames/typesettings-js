// tslint:disable max-line-length
export type FontFamily = string;

export type FontStyle = 'italic' | 'normal' | 'oblique' | string;

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'bolder' | 'normal' | 'lighter';

export type LetterCasing = 'normalcase' | 'uppercase' | 'lowercase' | string;

export type Property = string | 0 | number;

export interface Typesettings {
  family: FontFamily;
  fallbacks?: FontFamily[];
  variants?: Variant[];
}

export interface Variant {
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  sources?: {
    locals?: string[];
    eot?: string;
    woff?: string;
    woff2?: string;
    ttf?: string;
  };
  normalcase?: { [k: string]: FontSettings };
  uppercase?: { [k: string]: FontSettings };
  lowercase?: { [k: string]: FontSettings };
}

export interface FontSettings {
  characterSpacing?: Property;
  lineHeight?: Property;
  paragraphSpacing?: Property;
}

export interface AdditionalStyles {
  [k: string]: Property;
}
