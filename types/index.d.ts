declare enum LetterCasing {
	Normal = 'normalcase',
	Upper = 'uppercase',
	Lower = 'lowercase'
}

export declare const enum FontStyle {
	Normal = 'normal',
	Italic = 'italic'
}

export declare type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export declare type Typesettings = {
  family?: string;
  fallback?: string;
} & {
  [key: string]: FontVariant;
}

export declare type FontVariant = {
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  sources?: FileSources;
} & {
	[Casing in LetterCasing]?: {
  [n: number]: FontSettings;
};
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

export declare const generateFontFace: (typesettings: Typesettings) => string

export declare const generateFonts: (
  typesettings: Typesettings,
  styles?: AdditionalStyles
) => object
