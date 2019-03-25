
# Typesettings

Typesettings is a handful of utilities to help manage typsettings. It can be used with emotion, styled-components, glamorous or any other CSS-in-JS framework.

[![npm](https://img.shields.io/npm/v/typesettings-js.svg?style=flat-square)](https://www.npmjs.com/package/typesettings-js)
[![codecov](https://codecov.io/gh/buames/typesettings-js/branch/master/graph/badge.svg)](https://codecov.io/gh/buames/typesettings-js)
[![npm](https://img.shields.io/bundlephobia/min/typesettings-js.svg)](https://bundlephobia.com/result?p=typesettings-js)
[![npm](https://img.shields.io/bundlephobia/minzip/typesettings-js.svg)](https://bundlephobia.com/result?p=typesettings-js)

#### Install

```sh
yarn add typesettings-js
```

#### Contents

- [Typesettings](#typesettings)
- [Configuration](#configuration)
  - [Class Names](#class-names)
  - [Additional Font Styles](#additional-font-styles)
  - [Additional Font Face Styles](#additional-font-face-styles)
- [API](#api)
  - [generate()](#generate())
  - [generateFonts()](#generateFonts())
  - [generateFontFace()](#generateFontFace())

## Typesettings

The first you'll want to do is create your typesettings object. This will be used to create your styled (font) objects as well as a `@font-face` declaration.

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


## Configuration

|Name|Type|Default|Description|
|:--:|:--:|:--:|:----------|
[`cssFn`](#class-names) |  `Function` | `undefined` | Returns font styles as css classnames instead of styled objects
[`fontStyles`](#additional-font-styles) | `Object`  | `undefined` | Additional styles that apply to all font styles
[`fontFaceStyles`](#additional-font-face-styles) | `Object`  | `undefined` | Additional styles that apply the @font-face declaration

### Class Names

By default, `fonts` styles are returned as object styles while the `fontFace` declaration is returned as a string. If you prefer, you can set the `cssFn` option and css classnames will be returned instead.

```js
import { css } from '@emotion/core'

const options = {
  cssFn: css
}
```

### Additional Font Styles

The `fonts` object will return styles for `font-family`, `font-size`, `font-style`, `font-weight`, `letter-spacing`, `line-height`, and `text-transform`. You can pass in an object of styles that will be added to these using the `fontStyles` option.

```js
const options = {
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    // and so on ...
  }
}
```

### Additional Font Face Styles

The `fontFace` declaration will return styles for `font-family`, `font-style`, and `font-weight`. You can pass in an object of styles that will be added to these using the `fontFaceStyles` option.

```js
const options = {
  fontFaceStyles: {
    fontDisplay: 'swap',
    // and so on ...
  }
}
```

## API

### generate()

```js
generate: (typesettings: Object, options?: Object) => {
  fontFace: String,
  fonts: Object
}
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

### generateFonts()

```js
generateFonts: (typesettings: Object, options?: Object) => Object
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

### generateFontFace()

```js
generateFontFace: (typesettings: Object, options?: Object) => Object
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

## Utilities

### getFamilyName()

 Returns a normalized FontFamily name where names with a space are automatically wrapped in quotes.

```js
getFamilyName: (family: String) => string
```

### getFontStack()

Normalizes the family name and all fallbacks, combining them into a font stack.

```js
getFamilyName: (family: String, fallbacks: String[]) => string
```
