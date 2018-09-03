<h1 align="center">
Typesettings

[![npm](https://img.shields.io/npm/v/typesettings-js.svg?style=flat-square)](https://www.npmjs.com/package/typesettings-js)
</h1>

> Typesettings is a handful of utilities to help keep managing typography consistent. It can be used with emotion, styled-components, glamorous or any other CSS-in-JS framework.

## Install

```sh
npm i --save typesettings-js

yarn add typesettings-js
```

## Typesettings Object

You can generate this (as json) automatically with sketch using the [typesettings sketch plugin](https://github.com/buames/typesettings-sketch-plugin).

```js
const Typesettings = {
  family: String,
  fallback: String,
  // all other keys are considered 'variants' of the typeface
  [variant]: {
    fontStyle: String,
    fontWeight: Number,
    sources: {
      locals: Array< String >,
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
  family: 'Helvetica Neue',
  fallback: "-apple-system, BlinkMacSystemFont, 'Arial', sans-serif",
  regular: {
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


## API methods

> Using [emotion](https://github.com/emotion-js/emotion) within the examples.

### `generateFonts(Typesettings)`

Generates a map of typesettings to be used with CSS-in-JS frameworks.

```js
import { styled } from '@emotion/core'
import Typesettings from 'your_typesettings'
import { generateFonts } from 'typesettings-js'

const fonts = generateFonts(Typesettings)

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

### `generateFontFace(Typesettings)`

Generates @fontFace from typesettings as a string.

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
