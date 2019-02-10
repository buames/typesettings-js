import deepmerge from 'deepmerge'
import {
  FontStyle,
  FontWeight,
  AdditionalStyles,
  FontVariant,
  LetterCasing,
  Typesettings
} from './types'

/*
  Returns a weight property label‚ prefixed with 'n' for normal or 'i' for italics.
  For example, n700 equals 'normal' with a weight of '700'.
*/
export const getStyleLabel = (fontStyle: FontStyle, fontWeight: FontWeight) => {
  switch (fontStyle) {
    case FontStyle.Normal: return `n${ fontWeight }`
    case FontStyle.Italic: return `i${ fontWeight }`
    default: return ''
  }
}

/*
  Returns a property label to append to the style property
  label depending on the lettercasing type
*/
export const getTransformLabel = (lettercasing: LetterCasing) => {
  switch (lettercasing) {
    case LetterCasing.Upper: return '_caps'
    case LetterCasing.Lower: return '_lower'
    case LetterCasing.Normal: return ''
    default: return ''
  }
}

export const toPx = ((n: number | string) => (typeof n === 'number' ? `${ n }px` : n))

/*
  Generates a map of typesettings. We do not return emotionjs classes
  as it would not work with media queries properly.
*/
interface Options {
  variant: FontVariant
  casing: LetterCasing
  family: string
  fallback?: string
  styles?: AdditionalStyles
}

export const generate = (options: Options) => {
  const { variant, casing, family, fallback, styles } = options
  const sizes = variant[casing]

  if (!sizes) {
    return { }
  }

  return Object.keys(sizes).reduce(
    (accum, size) => {
      const { characterSpacing, lineHeight } = sizes[size]
      const styleLabel = getStyleLabel(variant.fontStyle, variant.fontWeight)
      const transformLabel = getTransformLabel(casing)

      accum[`s${ size }`] = { }
      accum[`s${ size }`][`${ styleLabel }${ transformLabel }`] = {
        fontFamily: fallback ? `${ family }, ${ fallback }` : family,
        fontSize: toPx(size),
        fontStyle: variant.fontStyle,
        fontWeight: variant.fontWeight,
        letterSpacing: `${ characterSpacing ? toPx(characterSpacing.toFixed(2)) : undefined }`,
        lineHeight: `${ lineHeight ? toPx(lineHeight) : 'normal' }`,
        textTransform: `${ casing !== LetterCasing.Normal ? casing : undefined }`,
        ...styles || { }
      }

      return accum
    },
    { }
  )
}

const generateFonts = (typesettings: Typesettings, styles?: AdditionalStyles) => {
  if (typeof typesettings !== 'object') {
    throw TypeError('Typesettings must be an object')
  }

  const { family, fallback, ...variants } = typesettings
  const settings = Object.values(variants).map((variant) => {
    const sets = Object.keys(LetterCasing).map(casing => (
      generate({
        variant, styles, family, fallback, casing: LetterCasing[casing]
      })
    ))

    return deepmerge.all(sets)
  })

  return deepmerge.all(settings)
}

export default generateFonts
