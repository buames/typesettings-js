# Typesettings

Typesettings is a handful of utilities to help manage typsettings. It can be
used with emotion, styled-components, or any other CSS-in-JS framework.

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
  - [createFonts()](<#createFonts()>)
  - [createFontFace()](<#createFontFace()>)
  - [Utilities](#utilities)
    - [getFontStack()](#getFontStack)
    - [normalizeFontFamily()](#normalizeFontFamily)
    - [parseSize()](#parseSize)
- [Typescript](#typescript)

## Getting Started

### Typesettings

The first you'll want to do is create your typesettings object. This will be
used to create your styled (font) objects as well as a `@font-face` declaration.

```ts
const Typesettings = {
  family: string,
  fallbacks: Array<string>,
  variants: Array<{
    fontStyle: 'italic' | 'normal' | 'oblique' | string,
    fontWeight: number | 'bold' | 'bolder' | 'normal' | 'lighter',
    sources: {
      locals?: Array<string>,
      eot?: string,
      woff?: string,
      woff2?: string,
      ttf?: string
    },
    ['normalcase' | 'uppercase' | 'lowercase']: [
      {
        fontSize: string | number,
        letterSpacing?: string | number,
        lineHeight?: string | number
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
  fallbacks: ['-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif'],
  variants: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      sources: {
        locals: ['Font Display Name', 'Font Postscript Name'],
        eot: require('./font-path.eot'),
        woff: require('./font-path.woff'),
        woff2: require('./font-path.woff2'),
        ttf: require('./font-path.ttf'),
      },
      normalcase: [
        {
          fontSize: 12,
          letterSpacing: -0.08,
          lineHeight: 18,
        },
        {
          fontSize: 14,
          letterSpacing: -0.15,
          lineHeight: 20,
        },
      ],
      uppercase: [
        {
          fontSize: 12,
          letterSpacing: 0.1,
          lineHeight: null,
        },
      ],
      lowercase: [
        {
          fontSize: 12,
          letterSpacing: 0.1,
          lineHeight: null,
        },
      ],
    },
  ],
};
```

### Usage

Once you have your typesettings created, you can easily generate `font style`
objects and a `@font-face` declaration to use throughout your app.

```js
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { generate } from 'typesettings-js';

const typesettings = {
  // your typesettings object
};

const { fontFace, fonts } = generate(typesettings);

const TextLabel = styled('p')`
  ${fonts.s16.n400};
`;

render(
  <div>
    <Global styles={fontFace} />
    <TextLabel>The quick brown fox jumps over the lazy dog.</TextLabel>
  </div>,
);
```

## Configuration

|                       Name                       |    Type    |   Default   | Description                                                     |
| :----------------------------------------------: | :--------: | :---------: | :-------------------------------------------------------------- |
|             [`cssFn`](#class-names)              | `Function` | `undefined` | Returns font styles as css classnames instead of styled objects |
|     [`fontStyles`](#additional-font-styles)      |  `Object`  | `undefined` | Additional styles that apply to all font styles                 |
| [`fontFaceStyles`](#additional-font-face-styles) |  `Object`  | `undefined` | Additional styles that apply the @font-face declaration         |

### Class Names

By default, `fonts` styles are returned as object styles while the `fontFace`
declaration is returned as a string. If you prefer, you can set the `cssFn`
option and css classnames will be returned instead.

```js
import { css } from '@emotion/core';

const options = {
  cssFn: css,
};
```

### Additional Font Styles

The `fonts` object will return styles for `font-family`, `font-size`,
`font-style`, `font-weight`, `letter-spacing`, `line-height`, and
`text-transform`. You can pass in an object of styles that will be **added** to
these using the `fontStyles` option.

```js
const options = {
  fontStyles: {
    textRendering: 'optimizeLegibility',
    fontFeatureSettings: '"tnum", "liga"',
    // and so on ...
  },
};
```

### Additional Font Face Styles

The `fontFace` declaration will return styles for `font-family`, `font-style`,
and `font-weight` as well as the font file `src`. You can pass in an object of
styles that will be **added** to these using the `fontFaceStyles` option.

```js
const options = {
  fontFaceStyles: {
    fontDisplay: 'swap',
    // and so on ...
  },
};
```

## API

### createFonts()

```ts
createFonts: (typesettings: object, options?: object) => object;
```

Create styled font objects to be used with CSS-in-JS frameworks from your
typesettings. You can pass in an object of additional
[`fontStyles`](#additional-font-styles) that will be added to these.

**Example**

```js
import styled from '@emotion/styled';
import { createFonts } from 'typesettings-js';
import Typesettings from 'your_typesettings';

const options = {
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
  },
};

const fonts = createFonts(Typesettings, options);

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
  ${fonts.s16.n400};
`;

render(
  <Paragraph>My font size is 16 and my font weight is regular.</Paragraph>,
);
```

If you'd prefer to have objects of classnames, set a [`cssFn`](#class-names) in
the options.

```js
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { createFonts } from 'typesettings-js';
import Typesettings from 'your_typesettings';

const options = {
  cssFn: css,
  fontStyles: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
  },
};

const fonts = createFonts(Typesettings, options);

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
  ${fonts.s16.n400};
`;

render(
  <Paragraph>My font size is 16 and my font weight is regular.</Paragraph>,
);
```

### createFontFace()

```js
createFontFace: (typesettings: object, options?: object) => object;
```

Generates a @font-face css declariation from typesettings. You can pass in an
object of additional [`fontFaceStyles`](#additional-font-face-styles) that will
be added to these.

**Example**

```js
import { Global, css } from '@emotion/core';
import { createFontFace } from 'typesettings-js';
import Typesettings from 'path/to/your_typesettings';

const options = {
  cssFn: css,
  fontFaceStyles: {
    fontDisplay: 'swap',
  },
};

const fontFace = createFontFace(Typesettings, options);

render(
  <div>
    <Global styles={fontFace} />
  </div>,
);
```

## Utilities

### getFontStack()

Normalizes the family name and all fallbacks, combining them both into a single
font stack.

```ts
getFontStack: (family: string, fallbacks?: string[]) => string;
```

### normalizeFontFamily()

Returns a normalized FontFamily name where names with a space are automatically
wrapped in quotes.

```ts
normalizeFontFamily: (family: string) => string;
```

### parseSize()

Parses a number and unit string, returning only the number used

```ts
parseSize: (str: string) => string;
```

## Typescript

Typescript types and interfaces are exported. You can import them as named
imports. TypeScript checks css properties with the object style syntax using
[`csstype`](https://www.npmjs.com/package/csstype) package.

Example typing and extending typesetting `options`.

```jsx
// foo.ts
import { Interpolation, SerializedStyles } from '@emotion/core';
import { createFonts,  Typesettings, TypesettingOptions } from 'typesettings-js';

const typesettings: Typesettings = {
  // your typesettings
}

const options: TypesettingOptions = {
  cssFn: css,
  fontStyles: {
    WebkitFontSmoothing: 'antialiaseddddd', // Mispelling error
                       ^ Argument of type 'WebkitFontSmoothing: 'antialiaseddddd';' is not assignable [...]
  },
  fontFaceStyles: {
    WebkitFontSmoothing: 'antialiased' // WebkitFontSmoothing is not a valid csstype property
                       ^ Argument of type 'WebkitFontSmoothing: 'antialiased';' is not assignable [...]
  },
}

createFonts(typesettings, options)
```
