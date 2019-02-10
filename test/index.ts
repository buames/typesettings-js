import test from 'ava'
import { generateFonts, generateFontFace } from '../src'

const config = {
  family: '\'Helvetica\'',
  fallback: '-apple-system, BlinkMacSystemFont',
  regular: {
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
  medium: {
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
  }
}

test('generateFontFace()', (t) => {
  t.snapshot(generateFontFace(config as any))
})

test('generateFonts()', (t) => {
  t.snapshot(generateFonts(config as any), 'with fallback family')

  t.snapshot(generateFonts(config as any, {
    textRendering: 'optimizeLegibility'
  }),        'with additional styles')

  delete config.fallback
  t.snapshot(generateFonts(config as any), 'without fallback family')
})
