import { FileSources, Typesettings } from './types'

const getSources = (sources: FileSources) => {
  const srcs = []

  if (sources.locals) {
    const locals = sources.locals.map(name => `local('${ name }')`)
    srcs.push(...locals)
  }

  const files = [
    sources.eot && { src: `${ sources.eot }#iefix`, format: 'embedded-opentype' },
    sources.woff2 && { src: sources.woff2, format: 'woff2' },
    sources.woff && { src: sources.woff, format: 'woff' },
    sources.ttf && { src: sources.ttf, format: 'ttf' }
  ].filter(Boolean)

  if (files.length > 0) {
    files.forEach(file => srcs.push(`url(${ file.src }) format(${ file.format })`))
  }

  return `src: ${ srcs.join(',') }`
}

const generateFontFace = (typesettings: Typesettings) => {
  if (typeof typesettings !== 'object') {
    throw TypeError('Typesettings must be an object')
  }

  const { family, fallback, ...variants } = typesettings
  const fontFace = Object.values(variants).map((variant) => {
    if (!variant.sources) {
      throw Error(`Missing font file sources for ${ variant }`)
    }

    const face = [
      `font-family: ${ family }`,
      `font-weight: ${ variant.fontWeight }`,
      `font-style: ${ variant.fontStyle }`
    ]

    if (variant.sources) {
      if (variant.sources.eot) {
        face.push(`src: url(${ variant.sources.eot })`)
      }

      face.push(getSources(variant.sources))
    }

    return `@font-face { ${ face.join(';') } };`
  }).join('')

  return fontFace
}

export {
  generateFontFace
}
