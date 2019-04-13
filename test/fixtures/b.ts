import { Typesettings } from '../../src';

export const config: Typesettings = {
  family: 'Helvetica',
  fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
  variants: [
    {
      fontStyle: 'italic',
      fontWeight: 400,
      sources: {
        locals: ['Helvetica Regular', 'Helvetica-Regular'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf',
        otf: './font-file.otf',
      },
      normalcase: [
        {
          fontSize: 14,
          letterSpacing: null,
          lineHeight: 18,
        },
      ],
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
      sources: {
        locals: ['Helvetica Regular', 'Helvetica-Regular'],
      },
      normalcase: [
        {
          fontSize: 14,
          letterSpacing: null,
          lineHeight: 18,
        },
      ],
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf',
        otf: './font-file.otf',
      },
      normalcase: [
        {
          fontSize: 20,
          letterSpacing: 0.29,
          lineHeight: 22,
        },
      ],
      lowercase: [
        {
          fontSize: 20,
          letterSpacing: null,
          lineHeight: null,
        },
      ],
      uppercase: [
        {
          fontSize: 20,
          letterSpacing: 1,
          lineHeight: 1,
        },
      ],
    },
    {
      fontStyle: 'normal',
      fontWeight: 'bold',
      sources: {
        locals: ['Helvetica Bold', 'Helvetica-Bold'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf',
        otf: './font-file.otf',
      },
      normalcase: [
        {
          fontSize: '20rem',
          letterSpacing: '0.29em',
          lineHeight: '22em',
        },
        {
          fontSize: 'FooBar',
          letterSpacing: '0.29em',
          lineHeight: '22em',
        },
      ],
    },
  ],
};

export const create = (opts?: any) => ({
  ...config,
  ...opts || { },
});
