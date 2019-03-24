<h1 align="center">
Typesettings

[![npm](https://img.shields.io/npm/v/typesettings-js.svg?style=flat-square)](https://www.npmjs.com/package/typesettings-js)
[![codecov](https://codecov.io/gh/buames/typesettings-js/branch/master/graph/badge.svg)](https://codecov.io/gh/buames/typesettings-js)
[![npm](https://img.shields.io/bundlephobia/min/typesettings-js.svg)](https://bundlephobia.com/result?p=typesettings-js)
[![npm](https://img.shields.io/bundlephobia/minzip/typesettings-js.svg)](https://bundlephobia.com/result?p=typesettings-js)
</h1>

> Typesettings is a handful of utilities to help manage typsettings. It can be used with emotion, styled-components, glamorous or any other CSS-in-JS framework.

## Install

```sh
yarn add typesettings-js
```

## Typesettings

```js
const Typesettings = {
  family: String,
  fallbacks: Array<String>,
  variants: Array<{
    fontStyle: 'italic' | 'normal' | 'oblique' | string,
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'bolder' | 'normal' | 'lighter',
    sources: {
      locals: Array<String>,
      eot: String,
      woff: String,
      woff2: String,
      ttf: String
    },
    ['normalcase' | 'uppercase' | 'lowercase']: [
      {
        fontSize: String | 0 | Number,
        letterSpacing: String | 0 | Number | null,
        lineHeight: String | 0 | Number | null
      }
      ...
    ]
  }>
}
```

**Example**

```js
const Typesettings = {
  family: 'Helvetica Neue',
  fallbacks: [ '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif' ],
  variants: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      sources: {
        locals: [ 'Font Display Name', 'Font Postscript Name' ],
        eot: require('./font-path.eot'),
        woff: require('./font-path.woff'),
        woff2: require('./font-path.woff2'),
        ttf: require('./font-path.ttf')
      },
      normalcase: [
        {
          fontSize: 10,
          letterSpacing: 0,
          lineHeight: null
        },
        {
          fontSize: 12,
          letterSpacing: -0.08,
          lineHeight: 18
        },
        {
          fontSize: 14,
          letterSpacing: -0.15,
          lineHeight: 20
        }
      ],
      uppercase: [
        {
          fontSize: 12,
          letterSpacing: 0.1,
          lineHeight: null
        },
        ...
      ]
    },
    // ... and so on
  ]
}
```

## Generate Fonts

```sh
generateFonts(Typesettings: Object, styles?: Object): Object
```

Generates a map of typesettings to be used with CSS-in-JS frameworks. By default, `font-family`, `font-size`, `font-style`, `font-weight`, `letter-spacing`, `line-height`, and `text-transform` will be return styles. You can pass in an object of styles that will be added to these.

**Example**

```js
import { styled } from '@emotion/core'
import { generateFonts } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const styles = {
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased'
}

const fonts = generateFonts(Typesettings, styles)

/*
  Outputs an object like this:
  {
    s10: {
      n400: { ... },
      n400_caps: { ... },
      i700: { ... },
      i700_caps: { ... }
      ...
    },
    s11: {
      ...
    }
  }
*/

const Paragraph = styled('p')`
  ${ fonts.s16.n400 };
`

render(
  <Paragraph>
    My font size is 16 and my font weight is regular.
  </Paragraph>
)
```

## Generate Font Face

```sh
generateFontFace(Typesettings: Object): String
```

Generates a @font-face css declariation from typesettings.

**Example**

```js
import { Globals } from '@emotion/core'
import { generateFontFace } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const fontFace = generateFontFace(Typesettings)

render(
  <div>
    <Global styles={ css`
        ${ fontFace };
        ...
      `}
    />
  </div>
)
```
