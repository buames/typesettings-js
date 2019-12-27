import { fontSources, Typesettings, TypesettingOptions } from './types';
import { normalizeFontFamily } from './fontFamilies';

/**
 * Create a @font-face declaration from a typesettings object
 * */
export const createFontFace = (
  typesettings: Typesettings,
  options: TypesettingOptions = {},
): string => {
  const { family, variants } = typesettings;

  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    const srcs = (Object.keys(sources) as (keyof typeof sources)[])
      .map((key) => {
        let src = sources[key];
        const format = fontSources[key];

        if (src === null || src === undefined) return;

        // Src is a local source
        if (Array.isArray(src) && key === 'locals') {
          return src.map((n: string) => `local('${n}')`);
        }

        // Src is a require()
        if (!Array.isArray(src) && typeof src === 'object') {
          src = ((src as unknown) as { default: string })?.default || src;
        }

        if (key === 'eot') {
          return `url(${src}?#iefix) format('${format}')`;
        }

        return `url(${src}) format('${format}')`;
      })
      .filter(Boolean);

    const styles = {
      fontStyle,
      fontWeight,
      fontFamily: normalizeFontFamily(family),
      src: srcs.join(', '),
      ...options.fontFaceStyles,
    };

    const face = Object.entries(styles).reduce((acc, [key, value]) => {
      const propName = key.replace(
        /([A-Z])/g,
        (match) => `-${match[0].toLowerCase()}`,
      );
      return `${acc}${propName}: ${value};`;
    }, '');

    return `@font-face { ${face} }`;
  });

  const fontFace = declaration.join(' ');
  return fontFace;
};
