import {
  FontFace,
  FontFamilyProperty,
  FontSizeProperty,
  FontStyleProperty,
  FontWeightProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  Properties,
} from 'csstype';

export const fontCasings = {
  normalcase: 'normalcase',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
} as const;

export const fontSources = {
  locals: 'locals',
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'ttf',
  otf: 'opentype',
  eot: 'embedded-opentype',
} as const;

type ValueOf<
  T extends Record<string | number | symbol, unknown>
> = T extends object ? keyof T : never;

export type StyledCssFn = (...styles: unknown[]) => unknown;

export type StyledValue = string | number | undefined | null;

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

export type FontSources = {
  [K in ValueOf<typeof fontSources>]?: string | string[] | NodeRequire | false;
};

export interface FontSetting extends StyledObject {
  fontSize: FontSizeProperty<StyledValue>;
  letterSpacing?: LetterSpacingProperty<StyledValue>;
  lineHeight?: LineHeightProperty<StyledValue>;
}

export interface TypesettingOptions<T = StyledCssFn> {
  [k: string]: unknown;
  cssFn?: T;
  fontStyles?: FontStyleOptions;
  fontFaceStyles?: FontFaceOptions;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FontStyleOptions extends Properties<StyledValue> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FontFaceOptions extends FontFace {}

export type TypesettingsFontsResult<T> = {
  [size: string]: {
    [weight: string]: T extends StyledCssFn ? ReturnType<T> : StyledObject;
  };
};

export type TypesettingsFontFaceResult<T> = T extends StyledCssFn
  ? ReturnType<T>
  : string;
