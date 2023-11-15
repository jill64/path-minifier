import { expect, test } from 'vitest'
import { collapse } from './collapse.js'

test('collapse', () => {
  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'README.md',
              children: []
            },
            {
              name: 'package.json',
              children: []
            }
          ]
        },
        {
          name: 'b',
          children: [
            {
              name: 'test.ts',
              children: []
            },
            {
              name: 'test2.ts',
              children: []
            }
          ]
        }
      ]
    })
  ).toEqual({
    root: {
      a: ['README.md', 'package.json'],
      b: ['test.ts', 'test2.ts']
    }
  })
})

test('collapse', () => {
  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'README.md',
          children: []
        },
        {
          name: 'package.json',
          children: []
        },
        {
          name: 'src',
          children: [
            {
              name: 'lib',
              children: [
                {
                  name: 'data-a.js',
                  children: []
                },
                {
                  name: 'utils',
                  children: [
                    {
                      name: 'file-a.ts',
                      children: []
                    },
                    {
                      name: 'file-a.ts',
                      children: []
                    },
                    {
                      name: 'file-a.ts',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  ).toEqual({
    root: [
      'README.md',
      'package.json',
      {
        'src/lib': [
          'data-a.js',
          {
            utils: ['file-a.ts', 'file-a.ts', 'file-a.ts']
          }
        ]
      }
    ]
  })
})
