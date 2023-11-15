import { expect, test } from 'vitest'
import { minify } from './minify.js'

const example = [
  '.gitignore',
  'README.md',
  'package.json',
  'demo/package.json',
  'demo/src/app.html',
  'demo/src/app.postcss',
  'demo/test/index.ts',
  'demo/test/index2.ts',
  'demo/vite.config.ts',
  'src/index.ts',
  'src/minify.ts',
  'src/types/Minify.ts',
  'src/types/MinifyOptions.ts',
  'extreme/nesting/1/2/3/4/5/6/7/8/9/10/index.ts',
  'extreme/nesting/1/2/3/4/5/6/7/8/9/10/index2.ts'
]

const obj = [
  '.gitignore',
  'README.md',
  'package.json',
  {
    demo: [
      'package.json',
      'vite.config.ts',
      {
        src: ['app.html', 'app.postcss'],
        test: ['index.ts', 'index2.ts']
      }
    ],
    src: [
      'index.ts',
      'minify.ts',
      {
        types: ['Minify.ts', 'MinifyOptions.ts']
      }
    ],
    'extreme/nesting/1/2/3/4/5/6/7/8/9/10': ['index.ts', 'index2.ts']
  }
]

const list = `.gitignore
README.md
package.json
demo
\tpackage.json
\tvite.config.ts
\tsrc
\t\tapp.html
\t\tapp.postcss
\ttest
\t\tindex.ts
\t\tindex2.ts
src
\tindex.ts
\tminify.ts
\ttypes
\t\tMinify.ts
\t\tMinifyOptions.ts
extreme/nesting/1/2/3/4/5/6/7/8/9/10
\tindex.ts
\tindex2.ts`

test('minify', () => {
  expect(
    minify(example, {
      output: 'object'
    })
  ).toEqual(obj)

  expect(minify(example)).toEqual(list)
})
