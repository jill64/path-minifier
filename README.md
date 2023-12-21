<!----- BEGIN GHOST DOCS HEADER ----->

# path-minifier


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/path-minifier"><img src="https://img.shields.io/npm/v/path-minifier" alt="npm-version" /></a> <a href="https://npmjs.com/package/path-minifier"><img src="https://img.shields.io/npm/l/path-minifier" alt="npm-license" /></a> <a href="https://npmjs.com/package/path-minifier"><img src="https://img.shields.io/npm/dm/path-minifier" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/path-minifier"><img src="https://img.shields.io/bundlephobia/min/path-minifier" alt="npm-min-size" /></a> <a href="https://github.com/jill64/path-minifier/actions/workflows/ci.yml"><img src="https://github.com/jill64/path-minifier/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a> <a href="https://path-minifier.jill64.dev"><img src="https://img.shields.io/website?up_message=working&down_message=down&url=https%3A%2F%2Fpath-minifier.jill64.dev" alt="website" /></a>
<!----- END GHOST DOCS BADGES ----->


🔥 Minify the path list while preserving semantics

## [Demo](https://path-minifier.jill64.dev)

<!----- END GHOST DOCS HEADER ----->

This is a utility to reduce the number of characters in a path listing while maintaining the semantics of the directory structure and file names.
It was created primarily to reduce the number of tokens used when passing directory information to LLM (e.g. ChatGPT, GPT-4).

## Installation

```sh
npm i path-minifier
```

## Example

Returns a `string` list of paths with reduced size by passing the list of paths as a `string[]`.

```js
import { minify } from 'path-minifier'

const minified = minify([
  'README.md',
  'package.json',
  'src/index.js',
  'src/lib.js'
  // ...
])
```

By default, the output automatically selects the format with the least number of characters.
This behavior can be overridden with the `options` argument.

```js
const minified = minify(
  [
    // ...
  ],
  {
    /** 'object' | 'json' | 'indented-list' | 'auto'(default) */
    format: 'json'
  }
)
```

## Output Formats

### object

Output as a JS object.
Single files are output as strings, multiple files as arrays, and directories as objects.
Can be used to convert to any string format using `JSON.stringify` or similar.

```js
const obj = [
  'README.md',
  'package.json',
  {
    src: ['index.js', '...']
  }
]
```

### json

Outputs `object` as an unformatted JSON string.
The larger the size of the directory, the more characters it tends to reduce.

```json
["README.md", "package.json", { "src": ["index.js", "..."] }]
```

### indented-list

Output as indented-list
Outputs the directory structure as a list of indented filenames without escaping.
Provides smaller output size for small directories and irregular nested structures.
Indentation is done with `\t`.

```txt
README.md
package.json
src
  index.js
  ...
```

### auto

Automatically selects the output with the fewest number of haracters and returns the value as a string.

> [!IMPORTANT]
> The `auto` option selects the output format based on the length of the string, which may not be proportional to the length of the LLM token.
> See the [interactive demo](https://path-minifier.jill64.dev) for a description of this behavior.

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
