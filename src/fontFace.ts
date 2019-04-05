import { Typesettings, FontSourceFormats, TypesettingOptions } from './types';
import { getFamilyName } from './utils';

export const generateFontFace = (
  typesettings: Typesettings,
  options: TypesettingOptions = { }
): string => {
  const { family, variants } = typesettings;

  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    const srcs = Object.keys(sources).map(key => (
      sources[key] && (Array.isArray(sources[key])
        ? sources[key].map((n: string) => (`local('${ n }')`))
        : `url(${ sources[key] }) format('${ FontSourceFormats[key] }')`)
    )).filter(Boolean);

    const styles = {
      fontStyle,
      fontWeight,
      fontFamily: getFamilyName(family),
      src: srcs.join(', '),
      ...options.fontFaceStyles
    };

    const face =  Object.entries(styles).reduce((acc, [key, value]) => {
      const propName = key.replace(/([A-Z])/g, (match => `-${ match[0].toLowerCase() }`));
      return `${acc}${propName}: ${value};`;
    // tslint:disable-next-line: align
    }, '');

    return `@font-face { ${ face } }`;
  });

  const fontFace = declaration.join(' ');
  return options.cssFn ? options.cssFn(fontFace) : fontFace;
};
