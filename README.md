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

## Generate

```sh
generate(typesettings: Object, options?: Object): Object
```

Generate a fontFace declaration and an object of styled objects from your typesettings.

```js
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { generate } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const options = {
  cssFn: css,
  fontFaceStyles: {
    fontDisplay: 'swap'
  },
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased'
  }
}

const { fontFace, fonts } = generate(Typesettings, options)

const TextLabel = styled('p')`
  ${ fonts.s16.n400 };
`

render(
  <div>
    <Global styles={ fontFace } />
    <TextLabel>The quick brown fox jumps over the lazy dog.</TextLabel>
  </div>
)
```

## Generate Fonts

```sh
generateFonts(typesettings: Object, options?: Object): Object
```

Generate styled objects to be used with CSS-in-JS frameworks from your typesettings. By default, `font-family`, `font-size`, `font-style`, `font-weight`, `letter-spacing`, `line-height`, and `text-transform` will be return styles. You can pass in an object of styles that will be added to these.

**Example**

```js
import styled from '@emotion/styled'
import { generateFonts } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const options = {
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased'
  }
}

const fonts = generateFonts(Typesettings, options)

/*
  Outputs an object of styled objects:
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

If you'd prefer to have objects of classnames, add a `cssFn` in the options.

```js
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { generateFonts } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const options = {
  cssFn: css,
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased'
  }
}

const fonts = generateFonts(Typesettings, options)

/*
  Outputs an object  of classnames:
  {
    s10: {
      n400: classname,
      n400_caps: classname,
      i700: classname,
      i700_caps: classname
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
generateFontFace(typesettings: Object, options?: Object): String
```

Generates a @font-face css declariation from typesettings.

**Example**

```js
import { Global, css } from '@emotion/core'
import { generateFontFace } from 'typesettings-js'
import Typesettings from 'your_typesettings'

const options = {
  cssFn: css,
  fontFaceStyles: {
    fontDisplay: 'swap'
  }
}

const fontFace = generateFontFace(Typesettings, options)

render(
  <div>
    <Global styles={ fontFace }
    />
  </div>
)
```
