export enum LetterCasing {
  Normal = 'normalcase',
  Upper = 'uppercase',
  Lower = 'lowercase'
}

export enum FontStyle {
  normal = 'normal',
  italic = 'italic'
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export type Typesettings = {
  family?: string;
  fallback?: string;
} & {
  [key: string]: FontVariant;
}

export type FontVariant = {
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  sources?: FileSources;
} & {
  [Casing in LetterCasing]?: { [n: number]: FontSettings };
}

export interface FileSources {
  locals?: string[]
  eot?: string
  woff?: string
  woff2?: string
  ttf?: string
}

export interface FontSettings {
  characterSpacing?: number
  lineHeight?: number
  paragraphSpacing?: number
}

export interface AdditionalStyles {
  [k: string]: string | number
}
