import { Typesettings, TypesettingOptions, TypesettingResults } from './types';
import { generateFontFace } from './fontFace';
import { generateFonts } from './fonts';

export const generate = (
  typesettings: Typesettings,
  options?: TypesettingOptions
): { fontFace: string, fonts: TypesettingResults } => ({
  fontFace: generateFontFace(typesettings, options),
  fonts: generateFonts(typesettings, options)
});
