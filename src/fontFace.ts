import { Typesettings } from './types';

export const generateFontFace = (typesettings: Typesettings) => {
  const { family, variants } = typesettings;

  const fontFamily = /\s/g.test(family) ? `'${ family }'` : family;

  const fontFace = variants.map((variant) => {
    const { sources, fontStyle, fontWeight } = variant;

    if (!sources || (sources && Object.keys(sources).length === 0)) {
      throw Error('Missing font file sources');
    }

    const srcs = [
      sources.locals && sources.locals.map(name => (`local('${ name }')`)),
      sources.eot && `url(${ sources.eot }#iefix) format('embedded-opentype')`,
      sources.woff2 && `url(${ sources.woff2 }) format('woff2')`,
      sources.woff && `url(${ sources.woff }) format('woff')`,
      sources.ttf && `url(${ sources.ttf }) format('ttf')`
    ].filter(Boolean);

    const face = [
      `font-family: ${ fontFamily }`,
      `font-weight: ${ fontWeight }`,
      fontStyle && `font-style: ${ fontStyle }`,
      sources.eot && `src: url(${ sources.eot })`,
      srcs && `src: ${ srcs.join(', ') };`
    ].filter(Boolean);

    return `@font-face { ${ face.join('; ') } }`;
  }).join(' ');

  return fontFace;
};
