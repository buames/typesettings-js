import test from 'ava'
import { FontStyle, LetterCasing } from '../src/types'
import {
  getStyleLabel,
  getTransformLabel,
  toPx
} from '../src/fonts'

test('Should return a "normal" style label with a regular font weight', (t) => {
  t.is(getStyleLabel('normal' as FontStyle, 300), 'n300')
})

test('Should return an "italic" style label with a medium font weight', (t) => {
  t.is(getStyleLabel('italic' as FontStyle, 500), 'i500')
})

test('Should return an empty string when there is no matched FontStyle', (t) => {
  t.is(getStyleLabel('foo' as FontStyle, 700), '')
})

test('Should return an uppercase transform label when the casing is uppercase', (t) => {
  t.is(getTransformLabel('uppercase' as LetterCasing), '_caps')
})

test('Should return an lowercase transform label when the casing is lowercase', (t) => {
  t.is(getTransformLabel('lowercase' as LetterCasing), '_lower')
})

test('Should return an empty transform label when the casing is normalcase', (t) => {
  t.is(getTransformLabel('normalcase' as LetterCasing), '')
})

test('Should return an empty transform label when the casing doesnt match LetterCasing', (t) => {
  t.is(getTransformLabel('food' as LetterCasing), '')
})

test('Should return a pixel unit when the value is a number', (t) => {
  t.is(toPx(10), '10px')
})

test('Should not return a pixel unit when the value is a string', (t) => {
  t.is(toPx('10'), '10')
})
