import { Typesettings, FontSourceFormats, TypesettingOptions } from './types';
import { getFamilyName } from './utils';

export const generateFontFace = (
  typesettings: Typesettings,
  options: TypesettingOptions = { }
): string => {
  const { family, variants } = typesettings;
  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    if (!sources || (sources && Object.keys(sources).length === 0)) {
      throw Error('Missing font file sources');
    }

    const srcs = Object.keys(sources).map(key => (
      sources[key] && (Array.isArray(sources[key])
        ? sources[key].map((n: string) => (`local('${ n }')`))
        : `url(${ sources[key] }) format('${ FontSourceFormats[key] }')`)
    )).filter(Boolean);

    const face = [
      `font-family: ${ getFamilyName(family) }`,
      fontStyle && `font-style: ${ fontStyle }`,
      fontWeight && `font-weight: ${ fontWeight }`,
      srcs && `src: ${ srcs.join(', ') };`,
      options.fontFaceStyles
    ].filter(Boolean);

    return `@font-face { ${ face.join('; ') } }`;
  });

  const fontFace = declaration.join(' ');
  return options.cssFn ? options.cssFn(fontFace) : fontFace;
};
