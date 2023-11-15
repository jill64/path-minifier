import { expect, test } from 'vitest'
import { collapse } from './collapse.js'

test('one-line', () => {
  expect(
    collapse({
      name: 'root',
      children: []
    })
  ).toEqual('root')

  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'src',
          children: []
        }
      ]
    })
  ).toEqual('root/src')

  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'src',
          children: [
            {
              name: 'lib',
              children: []
            }
          ]
        }
      ]
    })
  ).toEqual('root/src/lib')

  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'src',
          children: [
            {
              name: 'lib',
              children: [
                {
                  name: 'utils',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    })
  ).toEqual('root/src/lib/utils')
})
