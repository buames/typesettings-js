
# Typesettings

Typesettings is a handful of utilities to help manage typsettings. It can be used with emotion, styled-components, or any other CSS-in-JS framework.

[![Build Status](https://travis-ci.com/buames/typesettings-js.svg?branch=master)](https://travis-ci.com/buames/typesettings-js)
[![codecov](https://codecov.io/gh/buames/typesettings-js/branch/master/graph/badge.svg)](https://codecov.io/gh/buames/typesettings-js)
[![npm](https://img.shields.io/npm/v/typesettings-js.svg?color="black")](https://www.npmjs.com/package/typesettings-js)
[![npm](https://img.shields.io/bundlephobia/min/typesettings-js.svg?color="black")](https://bundlephobia.com/result?p=typesettings-js)
[![npm](https://img.shields.io/bundlephobia/minzip/typesettings-js.svg?color="black")](https://bundlephobia.com/result?p=typesettings-js)

#### Install

```sh
yarn add typesettings-js
```

#### Contents

- [Getting Started](#getting-started)
  - [Typesettings](#typesettings)
  - [Usage](#usage)
- [Configuration](#configuration)
  - [Class Names](#class-names)
  - [Additional Font Styles](#additional-font-styles)
  - [Additional Font Face Styles](#additional-font-face-styles)
- [API](#api)
  - [generate()](#generate())
  - [generateFonts()](#generateFonts())
  - [generateFontFace()](#generateFontFace())
  - [Utilities](#utilities)
    - [getValue()](#getValue)
    - [getFontStack()](#getFontStack)
    - [normalizeFamily()](#normalizeFamily)
    - [parseSize()](#parseSize)
- [Typescript](#typescript)

## Getting Started

### Typesettings

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
        fontSize: String | Number,
        letterSpacing: String | Number | null,
        lineHeight: String | Number | null
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
        }
      ],
      lowercase: [
        {
          fontSize: 12,
          letterSpacing: 0.1,
          lineHeight: null
        }
      ]
    }
  ]
}
```

### Usage

Once you have your typesettings created, you can easily generate `font style` objects and a `@font-face` declaration to use throughout your app.

```js
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { generate } from 'typesettings-js'

const typesettings = {
  // your typesettings object
}

const { fontFace, fonts } = generate(typesettings)

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

The `fonts` object will return styles for `font-family`, `font-size`, `font-style`, `font-weight`, `letter-spacing`, `line-height`, and `text-transform`. You can pass in an object of styles that will be **added** to these using the `fontStyles` option.

```js
const options = {
  fontStyles: {
    textRendering: 'optimizeLegibility',
    fontFeatureSettings: '"tnum", "liga"',
    // and so on ...
  }
}
```

### Additional Font Face Styles

The `fontFace` declaration will return styles for `font-family`, `font-style`, and `font-weight` as well as the font file `src`. You can pass in an object of styles that will be **added** to these using the `fontFaceStyles` option.

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

Generate a fontFace declaration and an object of styled objects from your typesettings. You can pass in objects of additional  [`fontFaceStyles`](#additional-font-face-styles) and  [`fontStyles`](#additional-font-styles) that will be added to these.

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

Generate styled objects to be used with CSS-in-JS frameworks from your typesettings. You can pass in an object of additional  [`fontStyles`](#additional-font-styles) that will be added to these.

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

If you'd prefer to have objects of classnames, set a [`cssFn`](#class-names) in the options.

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

Generates a @font-face css declariation from typesettings. You can pass in an object of additional [`fontFaceStyles`](#additional-font-face-styles) that will be added to these.

**Example**

```js
import { Global, css } from '@emotion/core'
import { generateFontFace } from 'typesettings-js'
import Typesettings from 'path/to/your_typesettings'

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

### getValue()

Returns a value from a given Typesettings obj and a path to the key

```js
getValue: (typesettings: Object, path: String) => String
```

### getFontStack()

Normalizes the family name and all fallbacks, combining them into a font stack.

```js
getFamilyName: (family: String, fallbacks?: String[]) => String
```

### normalizeFamily()

 Returns a normalized FontFamily name where names with a space are automatically wrapped in quotes.

```js
getFamilyName: (family: String) => String
```

### parseSize()

 Parses a number and unit string, returning only the number used

```js
parseSize: (str: String) => String
```

## Typescript

Typescript types and interfaces are exported. You can import them as named imports. See all the type definitions in the [src/types.ts](./src/types.ts) file.

TypeScript checks css properties with the object style syntax using [`csstype`](https://www.npmjs.com/package/csstype) package.

Example typing and extending typesetting `options`.

```jsx
// foo.ts
import { Interpolation, SerializedStyles } from '@emotion/core';
import {
  generate,
  FontStyleOptions,
  FontFaceStyleOptions,
  Typesettings,
} from 'typesettings-js';

type StyledCssFn = (...args: Interpolation[]) => SerializedStyles;

interface MyFontStyles extends FontStyleOptions { }

interface MyFontFaceStyles extends FontFaceStyleOptions {
  WebkitFontSmoothing?: 'antialiased', 'subpixel-antialiased', 'inherit', 'initial', 'none';
}

const typesettings: Typesettings = {
  // your typesettings
}

// Type the `cssFn` and the ResultType(s) of `fonts` and `fontFace`
generate<StyledCssFn>(typesettings, {
  cssFn: css,
  fontStyles: {
              ^ Argument of type 'WebkitFontSmoothing: 'antialiased';' is not assignable [...]
    WebkitFontSmoothing: 'antialiased' // WebkitFontSmoothing is not a valid csstype property
  },
  fontFaceStyles: <MyFontFaceStyles>{
                                    ^ Argument of type 'WebkitFontSmoothing: 'antialiaseddddd';' is not assignable [...]
    WebkitFontSmoothing: 'antialiaseddddd' // Mispelling error
  },
})
```
