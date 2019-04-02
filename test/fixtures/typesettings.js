module.exports = {
  family: 'Helvetica Neue',
  fallbacks: ['-apple-system', 'BlinkMacSystemFont'],
  variants: [
    {
      fontStyle: 'normal',
      fontWeight: 400,
      sources: {
        locals: ['Helvetica Regular', 'Helvetica-Regular']
      },
      normalcase: [
        {
          fontSize: 14,
          letterSpacing: null,
          lineHeight: 18
        },
        {
          fontSize: 20,
          letterSpacing: null,
          lineHeight: 22
        }
      ]
    },
    {
      fontWeight: 500,
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf'
      },
      normalcase: [
        {
          fontSize: 20,
          letterSpacing: 0.29348573,
          lineHeight: 22
        }
      ],
      lowercase: [
        {
          fontSize: 20,
          letterSpacing: null,
          lineHeight: null
        }
      ],
      uppercase: [
        {
          fontSize: 20,
          letterSpacing: 1,
          lineHeight: 1
        }
      ]
    },
    {
      fontStyle: 'normal',
      fontWeight: 'bold',
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf'
      },
      normalcase: [
        {
          fontSize: '20rem',
          letterSpacing: '0.29em',
          lineHeight: '22em'
        }
      ]
    }
  ]
};
