import {
  FontFamilyProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  FontFace,
  Properties,
} from 'csstype';

export type StyledCssFn = (...styles: any[]) => any;

export type StyledValue = string | number | undefined | null;

export interface StyledObject {
  [k: string]: StyledValue;
}

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

export interface FontSetting extends StyledObject {
  fontSize: FontSizeProperty<StyledValue>;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
}

export interface TypesettingOptions<T = StyledCssFn> {
  [k: string]: any;
  cssFn?: T;
  fontStyles?: FontStyleOptions;
  fontFaceStyles?: FontFaceOptions;
}

export interface FontStyleOptions extends Properties<StyledValue> { }

export interface FontFaceOptions extends FontFace { }

export type TypesettingsFontsResult<T> = {
  [size: string]: {
    [weight: string]: T extends StyledCssFn ? ReturnType<T> : StyledObject;
  };
}

export type TypesettingsFontFaceResult<T> = T extends StyledCssFn ? ReturnType<T> : string
