<h1 align="center">
Typesettings

[![npm](https://img.shields.io/npm/v/typesettings-js.svg?style=flat-square)](https://www.npmjs.com/package/typesettings-js)
</h1>

> Typesettings is a handful of utilities to help manage typsettings. It can be used with emotion, styled-components, glamorous or any other CSS-in-JS framework.

## Install

```sh
yarn add typesettings-js
```

## Typesettings

You can generate this (as json) automatically with sketch using the [typesettings sketch plugin](https://github.com/buames/typesettings-sketch-plugin).

```js
const Typesettings = {
  [variant]: {
    fontFamily: String,
    fontFallback: String,
    fontStyle: String,
    fontWeight: Number,
    sources: {
      locals: Array<String>,
      eot: String,
      woff: String,
      woff2: String,
      ttf: String
    },
    [lettercasing]: {
      [size]: {
        characterSpacing: Number,
        lineHeight: Number,
        paragraphSpacing: Number
      }
    }
  }
}
```

**Example**

```js
const Typesettings = {
  regular: {
    fontFamily: 'Helvetica Neue',
    fontFallback: "-apple-system, BlinkMacSystemFont, 'Arial', sans-serif",
    fontStyle: 'normal',
    fontWeight: 400,
    sources: {
      locals: [ 'Font Display Name', 'Font Postscript Name' ],
      eot: require('./font-path.eot'),
      woff: require('./font-path.woff'),
      woff2: require('./font-path.woff2'),
      ttf: require('./font-path.ttf')
    },
    normalcase: {
      10: {
        characterSpacing: 0,
        lineHeight: null,
        paragraphSpacing: 0
      },
      12: {
        characterSpacing: -0.07999999821186066,
        lineHeight: 18,
        paragraphSpacing: 0
      },
      14: {
        characterSpacing: -0.1500000059604645,
        lineHeight: 20,
        paragraphSpacing: 0
      }
    },
    uppercase: {
      12: {
        characterSpacing: 0.1,
        lineHeight: null,
        paragraphSpacing: 0
      },
      ... 
    }
  },
  medium: {
    ...
  },
  bold: {
    ...
  },
  // ... and so on
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
    My font size is 16px and my font weight is regular.
  </Paragraph>
)
```

## Generate Font Face

```sh
generateFontFace(Typesettings: Object): String
```

Generates @font-face from typesettings as a string.

**Example**

```js
import { Globals } from '@emotion/core'
import Typesettings from 'your_typesettings'
import { generateFontFace } from 'typesettings-js'

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
