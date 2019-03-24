import { Typesettings, TypesettingOptions, TypesettingResults } from './types';
import { generateFontFace } from './fontFace';
import { generateFonts } from './fonts';

export const generate = (
  typesettings: Typesettings,
  options?: TypesettingOptions
): { fontFace: string, fonts: TypesettingResults } => {
  const fontFace = generateFontFace(typesettings, {
    cssFn: options.cssFn,
    fontFaceStyles: options.fontFaceStyles
  });

  const fonts = generateFonts(typesettings, {
    cssFn: options.cssFn,
    fontStyles: options.fontStyles
  });

  return { fontFace, fonts };
};

export * from './types';
export * from './fontFace';
export * from './fonts';
