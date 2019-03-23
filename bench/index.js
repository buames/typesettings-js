const Benchmark = require('benchmark')
const config = require('../test/fixtures/typesettings')
const { generateFonts, generateFontFace } = require('../dist/index.js')

const suite = new Benchmark.Suite()

const tests = [
  { name: 'generateFonts', func: () => generateFonts(config) },
  { name: 'generateFontFace', func: () => generateFontFace(config) }
]

tests.forEach(({ name, func }) => { suite.add(name, func) })

suite
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function () {
    const top = this.filter('fastest').map('name')
    console.log(`Fastest is ${ top }`)
  })
  .run({ async: true })
