/* eslint-disable no-param-reassign */
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
const generate = (lettercasing, variant, styles) => {
  const { fontStyle, fontWeight } = variant
  const sizes = variant[lettercasing]

  if (!sizes) {
    return { }
  }

  return Object.keys(sizes).reduce((accum, size) => {
    const { characterSpacing, lineHeight } = sizes[size]
    const styleLabel = getStyleLabel(fontStyle, fontWeight)
    const transformLabel = getTransformLabel(lettercasing)

    accum[`s${ size }`] = { } // font-size property is prefixed with 's'
    accum[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
      fontFamily: variant.fontFallback
        ? `'${ variant.fontFamily }', ${ variant.fontFallback }`
        : variant.fontFamily,
      fontSize: `${ size }px`,
      fontWeight,
      fontStyle,
      letterSpacing: `${ characterSpacing ? `${ characterSpacing.toFixed(2) }px` : 'initial' }`,
      lineHeight: `${ lineHeight ? `${ lineHeight }px` : 'normal' }`,
      textTransform: `${ lettercasing === 'normalcase' ? 'none' : lettercasing }`,
      ...styles || { }
    }

    return accum
  }, { })
}

const generateFonts = (typesettings, styles) => {
  if (typeof typesettings !== 'object') {
    throw new Error('Your typesettings must be an object.')
  }

  // Loop over the typeface variants and create each variant's
  // typesettings for each of their lettingcasing
  const settings = Object.values(typesettings).map((variant) => {
    const normal = generate('normalcase', variant, styles)
    const upper = generate('uppercase', variant, styles)
    const lower = generate('lowercase', variant, styles)
    return merge.all([ normal, upper, lower ])
  })

  return merge.all(settings)
}

export default generateFonts
