/* eslint-disable object-curly-newline, no-param-reassign */
const merge = require('deepmerge')

/*
  Returns a weight property label‚ prefixed with 'n' for normal or 'i' for italics.
  For example, n700 equals 'normal' with a weight of '700'.
*/
const getStyleLabel = (fontStyle, fontWeight) => {
  switch (fontStyle) {
    case 'normal': return `n${ fontWeight }`
    case 'italics': return `i${ fontWeight }`
    default: return ''
  }
}

/*
  Returns a property label to append to the style property
  label depending on the lettercasing type
*/
const getTransformLabel = (lettercasing) => {
  switch (lettercasing) {
    case 'uppercase': return '_caps'
    case 'lowercase': return '_lower'
    case 'normalcase': return ''
    default: return ''
  }
}

/*
  Generates a map of typesettings. We do not return emotionjs classes
  as it would not work with media queries properly.
*/
const generate = (variant, options) => {
  const { casing, styles, family, fallback } = options
  const sizes = variant[casing]

  if (!sizes) {
    return { }
  }

  return Object.keys(sizes).reduce((accum, size) => {
    const { characterSpacing, lineHeight } = sizes[size]
    const styleLabel = getStyleLabel(variant.fontStyle, variant.fontWeight)
    const transformLabel = getTransformLabel(casing)

    accum[`s${ size }`] = { } // font-size property is prefixed with 's'
    accum[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
      fontFamily: fallback ? `${ family }, ${ fallback }` : family,
      fontSize: `${ size }px`,
      fontStyle: variant.fontStyle,
      fontWeight: variant.fontWeight,
      letterSpacing: `${ characterSpacing ? `${ characterSpacing.toFixed(2) }px` : 'initial' }`,
      lineHeight: `${ lineHeight ? `${ lineHeight }px` : 'normal' }`,
      textTransform: `${ casing === 'normalcase' ? 'none' : casing }`,
      ...styles || { }
    }

    return accum
  }, { })
}

const generateFonts = (typesettings, styles) => {
  if (typeof typesettings !== 'object') {
    throw new Error('Your typesettings must be an object.')
  }

  const { family, fallback, ...variants } = typesettings

  // Loop over the typeface variants and create each variant's
  // typesettings for each of their lettingcasing
  const settings = Object.values(variants).map((variant) => {
    const shared = { styles, family, fallback }
    const normal = generate(variant, { casing: 'normalcase', ...shared })
    const upper = generate(variant, { casing: 'uppercase', ...shared })
    const lower = generate(variant, { casing: 'lowercase', ...shared })
    return merge.all([ normal, upper, lower ])
  })

  return merge.all(settings)
}

export default generateFonts
