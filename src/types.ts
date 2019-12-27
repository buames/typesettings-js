import {
  FontFace,
  FontFamilyProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  Properties,
  Globals,
} from 'csstype';

export const fontCasings = {
  normalcase: '',
  uppercase: '_caps',
  lowercase: '_lower',
} as const;

export const fontSources = {
  locals: 'locals',
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'ttf',
  otf: 'opentype',
  eot: 'embedded-opentype',
} as const;

export type StyledCssFn = <T, R>(...styles: T[]) => R;

export type StyledValue = string | number | undefined | null;

type LocalsFontSource = Record<'locals', string | string[]>;

type FormattedFontSource = Record<
  Exclude<keyof typeof fontSources, 'locals'>,
  string | NodeJS.Require
>;

export type FontSources = Partial<LocalsFontSource & FormattedFontSource>;

export interface StyledObject {
  [k: string]: StyledValue;
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

export interface FontSetting extends StyledObject {
  fontSize: FontSizeProperty<StyledValue>;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
}

export interface TypesettingOptions {
  [k: string]: unknown;
  cssFn?: StyledCssFn;
  fontStyles?: FontStyleOptions;
  fontFaceStyles?: FontFaceOptions;
}

export interface FontStyleOptions extends Properties<StyledValue> {
  WebkitFontSmoothing?:
    | Globals
    | 'auto'
    | 'antialiased'
    | 'subpixel-antialiased'
    | 'none';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FontFaceOptions extends FontFace {}
