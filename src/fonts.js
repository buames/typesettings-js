/* eslint-disable no-param-reassign, no-nested-ternary */
import merge from 'deepmerge'

/*
  Returns a weight property label‚ prefixed with 'n' for normal or 'i' for italics.
  For example, n700 equals 'normal' with a weight of '700'.
*/
const getStyleLabel = (fontStyle, fontValue) => {
  switch (fontStyle) {
    case 'normal': return `n${ fontValue }`
    case 'italics': return `i${ fontValue }`
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
    case 'normalcase': return ''
    default: return ''
  }
}

/*
  Generates a map of typesettings. We do not return emotionjs classes
  as it would not work with media queries properly.
*/
const generate = (lettercasing, familyVariant, family, fallback) => {
  const { fontStyle, fontValue } = familyVariant
  const sizes = familyVariant[lettercasing]

  if (!sizes) {
    return { }
  }

  return Object.keys(sizes).reduce((accum, size) => {
    const { characterSpacing, lineHeight } = sizes[size]
    const styleLabel = getStyleLabel(fontStyle, fontValue)
    const transformLabel = getTransformLabel(lettercasing)

    accum[`s${ size }`] = { } // font-size property is prefixed with 's'
    accum[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
      fontFamily: `'${ family }', ${ fallback }`,
      fontSize: `${ size }px`,
      fontWeight: `${ fontValue }`,
      fontStyle: `${ fontStyle }`,
      letterSpacing: `${ characterSpacing ? `${ characterSpacing.toFixed(2) }px` : 'initial' }`,
      lineHeight: `${ lineHeight ? `${ lineHeight }px` : 'normal' }`,
      textTransform: `${ lettercasing === 'normalcase' ? 'none' : lettercasing }`,
      textRendering: 'optimizeLegibility',
      webkitFontSmoothing: 'antialiased'
    }
    return accum
  }, { })
}

const generateFonts = (typesettings) => {
  if (typeof typesettings !== 'object') {
    throw new Error('Your typesettings must be an object.')
  }

  const { family, fallback, ...variants } = typesettings

  // Loop over the typeface variants (i.e. 'PostmatesStd-Regular')
  // and create each variant's typesettings for each of their lettingcasing
  const settings = Object.values(variants).map((variant) => {
    const normal = generate('normalcase', variant, family, fallback)
    const upper = generate('uppercase', variant, family, fallback)
    return merge(normal, upper)
  })

  return merge.all(settings)
}

export default generateFonts
