import { Typesettings, TypesettingOptions } from './types';
import { createFontFace } from './fontFace';
import { createFonts } from './fonts';

/**
 * Convenience function to create font styles and a @font-face declaration
 * */
export const create = <T>(
  typesettings: Typesettings,
  options?: TypesettingOptions<T>,
) => ({
  fontFace: createFontFace<T>(typesettings, options),
  fonts: createFonts<T>(typesettings, options),
});
