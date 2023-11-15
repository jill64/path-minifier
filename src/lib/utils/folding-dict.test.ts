import { expect, test } from 'vitest'
import { folding } from './folding.js'

test('dict', () => {
  expect(folding([{ a: ['b', 'c'] }])).toEqual({ a: ['b', 'c'] })

  expect(folding([{ a: ['b', 'c'] }, { d: ['e', 'f'] }])).toEqual({
    a: ['b', 'c'],
    d: ['e', 'f']
  })

  expect(
    folding([
      { a: ['b', 'c'] },
      { d: ['e', { f: ['g', 'h'] }] },
      { i: ['j', 'k'] }
    ])
  ).toEqual({
    a: ['b', 'c'],
    d: ['e', { f: ['g', 'h'] }],
    i: ['j', 'k']
  })
})
