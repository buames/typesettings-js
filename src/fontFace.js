const getSources = (sources) => {
  const srcs = [ ]

  if (sources.locals) {
    const locals = sources.locals.map(name => `local('${ name }')`)
    srcs.push(...locals)
  }

  if (sources.eot) {
    srcs.push(`url(${ sources.eot }#iefix) format('embedded-opentype')`)
  }

  if (sources.woff2) {
    srcs.push(`url(${ sources.woff2 }) format('woff2')`)
  }

  if (sources.woff) {
    srcs.push(`url(${ sources.woff }) format('woff')`)
  }

  if (sources.ttf) {
    srcs.push(`url(${ sources.ttf }) format('truetype')`)
  }

  return `src: ${ srcs.join(',') }`
}

const generateFontFace = (typesettings) => {
  if (typeof typesettings !== 'object') {
    throw new Error('Your typesettings must be an object.')
  }

  const { family, fallback, ...variants } = typesettings

  const fontFace = Object.values(variants).map((variant) => {
    const face = [
      `font-family: ${ family }`,
      `font-weight: ${ variant.fontValue }`,
      `font-style: ${ variant.fontStyle }`
    ]

    if (variant.sources) {
      if (variant.sources.eot) {
        face.push(`src: url(${ variant.sources.eot })`)
      }
      face.push(getSources(variant.sources))
    }

    return `@fontFace { ${ face.join(';') } };`
  }).join('')

  return fontFace
}

export default generateFontFace
