import { Typesettings, FontSourceFormats } from './types';
import { getFamilyName } from './utils';

export const generateFontFace = ({ family, variants }: Typesettings): string => {
  const declaration = variants.map(({ sources, fontStyle, fontWeight }) => {
    if (!sources || (sources && Object.keys(sources).length === 0)) {
      throw Error('Missing font file sources');
    }

    const srcs = Object.keys(sources).map(key => (
      Array.isArray(sources[key])
        ? sources[key].map((n: string) => (`local('${ n }')`))
        : `url(${ sources[key] }) format('${ FontSourceFormats[key] }')`
    ));

    const face = [
      `font-family: ${ getFamilyName(family) }`,
      fontStyle && `font-style: ${ fontStyle }`,
      fontWeight && `font-weight: ${ fontWeight }`,
      srcs && `src: ${ srcs.join(', ') };`
    ].filter(Boolean);

    return `@font-face { ${ face.join('; ') } }`;
  });

  return declaration.join(' ');
};
