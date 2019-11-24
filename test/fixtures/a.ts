import { Typesettings, TypesettingOptions, generate } from '../../src';

export interface Options<T> extends TypesettingOptions<T> {
  eot?: boolean;
  woff?: boolean;
  woff2?: boolean;
  ttf?: boolean;
  family?: string;
  fallbacks?: string[];
}

export const defaults = {
  eot: true,
  woff: true,
  woff2: true,
  ttf: true,
  family: 'Helvetica',
  fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
};

export const create = <T>(opts?: Options<T>) => {
  const options = { ...defaults, ...opts };

  const config: Typesettings = {
    family: options.family,
    fallbacks: options.fallbacks,
    variants: [
      {
        fontStyle: 'italic',
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
          eot: options.eot && './font-file.eot',
          woff: options.woff && './font-file.woff',
          woff2: options.woff2 && './font-file.woff2',
          ttf: options.ttf && './font-file.ttf',
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
          eot: options.eot && './font-file.eot',
          woff: options.woff && './font-file.woff',
          woff2: options.woff2 && './font-file.woff2',
          ttf: options.ttf && './font-file.ttf',
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

  return config;
};

export const Helvetica = <T>(opts?: Options<T>) => {
  const options = { ...defaults, ...opts };
  const config = create(options);
  return generate<T>(config, options);
};
