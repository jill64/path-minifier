import { expect, test } from 'vitest'
import { collapse } from './collapse.js'

test('flat', () => {
  expect(
    collapse({
      name: '1',
      children: [
        {
          name: 'a',
          children: []
        },
        {
          name: 'b',
          children: []
        }
      ]
    })
  ).toEqual({
    '1': ['a', 'b']
  })

  expect(
    collapse({
      name: '1',
      children: [
        {
          name: 'a',
          children: []
        },
        {
          name: 'b',
          children: []
        },
        {
          name: 'c',
          children: []
        },
        {
          name: 'd',
          children: []
        }
      ]
    })
  ).toEqual({ '1': ['a', 'b', 'c', 'd'] })
})
