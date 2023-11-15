import { expect, test } from 'vitest'
import { folding } from './folding.js'

test('folding', () => {
  expect(folding([{ a: ['b', 'c'] }, 'd'])).toEqual(['d', { a: ['b', 'c'] }])

  expect(folding([{ a: ['b', 'c'] }, 'd', ['e', 'f']])).toEqual([
    'd',
    'e',
    'f',
    { a: ['b', 'c'] }
  ])

  expect(folding([{ a: ['b', 'c'] }, 'd', ['e', 'f', ['g', 'h']]])).toEqual([
    'd',
    'e',
    'f',
    'g',
    'h',
    { a: ['b', 'c'] }
  ])

  expect(
    folding([{ a: ['b', 'c'] }, 'd', ['e', 'f', ['g', 'h', { i: ['j', 'k'] }]]])
  ).toEqual(['d', 'e', 'f', 'g', 'h', { i: ['j', 'k'], a: ['b', 'c'] }])
})
