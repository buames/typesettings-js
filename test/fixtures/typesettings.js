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
      normalcase: {
        12: {
          characterSpacing: null,
          lineHeight: 18,
          paragraphSpacing: 0
        }
      }
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
      sources: {
        locals: ['Helvetica Medium', 'Helvetica-Medium'],
        eot: './font-file.eot',
        woff: './font-file.woff',
        woff2: './font-file.woff2',
        ttf: './font-file.ttf'
      },
      normalcase: {
        20: {
          characterSpacing: 0.29348573,
          lineHeight: 22,
          paragraphSpacing: 22
        }
      },
      lowercase: {
        20: {
          characterSpacing: null,
          lineHeight: null,
          paragraphSpacing: null
        }
      },
      uppercase: {
        20: {
          characterSpacing: 1,
          lineHeight: 1,
          paragraphSpacing: 1
        }
      }
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
      normalcase: {
        20: {
          characterSpacing: '0.29em',
          lineHeight: 22,
          paragraphSpacing: 22
        }
      }
    }
  ]
};
