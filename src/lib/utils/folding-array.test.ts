import { expect, test } from 'vitest'
import { folding } from './folding.js'

test('array', () => {
  expect(folding(['a'])).toEqual('a')
  expect(folding(['a', 'b', 'c'])).toEqual(['a', 'b', 'c'])
  expect(folding(['a', ['b', 'c']])).toEqual(['a', 'b', 'c'])
  expect(folding(['a', ['b', ['c']]])).toEqual(['a', 'b', 'c'])
})
