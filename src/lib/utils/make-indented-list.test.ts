import { expect, test } from 'vitest'
import { makeIndentedList } from './make-indented-list.js'

test('make-indented-list', () => {
  expect(makeIndentedList('root')).toEqual('root')
  expect(makeIndentedList(['root'])).toEqual('root')
  expect(makeIndentedList(['root', 'root2'])).toEqual(`root
root2`)
  expect(makeIndentedList({ root: { src: ['index.ts'] } })).toEqual(
    `root
\tsrc
\t\tindex.ts`
  )
})
