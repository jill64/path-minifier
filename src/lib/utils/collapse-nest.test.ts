import { expect, test } from 'vitest'
import { collapse } from './collapse.js'

test('nest', () => {
  expect(
    collapse({
      name: 'root',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'bbbbbbbb',
              children: [
                {
                  name: 'c',
                  children: []
                },
                {
                  name: 'c2',
                  children: []
                }
              ]
            },
            {
              name: 'c',
              children: []
            }
          ]
        },
        {
          name: 'd',
          children: [
            {
              name: 'extreme',
              children: [
                {
                  name: 'nesting',
                  children: [
                    {
                      name: '1',
                      children: [
                        {
                          name: '2',
                          children: [
                            {
                              name: '3',
                              children: [
                                {
                                  name: '4',
                                  children: [
                                    {
                                      name: '5',
                                      children: [
                                        {
                                          name: '6',
                                          children: [
                                            {
                                              name: '7',
                                              children: [
                                                {
                                                  name: '8',
                                                  children: [
                                                    {
                                                      name: '9',
                                                      children: [
                                                        {
                                                          name: '10',
                                                          children: [
                                                            {
                                                              name: 'index.ts',
                                                              children: []
                                                            },
                                                            {
                                                              name: 'index2.ts',
                                                              children: []
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
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
    root: {
      a: ['c', { bbbbbbbb: ['c', 'c2'] }],
      'd/extreme/nesting/1/2/3/4/5/6/7/8/9/10': ['index.ts', 'index2.ts']
    }
  })
})
